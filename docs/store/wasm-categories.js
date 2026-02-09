import './localewasm/enus.js';
import './localewasm/zhcn.js';
import { setLocale, L } from './localewasm/localization.js';

// ------------------------------------------------------------
// Supported locales (WASM files you actually ship)
// ------------------------------------------------------------
const SUPPORTED_LOCALES = {
  enus: true,
  zhcn: true,
};

// ------------------------------------------------------------
// Resolve browser locale → supported locale
// ------------------------------------------------------------
function resolveStoreLocale() {
  const raw = (navigator.language || 'en').toLowerCase();

  const normalized = raw.replace(/_/g, '-');

  if (SUPPORTED_LOCALES[normalized]) {
    return normalized;
  }

  const prefix = normalized.split('-')[0];
  if (SUPPORTED_LOCALES[prefix]) {
    return prefix;
  }

  return 'enus';
}

// ------------------------------------------------------------
// Global WASM exports handle
// ------------------------------------------------------------
let wasmExports = null;

// ------------------------------------------------------------
// Load WASM locale once (no setLocale here)
// ------------------------------------------------------------
async function loadLocaleWasmOnce() {
  const locale = resolveStoreLocale();
  const wasmUrl = `/store/wasm/${locale}.wasm`;

  const response = await fetch(wasmUrl);
  if (!response.ok) {
    console.error(`FATAL: WASM missing: ${wasmUrl}`);
    return;
  }

  const importObject = {
    wasi_snapshot_preview1: {
      proc_exit: (code) => {
        throw new WebAssembly.RuntimeError('WASM exited with code ' + code);
      },
    },
  };

  const { instance } = await WebAssembly.instantiateStreaming(response, importObject);
  wasmExports = instance.exports;
  wasmExports.__wasm_call_ctors();

  // Expose exports + memory for rendering

  console.log(`Loaded locale WASM: ${locale}`);
}

// ------------------------------------------------------------
// Clipboard + install helpers (used by WASM-generated DOM)
// ------------------------------------------------------------
function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert(L('wechatminiurlcopied_succ'));
    })
    .catch(() => {
      alert(L('wechatminiurlcopied_fail'));
    });
}

const has_navigator_install = typeof navigator.install === 'function';

function sanitize_install_url(url) {
  if (!url) return '';
  if (url === '.') return window.location.href;

  const shouldForceTrailingSlash =
    (url.startsWith('/') || url.startsWith('.')) &&
    !url.endsWith('/') &&
    !url.includes('?') &&
    !url.includes('#') &&
    !url.split('/').pop().includes('.');

  try {
    const resolved = new URL(url, window.location.href);
    if (shouldForceTrailingSlash && !resolved.pathname.endsWith('/')) {
      resolved.pathname += '/';
    }
    return resolved.toString();
  } catch {
    return url;
  }
}

async function install_callback(e) {
  let sanitizedUrl = '';
  try {
    const targetUrl = e.currentTarget.dataset.url;
    sanitizedUrl = sanitize_install_url(targetUrl);
    await navigator.install(sanitizedUrl);
  } catch (err) {
    alert(
      `${L('installfailed_desc')}${err}\n${sanitizedUrl}\n${L('tryinstallmanually_desc')}`,
    );
  }
}

// ------------------------------------------------------------
// Toggle-all label helper (still JS-side)
// ------------------------------------------------------------
function updateToggleAllButtonLabel() {
  const toggleAllButton = document.getElementById('toggle-all-btn');
  if (!toggleAllButton) return;

  const headings = document.querySelectorAll('.category-heading');
  if (headings.length === 0) {
    toggleAllButton.disabled = true;
    toggleAllButton.textContent = L('Expand All');
    return;
  }

  toggleAllButton.disabled = false;
  const allExpanded = Array.from(headings).every((h) =>
    h.classList.contains('expanded'),
  );
  toggleAllButton.textContent = allExpanded ? L('Collapse All') : L('Expand All');
}

// ------------------------------------------------------------
// Search + filters wired directly to WASM
// ------------------------------------------------------------
const setupSearch = () => {
  const input = document.getElementById('search-input');
  if (!input) return;

  input.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    renderStoreWasm(query);
  });
};

await loadLocaleWasmOnce();

