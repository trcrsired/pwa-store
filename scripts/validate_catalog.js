#!/usr/bin/env node
// Static catalogue validation, designed for CI on every PR.
//
// Two tiers:
//   * global checks  - invariants that hold for the whole catalogue today
//   * change checks  - strict rules applied only to apps that are new or
//                     modified relative to a base version of categories.js.
// The split matters: the catalogue has legacy entries without nameKey, with
// oversized icons or with missing translations. Those are reported as warnings
// but a PR may not introduce any new ones.
//
// Usage:
//   node scripts/validate_catalog.js
//   node scripts/validate_catalog.js --base-file /tmp/base-categories.js
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'docs/store/categories.js');

function argValue(name) {
	const i = process.argv.indexOf(name);
	return i >= 0 ? process.argv[i + 1] : null;
}

function loadCatalogue(file) {
	let src = fs.readFileSync(file, 'utf8');
	src = src.replace(/export\s+const\s+categories\s*/, 'const categories ');
	return new Function(`${src}\n;return categories;`)();
}

// Stable signature: source order of object keys carries no meaning.
function signature(app) {
	return JSON.stringify(Object.fromEntries(Object.entries(app).sort((a, b) => a[0].localeCompare(b[0]))));
}

function normalUrl(u) {
	try {
		return new URL(u).href.replace(/\/+$/, '').toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '');
	} catch {
		return String(u || '').toLowerCase();
	}
}

// WebP dimensions without a native dependency: RIFF chunk walk.
function webpSize(buf) {
	if (buf.length < 16 || buf.toString('ascii', 0, 4) !== 'RIFF' || buf.toString('ascii', 8, 12) !== 'WEBP') return null;
	let off = 12;
	while (off + 8 <= buf.length) {
		const fourcc = buf.toString('ascii', off, off + 4);
		const size = buf.readUInt32LE(off + 4);
		const p = off + 8;
		if (fourcc === 'VP8X') return [1 + buf.readUIntLE(p + 4, 3), 1 + buf.readUIntLE(p + 7, 3)];
		if (fourcc === 'VP8 ') {
			const w = buf.readUInt16LE(p + 6) & 0x3fff;
			const h = buf.readUInt16LE(p + 8) & 0x3fff;
			if (w && h) return [w, h];
		}
		if (fourcc === 'VP8L') {
			const b1 = buf[p + 1], b2 = buf[p + 2], b3 = buf[p + 3], b4 = buf[p + 4];
			return [1 + ((b1 | (b2 << 8)) & 0x3fff), 1 + (((b2 >> 6) | (b3 << 2) | (b4 << 10)) & 0x3fff)];
		}
		off = p + size + (size & 1);
	}
	return null;
}

