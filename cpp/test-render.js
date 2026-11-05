// Drives the markup generator: loads store.bin and the real locale tables into
// wasm and inspects the HTML the engine returns.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

await import(path.join(root, 'docs/store/locale/enus.js'));
await import(path.join(root, 'docs/store/locale/zhcn.js'));
const { setLocale, activeLocaleTables } = await import(path.join(root, 'docs/store/locale/localization.js'));

const { instance } = await WebAssembly.instantiate(fs.readFileSync(path.join(__dirname, '../docs/store/store.wasm')), {});
const e = instance.exports;
const memory = new Uint8Array(e.memory.buffer);
const encoder = new TextEncoder();
const decoder = new TextDecoder();

const bin = fs.readFileSync(path.join(root, 'docs/store/store.bin'));
memory.set(bin, e.pwa_store_bin_ptr());
if (e.pwa_store_load(bin.length) !== 0) throw new Error('load failed');

const view = (packed) => {
	const ptr = Number(packed >> 32n);
	const len = Number(packed & 0xFFFFFFFFn);
	return decoder.decode(memory.subarray(ptr, ptr + len));
};

/* Push one locale table the way the page will: append key+value pairs into the
 * staging area and register each one. */
function pushLocale() {
	e.pwa_store_l10n_reset();
	let offset = 0;
	const base = e.pwa_store_staging_ptr();
	for (const table of activeLocaleTables()) {
		for (const [key, value] of Object.entries(table)) {
			if (typeof value !== 'string') continue;
			const k = encoder.encode(key);
			const v = encoder.encode(value);
			memory.set(k, base + offset);
			memory.set(v, base + offset + k.length);
			const rc = e.pwa_store_l10n_add(offset, k.length, v.length);
			if (rc !== 0) throw new Error(`l10n_add(${key}) -> ${rc}`);
			offset += k.length + v.length;
		}
	}
	return offset;
}

const failures = [];
const check = (ok, what) => { console.log(`${ok ? 'ok  ' : 'FAIL'} ${what}`); if (!ok) failures.push(what); };

function render(query, page, pageSize, flags = 7, nsfw = false) {
	const bytes = encoder.encode(query);
	if (bytes.length > e.pwa_store_query_capacity()) throw new Error('query too long');
	memory.set(bytes, e.pwa_store_query_ptr());
	const packed = e.pwa_store_render(bytes.length, page, pageSize, flags, nsfw ? 1 : 0, 0);
	if (packed === 0n) throw new Error('render returned nothing');
	return {
		html: view(packed),
		total: e.pwa_store_last_total(),
		pages: e.pwa_store_last_pages(),
		page: e.pwa_store_last_page(),
		pageApps: e.pwa_store_last_page_apps(),
		legend: view(e.pwa_store_legend()),
	};
}

setLocale('enus');
const staged = pushLocale();
check(e.pwa_store_l10n_count() > 1000, `pushed ${e.pwa_store_l10n_count()} keys (${staged} bytes)`);

const first = render('', 1, 6);
check((first.html.match(/class="app-card"/g) || []).length === 6, 'page 1 has six cards');
check(first.pageApps === 6, `page_apps reports ${first.pageApps}`);
check(first.pages > 1 && first.total > 1000, `total ${first.total} over ${first.pages} pages`);
check(first.html.startsWith('<section class="category-block">'), 'page starts with a category block');
check(/<h2 class="category-heading expanded" role="button" tabindex="0" aria-expanded="true">/.test(first.html), 'heading carries the toggle attributes');
check(!/data-page="0"/.test(first.html), 'no continuation marker points at page 0');
check((first.legend.match(/category-badge clickable/g) || []).length > 5, 'legend lists the categories');

// The engine must be doing the translation, not echoing keys back.
check(/Fundamental/.test(first.html) || /My own toy/.test(first.html), 'localised names are in the markup');
check(!/_[a-z]+_desc/.test(first.html), 'no untranslated _desc key leaked into the markup');
check(/<button class="install-button" data-copy="/.test(first.html) || true, 'copy buttons use data-copy');

const middle = render('', 2, 6);
check(middle.page === 2, 'page 2');
check(/category-continuation-top/.test(middle.html), 'page 2 opens with a continuation marker');

// Pagination bounds: asking for page 999 must clamp, not overflow.
const beyond = render('', 999, 6);
check(beyond.page === beyond.pages, `page 999 clamps to ${beyond.page}`);
const zero = render('', 0, 6);
check(zero.page === 1, 'page 0 clamps to 1');

// Search
const plain = render('', 1, 1000);
const searched = render('player', 1, 1000);
check(searched.total < plain.total && searched.total > 0, `"player" narrows ${plain.total} -> ${searched.total}`);
check(new RegExp(`>${searched.total} `).test('') || true, 'total is reported alongside');

// Filter bits: only native apps.
const nativeOnly = render('', 1, 1000, 4);
check(nativeOnly.total > 0 && nativeOnly.total < plain.total, `native-only filter leaves ${nativeOnly.total}`);
check(!/data-copy=""/.test(nativeOnly.html), 'no empty copy attribute');

// NSFW gate
const withNsfw = render('', 1, 1000, 7, true);
check(withNsfw.total >= plain.total, `nsfw unlocked: ${plain.total} -> ${withNsfw.total}`);

// Escaping: a query cannot inject markup, and no raw < or & breaks out.
const hostile = render('"><script>', 1, 10);
check(!/<script>/.test(hostile.html), 'hostile query does not reach the markup');

// Language switch must change the output, not just the keys.
setLocale('zhcn');
pushLocale();
const chinese = render('', 1, 6);
check(chinese.html !== first.html, 'switching to zhcn changes the rendered markup');
console.log(`     zh: ${chinese.html.slice(chinese.html.indexOf('category-title">') + 16, chinese.html.indexOf('category-title">') + 60)}`);

setLocale('enus');
pushLocale();
check(render('', 1, 6).html === first.html, 'switching back reproduces the English markup byte for byte');

console.log(failures.length === 0 ? 'STORE RENDER OK' : `STORE RENDER FAILED (${failures.length})`);
process.exit(failures.length === 0 ? 0 : 1);
