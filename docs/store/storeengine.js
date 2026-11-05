// Wasm-backed catalogue.
//
// The catalogue is a packed binary (`store.bin`) read by `store.wasm`. This
// module is only the pipe: it fetches both files, drops the bytes into the
// engine's buffer, hands it the active locale table, and asks for markup. It
// does not know what a category or an app is, and there is no JavaScript
// reader to fall out of sync with the format.

const WASM_URL = new URL('./store.wasm', import.meta.url);
const BIN_URL = new URL('./store.bin', import.meta.url);

const encoder = new TextEncoder();
const decoder = new TextDecoder();

let engine = null;
let memory = null;
let apps = 0;
let categories = 0;

/* Wire a TextDecoder onto a view into wasm memory. */
function viewOf(packed) {
	const pointer = Number(packed >> 32n);
	const length = Number(packed & 0xFFFFFFFFn);
	if (length === 0) return '';
	return decoder.decode(memory.subarray(pointer, pointer + length));
}

function ensureMemory() {
	if (!memory || memory.byteLength === 0) {
		memory = new Uint8Array(engine.memory.buffer);
	}
}

export function isStoreEngineReady() {
	return engine !== null;
}

export function storeCounts() {
	return { apps, categories };
}

/**
 * Fetch the engine and the catalogue and hand the bytes straight to wasm.
 * Rejects rather than degrading: there is no second reader.
 */
export async function initStoreEngine() {
	if (engine) return engine;

	const [wasmResponse, binResponse] = await Promise.all([fetch(WASM_URL), fetch(BIN_URL)]);
	if (!wasmResponse.ok || !binResponse.ok) {
		throw new Error(
			`store engine unavailable (wasm ${wasmResponse.status}, catalogue ${binResponse.status})`
		);
	}

	const [wasmBytes, binBytes] = await Promise.all([wasmResponse.arrayBuffer(), binResponse.arrayBuffer()]);
	const { instance } = await WebAssembly.instantiate(wasmBytes, {});
	engine = instance.exports;

	if (binBytes.byteLength > engine.pwa_store_bin_capacity()) {
		throw new Error(`catalogue of ${binBytes.byteLength} bytes does not fit the engine buffer`);
	}

	ensureMemory();
	memory.set(new Uint8Array(binBytes), engine.pwa_store_bin_ptr());
	const status = engine.pwa_store_load(binBytes.byteLength);
	if (status !== 0) {
		throw new Error(`catalogue rejected by the engine (status ${status})`);
	}

	const counts = engine.pwa_store_counts();
	apps = Number(counts >> 32n);
	categories = Number(counts & 0xFFFFFFFFn);
	return engine;
}

/**
 * Push a locale in. Tables are applied in order and a later table overrides an
 * earlier one, so passing [fallback, active] makes the active language win.
 */
export function pushLocales(tables) {
	if (!engine) throw new Error('store engine not initialised');
	ensureMemory();

	engine.pwa_store_l10n_reset();
	const base = engine.pwa_store_staging_ptr();
	const capacity = engine.pwa_store_staging_capacity();
	let offset = 0;

	for (const table of tables) {
		if (!table) continue;
		for (const key of Object.keys(table)) {
			const value = table[key];
			if (typeof value !== 'string') continue;
			const keyBytes = encoder.encode(key);
			const valueBytes = encoder.encode(value);
			if (capacity < offset + keyBytes.length + valueBytes.length) {
				throw new Error('locale table does not fit the engine staging buffer');
			}
			memory.set(keyBytes, base + offset);
			memory.set(valueBytes, base + offset + keyBytes.length);
			const status = engine.pwa_store_l10n_add(offset, keyBytes.length, valueBytes.length);
			if (status !== 0) throw new Error(`engine refused locale key "${key}" (status ${status})`);
			offset += keyBytes.length + valueBytes.length;
		}
	}
	return engine.pwa_store_l10n_count();
}

/**
 * The filter toolbar, as a bit field: which kinds of app are switched on.
 */
export function filterFlags({ pwa, wechat, native }) {
	return (pwa ? 1 : 0) | (wechat ? 2 : 0) | (native ? 4 : 0);
}

/**
 * Render one page. Returns the markup plus the numbers the pagination bar
 * needs; the engine has already applied the query, the filters, the NSFW gate
 * and the paging.
 */
export function renderCatalogue({ query = '', page = 1, pageSize = 200, flags = 1, nsfw = false, install = false }) {
	if (!engine) throw new Error('store engine not initialised');
	ensureMemory();

	const queryBytes = encoder.encode(query);
	if (queryBytes.length > engine.pwa_store_query_capacity()) {
		throw new Error('search query too long');
	}
	memory.set(queryBytes, engine.pwa_store_query_ptr());

	const packed = engine.pwa_store_render(
		queryBytes.length,
		page,
		pageSize,
		flags,
		nsfw ? 1 : 0,
		install ? 1 : 0
	);
	if (packed === 0n) {
		throw new Error('engine produced an empty page');
	}

	return {
		html: viewOf(packed),
		legend: viewOf(engine.pwa_store_legend()),
		total: engine.pwa_store_last_total(),
		pages: engine.pwa_store_last_pages(),
		page: engine.pwa_store_last_page(),
		pageApps: engine.pwa_store_last_page_apps(),
	};
}
