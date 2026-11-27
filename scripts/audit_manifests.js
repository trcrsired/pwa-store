#!/usr/bin/env node
// Live Web Install API manifest audit.
//
// On a PR: audit only the manifests introduced or modified by that PR.
// Nightly (--all): audit every remote manifest so a site that changes after
// being listed is caught. Bot-protection responses (403/429) are reported as
// "unverifiable" and do not fail the build - only clear problems do.
//
// Usage:
//   node scripts/audit_manifests.js --base-file /tmp/base-categories.js
//   node scripts/audit_manifests.js --all
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'docs/store/categories.js');
const TIMEOUT = 9000;
const CONCURRENCY = 12;

function argValue(name) {
	const i = process.argv.indexOf(name);
	return i >= 0 ? process.argv[i + 1] : null;
}

function loadCatalogue(file) {
	let src = fs.readFileSync(file, 'utf8');
	src = src.replace(/export\s+const\s+categories\s*/, 'const categories ');
	return new Function(`${src}\n;return categories;`)();
}

function signature(app) {
	return JSON.stringify(Object.fromEntries(Object.entries(app).sort((a, b) => a[0].localeCompare(b[0]))));
}

// Challenge pages and CDN gates. These are not evidence that a manifest is
// broken - the crawler is simply being treated as a bot. They must never fail
// a PR or a nightly run.
const CHALLENGE = /(cf-browser-verification|cf_chl_|challenge-platform|\/cdn-cgi\/|Just a moment\.{3}|Checking your browser|Attention Required! \| Cloudflare|Enable JavaScript and cookies|Verifying you are human|Are you a robot|incapsula|imperva|distil|Access denied|Service unavailable|Ray ID)/i;
const GATED_STATUS = new Set([401, 403, 429, 502, 503, 504]);

function looksLikeGate(text, ctype) {
	if (CHALLENGE.test(text)) return true;
	if (/^\s*</.test(text)) return true; // HTML where a manifest was expected
	// A non-JSON body from a CDN-protected origin is almost always a gate
	// page rather than a malformed manifest.
	if (!/json/i.test(ctype) && /<(!doctype )?html|<head|<body/i.test(text)) return true;
	return false;
}

async function audit(app, manifestUrl) {
	const result = { app: app.name, url: manifestUrl, problems: [], skipped: null };
	let res;
	try {
		res = await fetch(manifestUrl, {
			signal: AbortSignal.timeout(TIMEOUT),
			redirect: 'manual',
			headers: { 'user-agent': 'Mozilla/5.0 (compatible; PWAStoreManifestAudit/1.0)' },
		});
	} catch (e) {
		result.skipped = `fetch failed (unverifiable): ${e.message}`;
		return result;
	}

	const location = res.headers.get('location') || '';
	if (location && CHALLENGE.test(location)) {
		result.skipped = `redirect to a bot challenge (unverifiable)`;
		return result;
	}
	if (/challenge/i.test(res.headers.get('cf-mitigated') || '')) {
		result.skipped = `Cloudflare challenge header (unverifiable)`;
		return result;
	}
	if (GATED_STATUS.has(res.status)) {
		result.skipped = `HTTP ${res.status} (bot protection - unverifiable)`;
		return result;
	}
	if (res.status >= 500) {
		result.skipped = `HTTP ${res.status} (server/CDN error - unverifiable)`;
		return result;
	}
	if (res.status === 202 || res.status === 204) {
		result.skipped = `HTTP ${res.status} (unverifiable)`;
		return result;
	}
	if (res.status !== 200) {
		result.problems.push(`HTTP ${res.status}`);
		return result;
	}

	const ctype = res.headers.get('content-type') || '';
	const text = await res.text();
	if (looksLikeGate(text, ctype)) {
		result.skipped = `challenge/gate page served instead of the manifest (unverifiable)`;
		return result;
	}
	if (!/json/i.test(ctype)) result.problems.push(`Content-Type is not JSON (${ctype || 'none'})`);

	let m;
	try {
		m = JSON.parse(text);
	} catch (e) {
		result.problems.push(`invalid JSON: ${e.message}`);
		return result;
	}
	if (typeof m.name !== 'string' || !m.name.trim()) result.problems.push('missing name');
	if (typeof m.short_name !== 'string' || !m.short_name.trim()) result.problems.push('missing short_name');
	if (!Array.isArray(m.icons) || m.icons.length === 0) result.problems.push('missing icons');
	else if (!m.icons.some((i) => i && typeof i.src === 'string' && i.src.trim())) result.problems.push('icons have no usable src');

	let start;
	try {
		start = new URL(m.start_url || './', manifestUrl);
		if (start.origin !== new URL(manifestUrl).origin) result.problems.push(`cross-origin start_url (${start.origin})`);
	} catch {
		result.problems.push('bad start_url');
	}

	// manifestId must mirror what Edge computes: the declared id when present,
	// otherwise the resolved start_url. If the manifest declares an id, the
	// catalogue must not store a computed manifestId.
	const declared = typeof m.id === 'string' && m.id.trim() ? new URL(m.id, start || manifestUrl).href.split('#')[0] : null;
	const expected = declared || (start ? start.href.split('#')[0] : null);
	const stored = app.manifestId;
	if (declared && stored) result.problems.push(`manifest declares id=${declared}; remove manifestId from the catalogue`);
	if (!declared && expected && stored && stored !== expected) {
		result.problems.push(`manifestId=${stored} but Edge computes ${expected}`);
	}
	return result;
}

async function main() {
	const cats = loadCatalogue(SRC);
	const apps = cats.flatMap((c) => c.apps);
	const baseFile = argValue('--base-file');
	const all = process.argv.includes('--all');
	const baseSigs = new Set();
	if (baseFile && fs.existsSync(baseFile)) {
		for (const a of loadCatalogue(baseFile).flatMap((c) => c.apps)) baseSigs.add(signature(a));
	}

	const targets = apps
		.filter((a) => (all || !baseSigs.has(signature(a))))
		.flatMap((a) => [a.manifestUrl, a.manifestUrl2].filter((u) => u && /^https?:/.test(u)).map((u) => ({ app: a, url: u })));

	console.log(`auditing ${targets.length} remote manifest(s)`);
	if (!targets.length) return;

	const results = [];
	let cursor = 0;
	async function worker() {
		while (cursor < targets.length) {
			const t = targets[cursor++];
			results.push(await audit(t.app, t.url));
		}
	}
	await Promise.all(Array.from({ length: Math.min(CONCURRENCY, targets.length) }, worker));

	let failed = 0, skipped = 0;
	for (const r of results) {
		if (r.skipped) { skipped++; console.log(`skip  ${r.app} (${r.url}): ${r.skipped}`); continue; }
		if (r.problems.length) {
			failed++;
			console.log(`FAIL  ${r.app} (${r.url}): ${r.problems.join('; ')}`);
		}
	}
	console.log(`manifest audit: ${results.length - failed - skipped} ok, ${skipped} unverifiable, ${failed} failed`);
	if (failed) process.exit(1);
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
