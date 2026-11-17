#!/usr/bin/env node
// Derive Web Install API manifest data that Edge will actually accept.
//
// Edge rejects a manifest when: the URL redirects or is unreachable, the
// Content-Type is not JSON, start_url is on a different origin from the
// manifest, required fields are missing, or a supplied manifestId does not
// equal the browser's computed id. This script validates every candidate
// against those rules and writes only the ones that pass.
//
// It never edits apptype/apptype_hide. Edge-only ("msedge") apps keep their
// classification and only get a manifest for their local wrapper.
//
// Usage:
//   node scripts/refresh_manifest_data.js          # crawl, write report only
//   node scripts/refresh_manifest_data.js --apply  # also rewrite categories.js
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'docs/store/categories.js');
const REPORT = '/tmp/opencode/manifest-discovered.json';
const APPLY = process.argv.includes('--apply');
const TIMEOUT = 9000;
const CONCURRENCY = 20;

/* ---- source parsing ----------------------------------------------------- */

function loadCategories() {
  const src = fs.readFileSync(SRC, 'utf8');
  const code = src.replace(/export\s+const\s+categories\s*/, 'const categories ');
  return { src, categories: new Function(`${code}\n;return categories;`)() };
}

function scanObjects(src) {
  const objects = [];
  const stack = [];
  let quote = 0, esc = false, line = false, block = false;
  for (let i = 0; i < src.length; i++) {
    const c = src[i], n = src[i + 1];
    if (line) { if (c === '\n') line = false; continue; }
    if (block) { if (c === '*' && n === '/') { block = false; i++; } continue; }
    if (quote) {
      if (esc) { esc = false; continue; }
      if (c === '\\') { esc = true; continue; }
      if (c === String.fromCharCode(quote)) quote = 0;
      continue;
    }
    if (c === '/' && n === '/') { line = true; i++; continue; }
    if (c === '/' && n === '*') { block = true; i++; continue; }
    if (c === '"' || c === "'" || c === '`') { quote = c.charCodeAt(0); continue; }
    if (c === '{') stack.push(i);
    else if (c === '}') {
      const start = stack.pop();
      if (start !== undefined) objects.push({ start, end: i + 1, text: src.slice(start, i + 1) });
    }
  }
  return objects;
}

const FIELD_RE = /,\s*manifest(?:Url|Id)2?\s*:\s*(?:"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g;

function rewriteObject(object, fields) {
  let text = object.text.replace(FIELD_RE, '');
  const closeIdx = text.lastIndexOf('}');
  const before = text.slice(0, closeIdx);
  const lastChar = before.trimEnd().length - 1;
  const gap = before.slice(lastChar + 1, closeIdx);
  const multiline = gap.includes('\n');
  const props = Object.entries(fields)
    .filter(([, v]) => typeof v === 'string' && v)
    .map(([k, v]) => `${k}: ${JSON.stringify(v)}`);
  if (!props.length) return text;
  const lineStart = before.lastIndexOf('\n', lastChar) + 1;
  const indent = multiline ? before.slice(lineStart, lastChar + 1).match(/^\s*/)[0] : '';
  const addition = multiline ? `,\n${indent}${props.join(`,\n${indent}`)}` : `, ${props.join(', ')}`;
  const trailingComma = text[lastChar] === ',';
  const inserted = trailingComma ? addition.replace(/^,/, '') : addition;
  return text.slice(0, lastChar + 1) + inserted + text.slice(lastChar + 1);
}

/* ---- network + manifest validation ------------------------------------- */

async function fetchPage(url) {
  const res = await fetch(url, {
    signal: AbortSignal.timeout(TIMEOUT), redirect: 'follow',
    headers: { 'user-agent': 'Mozilla/5.0 (compatible; PWAStoreManifestAudit/1.0)' },
  });
  if (res.status !== 200) return { status: res.status };
  return { status: 200, text: await res.text(), url: res.url };
}

async function fetchManifest(url) {
  const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT), redirect: 'manual' });
  const ctype = res.headers.get('content-type') || '';
  if (res.status !== 200) return { status: res.status, ctype };
  return { status: 200, ctype, text: await res.text(), url: res.url };
}

function manifestFromJson(json, ctype, manifestUrl) {
  if (!/json/i.test(ctype)) return { reason: 'non-JSON Content-Type' };
  let m;
  try { m = JSON.parse(json); } catch { return { reason: 'invalid JSON' }; }
  if (!m || typeof m !== 'object' || Array.isArray(m)) return { reason: 'not an object' };
  if (typeof m.name !== 'string' && typeof m.short_name !== 'string') return { reason: 'no name' };
  if (!Array.isArray(m.icons) || m.icons.length === 0) return { reason: 'no icons' };
  let start;
  try { start = new URL(m.start_url || './', manifestUrl).href; } catch { return { reason: 'bad start_url' }; }
  const startOrigin = new URL(start).origin;
  if (startOrigin !== new URL(manifestUrl).origin) return { reason: 'cross-origin start_url' };
  start = start.split('#')[0];
  let id; // present only when the manifest declares a usable id
  if (typeof m.id === 'string' && m.id) {
    try {
      const parsed = new URL(m.id, startOrigin);
      if (parsed.origin === startOrigin) id = parsed.href.split('#')[0];
    } catch { /* ignore an invalid id */ }
  }
  return { ok: true, manifestUrl, manifestId: id ? undefined : start, computedId: id || start };
}