function svgIsSquare(buf) {
	const text = buf.toString('utf8');
	if (!/<svg[\s>]/i.test(text)) return false;
	const vb = text.match(/viewBox\s*=\s*["']\s*[-\d.]+\s+[-\d.]+\s+([\d.]+)\s+([\d.]+)/i);
	if (vb) return Math.abs(Number(vb[1]) - Number(vb[2])) < 0.001;
	const w = text.match(/\bwidth\s*=\s*["']([\d.]+)/i);
	const h = text.match(/\bheight\s*=\s*["']([\d.]+)/i);
	return !!(w && h && Math.abs(Number(w[1]) - Number(h[1])) < 0.001);
}

async function loadLocaleTables() {
	const base = `file://${path.join(ROOT, 'docs/store/locale')}`;
	await import(`${base}/enus.js`);
	await import(`${base}/zhcn.js`);
	const loc = await import(`${base}/localization.js`);
	const tables = {};
	for (const name of ['enus', 'zhcn']) {
		loc.setLocale(name);
		tables[name] = loc.activeLocaleTables().at(-1);
	}
	return tables;
}

async function main() {
	const failures = [];
	const warnings = [];
	const fail = (msg) => failures.push(msg);
	const warn = (msg) => warnings.push(msg);

	const cats = loadCatalogue(SRC);
	const baseFile = argValue('--base-file');
	const baseCats = baseFile ? loadCatalogue(baseFile) : null;
	const baseApps = baseCats ? baseCats.flatMap((c) => c.apps) : null;
	const baseSigs = new Set((baseApps || []).map(signature));
	const locales = await loadLocaleTables();

	// ---- global invariants -------------------------------------------------
	const categoryNames = new Set();
	for (const c of cats) {
		if (!c.name || typeof c.name !== 'string') fail(`category has no name`);
		if (categoryNames.has(c.name)) fail(`duplicate category: ${c.name}`);
		categoryNames.add(c.name);
		if (!Array.isArray(c.apps)) fail(`category ${c.name}: apps is not an array`);
	}

	const allApps = cats.flatMap((c) => c.apps);
	for (const a of allApps) {
		const label = a.name || a.nameKey || '(unnamed)';
		for (const field of ['name', 'descriptionKey', 'icon']) {
			if (typeof a[field] !== 'string' || !a[field]) fail(`${label}: missing ${field}`);
		}
		if (!a.url && !a.url2 && a.apptype !== 'wechat') fail(`${label}: neither url nor url2`);
		// Legacy icon problems are reported but do not block CI; new entries
		// are checked strictly below.
		if (a.icon && !a.icon.startsWith('icons/')) warn(`${label}: legacy icon path is not under icons/ (${a.icon})`);
		if (a.icon && a.icon.startsWith('icons/')) {
			const iconPath = path.resolve(ROOT, 'docs/store', a.icon);
			if (!iconPath.startsWith(path.resolve(ROOT, 'docs/store') + path.sep)) warn(`${label}: legacy icon path escapes docs/store (${a.icon})`);
			else if (!fs.existsSync(iconPath)) warn(`${label}: legacy icon file missing (${a.icon})`);
		}
		for (const suffix of ['', '2']) {
			const mu = a[`manifestUrl${suffix}`];
			const mi = a[`manifestId${suffix}`];
			// manifestUrl2 may be a relative path to a local wrapper manifest.
			let muUrl = null;
			if (mu && /^https?:/i.test(mu)) {
				try {
					muUrl = new URL(mu);
					if (muUrl.hash) fail(`${label}: manifestUrl${suffix} has a fragment`);
				} catch {
					fail(`${label}: manifestUrl${suffix} is not a valid URL (${mu})`);
				}
			}
			if (mi) {
				if (!mu) fail(`${label}: manifestId${suffix} without manifestUrl${suffix}`);
				else {
					try {
						const idUrl = new URL(mi);
						if (idUrl.hash) fail(`${label}: manifestId${suffix} has a fragment`);
						if (muUrl && idUrl.origin !== muUrl.origin) fail(`${label}: manifestId${suffix} origin differs from manifestUrl${suffix}`);
					} catch {
						fail(`${label}: manifestId${suffix} is not a valid URL (${mi})`);
					}
				}
			}
		}
	}

	// ---- change checks -----------------------------------------------------
	const changed = baseCats ? allApps.filter((a) => !baseSigs.has(signature(a))) : [];
	if (baseCats && changed.length === 0) console.log('no new or modified apps');
	const allKeys = [...new Set(allApps.flatMap((a) => [a.nameKey, a.descriptionKey]).filter(Boolean))];
	for (const [loc, table] of Object.entries(locales)) {
		const missing = allKeys.filter((k) => !(k in table));
		if (missing.length) warn(`${loc}: ${missing.length} app keys missing from locale (legacy; e.g. ${missing.slice(0, 3).join(', ')})`);
	}

	for (const a of changed) {
		const label = a.name || a.nameKey || '(unnamed)';
		if (!a.nameKey) fail(`NEW ${label}: missing nameKey`);
		for (const [loc, table] of Object.entries(locales)) {
			for (const field of ['nameKey', 'descriptionKey']) {
				const key = a[field];
				if (key && !(key in table)) fail(`NEW ${label}: ${key} missing from ${loc} locale`);
			}
		}
		if (a.icon) {
			const iconPath = path.resolve(ROOT, 'docs/store', a.icon);
			if (!a.icon.startsWith('icons/') || !iconPath.startsWith(path.resolve(ROOT, 'docs/store') + path.sep)) {
				fail(`NEW ${label}: icon path must be under docs/store/icons/ (${a.icon})`);
			} else if (!fs.existsSync(iconPath)) {
				fail(`NEW ${label}: icon file missing (${a.icon})`);
			} else {
				const buf = fs.readFileSync(iconPath);
				if (a.icon.endsWith('.webp')) {
					const dims = webpSize(buf);
					if (!dims) fail(`NEW ${label}: cannot read WebP dimensions`);
					else if (dims[0] !== 256 || dims[1] !== 256) fail(`NEW ${label}: icon is ${dims[0]}x${dims[1]}, expected 256x256`);
				} else if (a.icon.endsWith('.svg')) {
					if (!svgIsSquare(buf)) fail(`NEW ${label}: SVG icon is not square`);
				} else {
					fail(`NEW ${label}: icon must be .webp or .svg (${a.icon})`);
				}
			}
		}
		// Newly introduced duplicate URLs inside one category.
		const url = a.url || a.url2;
		if (url) {
			for (const c of cats) {
				if (!c.apps.includes(a)) continue;
				const now = c.apps.filter((x) => x !== a && normalUrl(x.url || x.url2) === normalUrl(url)).length + 1;
				if (now > 1) fail(`NEW ${label}: duplicate URL in category ${c.name} (${url})`);
			}
		}
	}

	// Existing apps must not have their classification changed.
	if (baseApps) {
		const byKey = new Map();
		for (const a of baseApps) {
			const k = `${a.name}|${a.url || a.url2 || ''}`;
			if (!byKey.has(k)) byKey.set(k, a);
		}
		for (const a of allApps) {
			const old = byKey.get(`${a.name}|${a.url || a.url2 || ''}`);
			if (!old || baseSigs.has(signature(a))) continue;
			for (const field of ['apptype', 'apptype2', 'hide', 'apptype_hide']) {
				if (a[field] !== old[field]) fail(`CHANGED ${a.name}: must not change ${field} in a PWA-addition PR`);
			}
		}
	}

	// ---- report ------------------------------------------------------------
	for (const w of warnings) console.log(`warn  ${w}`);
	for (const f of failures) console.log(`FAIL  ${f}`);
	console.log(`checked ${allApps.length} apps, ${changed.length} new/modified, ${failures.length} failures`);
	if (failures.length) process.exit(1);
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
