#!/usr/bin/env node
// Add Web Install API manifest fields to docs/store/categories.js.
//
// The new `navigator.install({ manifest, manifestId })` entry point installs a
// web app from its manifest URL, not from a document URL. This script attaches
// the two pieces of data the call needs:
//
//   manifestUrl / manifestUrl2   the manifest to fetch
//   manifestId  / manifestId2    the computed id, ONLY when the manifest has no
//                               `id` member (the API requires it in that case)
//
// It never edits apptype/apptype_hide: sites that are only installable through
// Microsoft Edge keep that classification and only get a manifest for their
// local wrapper, never for the remote site.
//
// Sources, in priority order:
//   1. local wrapper directories that actually contain a manifest.json
//   2. the curated scripts/categories.js dataset (manifestUrl / manifestId)
//   3. optional live fetch (`--fetch`, off by default)
//
// Usage:
//   node scripts/update_manifest_fields.js            # dry run, report only
//   node scripts/update_manifest_fields.js --write    # update categories.js
//   node scripts/update_manifest_fields.js --write --fetch
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'docs/store/categories.js');
const CURATED = path.join(ROOT, 'scripts/categories.js');

const argv = new Set(process.argv.slice(2));
const WRITE = argv.has('--write');
const FETCH = argv.has('--fetch');

/* ---- source editing helpers -------------------------------------------- */

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

function loadCategories(file) {
  const src = fs.readFileSync(file, 'utf8');
  const code = src.replace(/export\s+const\s+categories\s*/, 'const categories ');
  return { src, categories: new Function(`${code}\n;return categories;`)() };
}

function insertFields(src, object, fields) {
  const closeIdx = object.end - 1;
  const before = src.slice(0, closeIdx);
  const lastChar = before.trimEnd().length - 1;
  const gap = before.slice(lastChar + 1, closeIdx);
  const multiline = gap.includes('\n');
  const props = Object.entries(fields).map(([k, v]) => `${k}: ${JSON.stringify(v)}`);
  if (!props.length) return src;
  const lineStart = before.lastIndexOf('\n', lastChar) + 1;
  const indent = multiline ? before.slice(lineStart, lastChar + 1).match(/^\s*/)[0] : '';
  const addition = multiline
    ? `,\n${indent}${props.join(`,\n${indent}`)}`
    : `, ${props.join(', ')}`;
  const trailingComma = src[lastChar] === ',';
  const at = lastChar + 1;
  const inserted = trailingComma ? addition.replace(/^,/, '') : addition;
  return src.slice(0, at) + inserted + src.slice(at);
}

/* ---- manifest helpers -------------------------------------------------- */