function manifestHref(html) {
  for (const match of html.matchAll(/<link\b[^>]*>/gi)) {
    const tag = match[0];
    const rel = (tag.match(/\brel\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i) || []).slice(1).find(Boolean);
    if (!rel || !/(^|\s)manifest(\s|$)/i.test(rel)) continue;
    const href = (tag.match(/\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i) || []).slice(1).find(Boolean);
    if (href) return href;
  }
  return null;
}

async function validateManifestUrl(manifestUrl) {
  try {
    const res = await fetchManifest(manifestUrl);
    if (res.status !== 200) return { reason: `HTTP ${res.status}` };
    return manifestFromJson(res.text, res.ctype, res.url);
  } catch (e) {
    return { reason: e.name === 'TimeoutError' ? 'timeout' : 'fetch failed' };
  }
}

async function discover(documentUrl) {
  try {
    const page = await fetchPage(documentUrl);
    if (page.status !== 200) return { reason: `page HTTP ${page.status}` };
    const href = manifestHref(page.text);
    if (!href) return { reason: 'no manifest link' };
    const manifestUrl = new URL(href, page.url).href;
    if (/^data:/i.test(manifestUrl)) return { reason: 'data: manifest' };
    return await validateManifestUrl(manifestUrl);
  } catch (e) {
    return { reason: e.name === 'TimeoutError' ? 'timeout' : 'fetch failed' };
  }
}

const NON_PWA = new Set(['wechatmini', 'native', 'wechat', 'extension']);
function isRemoteHttp(url) {
  try { return /^https?:$/.test(new URL(url).protocol); } catch { return false; }
}
function isLocalWrapper(url) { return typeof url === 'string' && /^\.\.\/(wrappers|msedge)\//.test(url); }
function blockedPrimary(app) {
  return app.apptype_hide === 'msedge' || app.apptype === 'wrapper' ||
    (app.apptype && NON_PWA.has(app.apptype)) || !isRemoteHttp(app.url);
}

/* ---- crawl -------------------------------------------------------------- */

async function main() {
  const { src, categories } = loadCategories();
  const apps = categories.flatMap((c) => c.apps);
  let report = {};
  if (fs.existsSync(REPORT)) report = JSON.parse(fs.readFileSync(REPORT, 'utf8'));

  const queue = [];
  apps.forEach((app, i) => {
    if (!blockedPrimary(app) && (!report[i] || report[i].needsRetry)) queue.push({ i, url: app.url });
    if (app.url2 && isRemoteHttp(app.url2) && app.apptype2 !== 'wrapper' && app.apptype_hide !== 'msedge' &&
        (!report[`${i}b`] || report[`${i}b`].needsRetry)) queue.push({ i: `${i}b`, url: app.url2 });
  });
  console.log(`candidates to check: ${queue.length}`);

  let done = 0;
  const save = () => fs.writeFileSync(REPORT, JSON.stringify(report, null, 2));
  async function worker() {
    while (queue.length) {
      const job = queue.shift();
      const app = apps[typeof job.i === 'string' ? Number(job.i.replace('b', '')) : job.i];
      const existing = job.i.toString().endsWith('b') ? app.manifestUrl2 : app.manifestUrl;
      let result;
      if (existing && isRemoteHttp(existing)) {
        result = await validateManifestUrl(existing);
        if (!result.ok) result = await discover(job.url);
      } else {
        result = await discover(job.url);
      }
      report[job.i] = result.ok
        ? { manifestUrl: result.manifestUrl, manifestId: result.manifestId || null, computedId: result.computedId }
        : { fail: result.reason, needsRetry: /timeout|fetch failed/.test(result.reason || '') };
      if (++done % 50 === 0) { save(); console.log(`  checked ${done}/${queue.length + Object.keys(report).length}`); }
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  save();

  const ok = Object.values(report).filter((r) => r.manifestUrl).length;
  console.log(`report: ${REPORT} (${ok} valid manifests, ${Object.keys(report).length - ok} rejected)`);
  if (!APPLY) { console.log('dry run (pass --apply to rewrite categories.js)'); return; }

  const objects = scanObjects(src);
  const catObjects = [], appObjects = [];
  for (const object of objects) {
    let v;
    try { v = new Function(`return (${object.text})`)(); } catch { continue; }
    if (v && Array.isArray(v.apps)) catObjects.push(object); else appObjects.push(object);
  }
  if (appObjects.length !== apps.length) throw new Error('object/app count mismatch');

  const edits = [];
  apps.forEach((app, i) => {
    const fields = {};
    const primary = report[i];
    const secondary = report[`${i}b`];
    if (primary && primary.manifestUrl) {
      fields.manifestUrl = primary.manifestUrl;
      if (primary.manifestId) fields.manifestId = primary.manifestId;
    }
    if (isLocalWrapper(app.url2)) {
      // Local wrapper manifests are already valid and stay msedge/wrapper type.
      if (app.manifestUrl2) fields.manifestUrl2 = app.manifestUrl2;
      if (app.manifestId2) fields.manifestId2 = app.manifestId2;
    } else if (secondary && secondary.manifestUrl) {
      fields.manifestUrl2 = secondary.manifestUrl;
      if (secondary.manifestId) fields.manifestId2 = secondary.manifestId;
    }
    edits.push({ object: appObjects[i], fields });
  });

  // Apply from the end so offsets remain valid.
  edits.sort((a, b) => b.object.start - a.object.start);
  let output = src;
  for (const edit of edits) output = output.slice(0, edit.object.start) +
    rewriteObject(edit.object, edit.fields) + output.slice(edit.object.end);
  fs.writeFileSync(SRC, output);
  console.log(`updated ${SRC}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