const filterPWA = document.getElementById('filter-pwa');
const filterWeChat = document.getElementById('filter-wechat');
const filterNative = document.getElementById('filter-native');
const searchInput = document.getElementById('search-input');
// ------------------------------------------------------------
// WASM-driven store rendering
// ------------------------------------------------------------

async function renderStoreWasm(filterText = '') {
  if (!wasmExports) return;

  const root = document.getElementById('app-store');
  const resultCount = document.getElementById('result-count');
  if (!root || !resultCount) return;

  const encoder = new TextEncoder();
  const bytes = encoder.encode(filterText);

  const nosearchtext = (filterText.length === 0);

  if (!nosearchtext) {
    const ptr = wasmExports.resize_search_text(bytes.length);
    const mem = new Uint8Array(wasmExports.memory.buffer, ptr, bytes.length);
    mem.set(bytes);
  }

  const mask =
    (nosearchtext ? 1 : 0) |          // bit 0: empty search
    (filterPWA.checked ? 2 : 0) |      // bit 1: PWA/wrapper/msedge
    (filterWeChat.checked ? 4 : 0) |   // bit 2: WeChat/WeChatMini
    (filterNative.checked ? 8 : 0) |   // bit 3: Native
    (has_navigator_install ? 16 : 0);  // bit 4: install available

  const dataPtr = wasmExports.generate_dom(mask);
  const dataLen = wasmExports.get_generated_dom_size();

  const htmlBytes = new Uint8Array(wasmExports.memory.buffer, dataPtr, dataLen);
  const html = new TextDecoder().decode(htmlBytes);

  root.innerHTML = html;

  const count = wasmExports.get_last_found_entries_count();
  resultCount.textContent = `${count} APP${count !== 1 ? 's' : ''}`;

  updateToggleAllButtonLabel();
}

// ------------------------------------------------------------
// Initialize everything
// ------------------------------------------------------------

async function initStore() {
  if (!wasmExports) return;

  const savedPWA = localStorage.getItem('filter-pwa');
  const savedWeChat = localStorage.getItem('filter-wechat');
  const savedNative = localStorage.getItem('filter-native');

  if (filterPWA) {
    filterPWA.checked = savedPWA === null ? true : savedPWA === 'true';
  }
  if (filterWeChat) {
    filterWeChat.checked = savedWeChat === 'true';
  }
  if (filterNative) {
    filterNative.checked = savedNative === 'true';
  }

  await renderStoreWasm('');
  setupSearch();
}

initStore();
//document.addEventListener('DOMContentLoaded', initStore);
// ------------------------------------------------------------
// Filter change handlers
// ------------------------------------------------------------
filterPWA?.addEventListener('change', () => {
  localStorage.setItem('filter-pwa', filterPWA.checked);
  const searchText = searchInput?.value?.toLowerCase() || '';
  renderStoreWasm(searchText);
});

filterWeChat?.addEventListener('change', () => {
  localStorage.setItem('filter-wechat', filterWeChat.checked);
  const searchText = searchInput?.value?.toLowerCase() || '';
  renderStoreWasm(searchText);
});

filterNative?.addEventListener('change', () => {
  localStorage.setItem('filter-native', filterNative.checked);
  const searchText = searchInput?.value?.toLowerCase() || '';
  renderStoreWasm(searchText);
});

// ------------------------------------------------------------
// Toggle-all button
// ------------------------------------------------------------
const toggleAllButton = document.getElementById('toggle-all-btn');
updateToggleAllButtonLabel();

toggleAllButton?.addEventListener('click', () => {
  const headings = document.querySelectorAll('.category-heading');
  if (headings.length === 0) return;

  const allExpanded = Array.from(headings).every((heading) =>
    heading.classList.contains('expanded'),
  );
  const expand = !allExpanded;

  headings.forEach((heading) => {
    const grid = heading.nextElementSibling;
    if (!(grid instanceof HTMLElement)) return;

    const storageKey =
      heading.dataset.storageKey || `category-expanded-${heading.textContent}`;

    grid.classList.toggle('expanded', expand);
    grid.classList.toggle('collapsed', !expand);
    heading.classList.toggle('expanded', expand);
    heading.setAttribute('aria-expanded', String(expand));
    localStorage.setItem(storageKey, expand);
  });

  updateToggleAllButtonLabel();
});