function normaliseUrl(value) {
  return String(value || '').trim().toLowerCase()
    .replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/[?#].*$/, '').replace(/\/+$/, '');
}

function isLocalWrapperUrl(value) {
  return typeof value === 'string' && /^\.\.\/(wrappers|msedge)\//.test(value);
}

function localManifest(url) {
  if (!isLocalWrapperUrl(url)) return null;
  const match = url.match(/^\.\.\/(wrappers|msedge)\/([^/?#]+)/);
  if (!match) return null;
  const root = match[1] === 'msedge'
    ? path.join(ROOT, 'docs/msedge')
    : path.join(ROOT, 'docs/wrappers');
  const candidate = path.join(root, match[2], 'manifest.json');
  return fs.existsSync(candidate) ? `${url.replace(/\/+$/, '')}/manifest.json` : null;
}

function validRemoteManifest(url) {
  if (typeof url !== 'string') return false;
  if (/^data:/i.test(url)) return false; // opaque origin, cannot be installed cross-origin
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

async function fetchManifest(documentUrl, timeout = 8000) {
  try {
    const res = await fetch(documentUrl, { signal: AbortSignal.timeout(timeout), redirect: 'follow' });
    if (!res.ok) return null;
    const html = await res.text();
    const href = html.match(/<link[^>]+rel=["']?manifest["']?[^>]*>/i)?.[0]
      ?.match(/href=["']([^"']+)["']/i)?.[1];
    if (!href) return null;
    const manifestUrl = new URL(href, res.url).href;
    const mres = await fetch(manifestUrl, { signal: AbortSignal.timeout(timeout) });
    if (!mres.ok) return null;
    const manifest = await mres.json();
    // A real installable PWA needs a name and a same-origin start URL.
    if (!manifest || typeof manifest.name !== 'string') return null;
    const start = new URL(manifest.start_url || './', manifestUrl).href;
    if (new URL(start).origin !== new URL(manifestUrl).origin) return null;
    return { manifestUrl, manifestId: manifest.id ? undefined : start };
  } catch {
    return null;
  }
}

/* ---- main -------------------------------------------------------------- */

async function main() {
  const { src, categories } = loadCategories(SRC);
  const { categories: curated } = loadCategories(CURATED);

  const curatedByUrl = new Map();
  for (const cat of curated) {
    for (const app of cat.apps) {
      if (!validRemoteManifest(app.manifestUrl)) continue;
      const key = normaliseUrl(app.url);
      if (key && !curatedByUrl.has(key)) {
        curatedByUrl.set(key, {
          manifestUrl: app.manifestUrl,
          manifestId: app.manifestId ? undefined : (validRemoteManifest(app.url) ? app.url : undefined),
          manifestUrl2: validRemoteManifest(app.manifestUrl2) ? app.manifestUrl2 : undefined,
          manifestId2: app.manifestUrl2 && !app.manifestId2
            ? (validRemoteManifest(app.url2) ? app.url2 : undefined) : undefined,
        });
      }
    }
  }

  const objects = scanObjects(src);
  const appObjects = [];
  const catObjects = [];
  for (const object of objects) {
    let value;
    try { value = new Function(`return (${object.text})`)(); } catch { continue; }
    if (value && Array.isArray(value.apps)) catObjects.push(object);
    else appObjects.push(object);
  }

  const apps = categories.flatMap((c) => c.apps);
  if (appObjects.length !== apps.length) {
    throw new Error(`parsed ${appObjects.length} app objects but ${apps.length} apps`);
  }

  const edits = [];
  let primaryCount = 0, secondaryCount = 0;
  for (let i = 0; i < apps.length; i++) {
    const app = apps[i];
    const object = appObjects[i];
    const fields = {};
    const edgeOnly = app.apptype_hide === 'msedge';

    /* Primary manifest. Already-populated apps are left untouched so the
     * script is safe to re-run. */
    if (!app.manifestUrl && (!app.apptype || app.apptype === 'pwa' || app.apptype === 'wrapper')) {
      const local = localManifest(app.url);
      if (app.apptype === 'wrapper' && local) {
        fields.manifestUrl = local; // wrapper manifests declare an id
      } else if (!edgeOnly && !app.apptype) {
        const curatedEntry = curatedByUrl.get(normaliseUrl(app.url));
        if (curatedEntry) {
          fields.manifestUrl = curatedEntry.manifestUrl;
          if (curatedEntry.manifestId) fields.manifestId = curatedEntry.manifestId;
        } else if (FETCH && validRemoteManifest(app.url)) {
          const fetched = await fetchManifest(app.url);
          if (fetched) {
            fields.manifestUrl = fetched.manifestUrl;
            if (fetched.manifestId) fields.manifestId = fetched.manifestId;
          }
        }
      }
    }

    /* Secondary manifest (wrappers and Edge-only sites are all local). */
    if (app.url2 && !app.manifestUrl2) {
      const local2 = localManifest(app.url2);
      if (local2) {
        fields.manifestUrl2 = local2;
      } else if (app.apptype2 !== 'wrapper' && !edgeOnly) {
        const curatedEntry = curatedByUrl.get(normaliseUrl(app.url2));
        if (curatedEntry && curatedEntry.manifestUrl2) {
          fields.manifestUrl2 = curatedEntry.manifestUrl2;
          if (curatedEntry.manifestId2) fields.manifestId2 = curatedEntry.manifestId2;
        } else if (FETCH && validRemoteManifest(app.url2)) {
          const fetched = await fetchManifest(app.url2);
          if (fetched) {
            fields.manifestUrl2 = fetched.manifestUrl;
            if (fetched.manifestId) fields.manifestId2 = fetched.manifestId;
          }
        }
      }
    }

    if (fields.manifestUrl) primaryCount++;
    if (fields.manifestUrl2) secondaryCount++;
    if (Object.keys(fields).length) {
      edits.push({ start: object.start, end: object.end, fields });
    }
  }

  console.log(`apps: ${apps.length}, primary manifests: ${primaryCount}, ` +
    `secondary manifests: ${secondaryCount}, apps edited: ${edits.length}`);

  if (!WRITE) {
    console.log('dry run (pass --write to update docs/store/categories.js)');
    return;
  }

  let output = src;
  // Apply from the end so earlier offsets stay valid.
  edits.sort((a, b) => b.start - a.start);
  for (const edit of edits) {
    const object = { start: edit.start, end: edit.end };
    output = insertFields(output, object, edit.fields);
  }
  fs.writeFileSync(SRC, output);
  console.log(`updated ${SRC}`);
}

main().catch((error) => { console.error(error); process.exit(1); });
