// Loads store.wasm in node, drops docs/store/store.bin into the exported buffer
// and checks the engine's answers against the packed file.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const root = path.resolve(__dirname, '..');
const wasmBytes = fs.readFileSync(path.join(__dirname, 'store.wasm'));
const bin = fs.readFileSync(path.join(root, 'docs/store/store.bin'));

const { instance } = await WebAssembly.instantiate(wasmBytes, {});
const e = instance.exports;
const memory = new Uint8Array(e.memory.buffer);

const failures = [];
const check = (ok, what) => { console.log(`${ok ? 'ok  ' : 'FAIL'} ${what}`); if (!ok) failures.push(what); };

check(bin.length <= e.pwa_store_bin_capacity(), `catalogue fits the exported buffer (${bin.length} <= ${e.pwa_store_bin_capacity()})`);
memory.set(bin, e.pwa_store_bin_ptr());
check(e.pwa_store_load(bin.length) === 0, 'load succeeds');

const counts = e.pwa_store_counts();
const apps = Number(counts >> 32n);
const cats = Number(counts & 0xFFFFFFFFn);
/* Expected counts come from the file's own header, so the test follows the
 * catalogue growing instead of going stale with it. */
const headerCategories = bin.readUInt32LE(8);
const headerApps = bin.readUInt32LE(12);
check(cats === headerCategories && apps === headerApps,
	`counts match the header: ${cats} categories, ${apps} apps`);

const view = (packed) => {
	const ptr = Number(packed >> 32n);
	const len = Number(packed & 0xFFFFFFFFn);
	return new TextDecoder().decode(memory.subarray(ptr, ptr + len));
};

check(view(e.pwa_store_field(0, 0)) === 'PWA Player (My own toy)', 'first app name');
check(view(e.pwa_store_field(0, 3)) === 'https://pwa-player.pages.dev', 'first app url');
check(view(e.pwa_store_app_category(0)) === 'Fundamental', 'first app category');
let hidden = 0;
let strayFlags = 0;
for (let i = 0; i < apps; ++i) {
	const flags = e.pwa_store_app_flags(i);
	if (flags & 2) ++hidden;
	if (flags & ~3) ++strayFlags;
}
check(hidden > 0 && strayFlags === 0, `flags: ${hidden} hidden apps, no undefined bits`);

const query = (text) => {
	const bytes = new TextEncoder().encode(text);
	const ptr = e.pwa_store_query_ptr();
	if (bytes.length > e.pwa_store_query_capacity()) throw new Error('query too long');
	memory.set(bytes, ptr);
	return Number(e.pwa_store_query(bytes.length));
};

check(query('') === apps, `empty query matches everything (${apps})`);
const playerHits = query('player');
check(playerHits > 0 && playerHits < apps, `"player" narrows to ${playerHits}`);
check(query('PLAYER') === playerHits, 'search is case insensitive');
check(query('not-a-real-app-xyzzy') === 0, 'nonsense query matches nothing');

// Every match must be a distinct index and every field of it readable.
query('player'); /* the match list holds the most recent query, so redo it */
const firstHits = Array.from({ length: 3 }, (_, i) => view(e.pwa_store_field(Number(e.pwa_store_match(i)), 0)));
console.log(`     first three "player" hits: ${firstHits.join(', ')}`);
const seen = new Set();
let bad = 0;
for (let i = 0; i < playerHits; ++i) {
	const index = Number(e.pwa_store_match(i));
	if (seen.has(index)) ++bad;
	seen.add(index);
	for (let f = 0; f < 10; ++f) {
		const ptr = Number(e.pwa_store_field(index, f) >> 32n);
		const len = Number(e.pwa_store_field(index, f) & 0xFFFFFFFFn);
		if (ptr + len > memory.length) ++bad;
	}
}
check(bad === 0, 'match indices are distinct and every field view is inside memory');

// Out of range access must be safe, not crash.
check(Number(e.pwa_store_match(1e6)) === -1, 'match() past the end reports -1');
check(e.pwa_store_field(1e6, 0) === 0n, 'field() past the end reports empty');
check(e.pwa_store_field(0, 99) === 0n, 'field() past the field count reports empty');
check(e.pwa_store_load(8) === 3, 'load rejects a truncated file');

// Search cost per keystroke, for comparison with the 0.09 ms the JS index costs.
query('player');
const started = process.hrtime.bigint();
const rounds = 2000;
for (let i = 0; i < rounds; ++i) query(i & 1 ? 'player' : 'pwa');
const micros = Number(process.hrtime.bigint() - started) / 1000 / rounds;
console.log(`     query cost: ${micros.toFixed(1)} us per keystroke over ${apps} apps`);

console.log(failures.length === 0 ? 'STORE ENGINE OK' : `STORE ENGINE FAILED (${failures.length})`);
process.exit(failures.length === 0 ? 0 : 1);
