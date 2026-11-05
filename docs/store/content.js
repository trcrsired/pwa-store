import './locale/enus.js';
import './locale/zhcn.js';
import { setLocale, L, activeLocaleTables } from './locale/localization.js';
import { getPreferredLanguage } from './preferedlanguage.js';
import { localizePage } from './lang.js';
import {
  initStoreEngine,
  isStoreEngineReady,
  pushLocales,
  filterFlags,
  renderCatalogue,
} from './storeengine.js';

// Pagination state
let currentPage = 1;
const defaultPageSize = 200;
let pageSize = parseInt(localStorage.getItem('page-size'), 10) || defaultPageSize;
if (pageSize < 1) pageSize = defaultPageSize;

function resolveStoreLocale() {
  // Check localStorage first (user preference)
  const savedLocale = localStorage.getItem('store-locale');
  if (savedLocale) return savedLocale;

  const raw = getPreferredLanguage();
  // Keep this in sync with supported locale files under `docs/store/locale/`.
  const map = {
    zh: 'zhcn',
    'zh-cn': 'zhcn',
    'zh-hans': 'zhcn',
    'zh-tw': 'zhcn',
  };

  return map[raw] || map[raw.split('-')[0]] || raw.replace(/-/g, '');
}

setLocale(resolveStoreLocale());

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert(L('wechatminiurlcopied_succ'));
  }).catch(() => {
    alert(L('wechatminiurlcopied_fail'));
  });
}

const has_navigator_install = typeof navigator.install === 'function';

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
    h.classList.contains('expanded')
  );
  toggleAllButton.textContent = allExpanded ? L('Collapse All') : L('Expand All');
}

function sanitize_install_url(url) {
  if (!url) return "";
  if (url === ".") return window.location.href;

  const shouldForceTrailingSlash =
    (url.startsWith("/") || url.startsWith(".")) &&
    !url.endsWith("/") &&
    !url.includes("?") &&
    !url.includes("#") &&
    !url.split("/").pop().includes(".");

  try {
    const resolved = new URL(url, window.location.href);
    if (shouldForceTrailingSlash && !resolved.pathname.endsWith("/")) {
      resolved.pathname += "/";
    }
    return resolved.toString();
  } catch {
    return url;
  }
}

async function install_url(targetUrl)
{
  if (typeof navigator.install !== 'function') return;
  let sanitizedUrl="";
  try {
    sanitizedUrl = sanitize_install_url(targetUrl);
    await navigator.install(sanitizedUrl);
  } catch (err) {
    alert( `${L('installfailed_desc')}${err}\n${sanitizedUrl}\n${L('tryinstallmanually_desc')}`);
  }
}

function isNSFWAllowed() {
  return localStorage.getItem("hiddenfeatures") === "true";
}

// What the last render was asked for, so the toolbar can re-issue it.
let currentQuery = '';

function currentFilterFlags() {
  return filterFlags({
    pwa: document.getElementById('filter-pwa')?.checked !== false,
    wechat: document.getElementById('filter-wechat')?.checked === true,
    native: document.getElementById('filter-native')?.checked === true,
  });
}

// Everything below the cards is markup the engine does not build: it needs
// input elements and buttons, so it is written here with localised labels and
// one delegated listener per container.
const escapeHTML = (text) =>
  String(text).replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));

const renderPagination = (containerId, state, showLegend) => {
  const row = document.getElementById(containerId);
  if (!row) return;

  if (state.total === 0) {
    row.innerHTML = '';
    row.style.display = 'none';
    return;
  }
  row.style.display = 'flex';

  let html = '';
  if (showLegend && state.legend) {
    html += `<div class="page-categories"><span class="page-categories-label">${escapeHTML(L('categories_label'))}:</span> ${state.legend}</div>`;
  }

  html += `<div class="pagination-info">${state.pageApps} ${escapeHTML(L('apps_on_page'))}</div>`;
  html += `<div class="pagination-info"><span>${escapeHTML(L('show_label'))}: </span>`
    + `<input type="number" class="pagesize-input" min="1" value="${pageSize}" />`
    + `<span> ${escapeHTML(L('per_page'))}</span></div>`;

  if (state.pages > 1) {
    html += `<div class="pagination-info"><span>${escapeHTML(L('page_label'))} </span>`
      + `<input type="number" class="pagination-input" min="1" max="${state.pages}" value="${state.page}" />`
      + `<span> ${escapeHTML(L('of_label'))} ${state.pages} (${state.total} ${escapeHTML(L('total_label'))})</span></div>`;
    html += `<button class="pagination-btn" data-page-step="-1"${state.page === 1 ? ' disabled' : ''}>←</button>`;
    html += `<button class="pagination-btn" data-page-step="1"${state.page === state.pages ? ' disabled' : ''}>→</button>`;
  } else {
    html += `<div class="pagination-info">(${state.total} ${escapeHTML(L('total_label'))})</div>`;
  }

  row.innerHTML = html;
};

// One listener for both pagination rows, installed once: the rows are replaced
// on every render, the containers are not.
function wirePaginationRow(containerId) {
  const row = document.getElementById(containerId);
  if (!row) return;

  row.addEventListener('click', (event) => {
    const badge = event.target.closest('.category-badge.clickable');
    if (badge) {
      goToCategory(badge.dataset.category, Number(badge.dataset.page));
      return;
    }
    const stepButton = event.target.closest('.pagination-btn[data-page-step]');
    if (stepButton && !stepButton.disabled) {
      goToPage(currentPage + Number(stepButton.dataset.pageStep));
    }
  });

  row.addEventListener('change', (event) => {
    if (event.target.classList.contains('pagesize-input')) {
      let newSize = parseInt(event.target.value, 10);
      if (!Number.isFinite(newSize) || newSize < 1) newSize = defaultPageSize;
      event.target.value = newSize;
      pageSize = newSize;
      localStorage.setItem('page-size', newSize);
      renderStore(currentQuery, 1);
      return;
    }
    if (event.target.classList.contains('pagination-input')) {
      let newPage = parseInt(event.target.value, 10);
      if (!Number.isFinite(newPage)) newPage = 1;
      goToPage(newPage);
    }
  });
}

function goToPage(page, scrollToCategory = null) {
  if (!Number.isFinite(page) || page < 1) page = 1;
  renderStore(currentQuery, page, scrollToCategory);
  if (!scrollToCategory) window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goToCategory(categoryName, page) {
  if (page !== currentPage) {
    renderStore(currentQuery, page, categoryName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  const heading = Array.from(document.querySelectorAll('.category-heading'))
    .find((candidate) => candidate.textContent.includes(categoryName));
  if (heading) heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function toggleCategoryBlock(heading) {
  const section = heading.closest('.category-block') || heading.parentElement;
  const grid = section?.querySelector('.app-grid');
  if (!grid) return;
  const expanded = !grid.classList.contains('expanded');
  grid.classList.toggle('expanded', expanded);
  grid.classList.toggle('collapsed', !expanded);
  heading.classList.toggle('expanded', expanded);
  heading.setAttribute('aria-expanded', String(expanded));
  updateToggleAllButtonLabel();
}

// The engine has already applied the query, the type filters, the NSFW gate,
// the paging and the grouping, and has handed back one HTML string. All that is
// left here is to place it and fill in the toolbar.
const renderStore = (filterText = '', page = 1, scrollToCategory = null) => {
  const root = document.getElementById('app-store');
  const resultCount = document.getElementById('result-count');
  if (!root || !resultCount) return;
  if (!isStoreEngineReady()) return;

  currentQuery = filterText;

  const result = renderCatalogue({
    query: filterText.trim().toLowerCase(),
    page,
    pageSize,
    flags: currentFilterFlags(),
    nsfw: isNSFWAllowed(),
    install: has_navigator_install,
  });

  currentPage = result.page;
  root.innerHTML = result.html;
  resultCount.textContent = `${result.total} APP${result.total !== 1 ? 's' : ''}`;

  renderPagination('pagination-row', result, true);
  renderPagination('pagination-row-bottom', result, false);

  updateToggleAllButtonLabel();

  if (typeof window.updateScrollButtons === 'function') {
    setTimeout(window.updateScrollButtons, 50);
  }
  if (scrollToCategory) {
    setTimeout(() => {
      const heading = Array.from(document.querySelectorAll('.category-heading'))
        .find((candidate) => candidate.textContent.includes(scrollToCategory));
      if (heading) heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }
};

// 🔧 Setup search input listener with debounce
let searchDebounceTimer = null;

const setupSearch = () => {
  const input = document.getElementById('search-input');
  if (!input) return;

  input.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();

    // Clear previous timer
    if (searchDebounceTimer) {
      clearTimeout(searchDebounceTimer);
    }

    // Wait 500ms after user stops typing before rendering
    searchDebounceTimer = setTimeout(() => {
      renderStore(query);
    }, 500);
  });
};

// Listen for localStorage changes (e.g., hiddenfeatures toggle)
// Note: 'storage' event only fires for changes from other tabs
window.addEventListener('storage', (e) => {
  if (e.key === 'hiddenfeatures') {
    const searchText = searchInput?.value?.toLowerCase() || '';
    renderStore(searchText);
  }
});

// Also listen for same-tab changes via custom event
window.addEventListener('localstorage-change', (e) => {
  if (e.detail?.key === 'hiddenfeatures') {
    const searchText = searchInput?.value?.toLowerCase() || '';
    renderStore(searchText);
  }
});

// Poll for hiddenfeatures changes (for same-tab changes that don't trigger events)
let lastHiddenFeaturesState = isNSFWAllowed();
setInterval(() => {
  const currentState = isNSFWAllowed();
  if (currentState !== lastHiddenFeaturesState) {
    lastHiddenFeaturesState = currentState;
    const searchText = searchInput?.value?.toLowerCase() || '';
    renderStore(searchText);
  }
}, 500);

// Global function to call when hiddenfeatures is toggled (for same-tab changes)
window.onHiddenFeaturesChange = () => {
  lastHiddenFeaturesState = isNSFWAllowed();
  const searchText = searchInput?.value?.toLowerCase() || '';
  renderStore(searchText);
};

const filterPWA = document.getElementById('filter-pwa');
const filterWeChat = document.getElementById('filter-wechat');
const filterNative = document.getElementById('filter-native');
const searchInput = document.getElementById('search-input');

// 🚀 Initialize everything
document.addEventListener('DOMContentLoaded', async () => {
  // 🧠 Restore saved filter states, with default ON for PWA
  const savedPWA = localStorage.getItem('filter-pwa');
  const savedWeChat = localStorage.getItem('filter-wechat');
  const savedNative = localStorage.getItem('filter-native');

  filterPWA.checked = savedPWA === null ? true : savedPWA === 'true';
  filterWeChat.checked = savedWeChat === 'true';
  filterNative.checked = savedNative === 'true';

  // The catalogue and its renderer arrive together; until they do there is
  // nothing to show, and there is no JavaScript reader to fall back on.
  try {
    await initStoreEngine();
    pushLocales(activeLocaleTables());
  } catch (error) {
    console.error(error);
    const root = document.getElementById('app-store');
    if (root) {
      root.innerHTML = `<p class="store-unavailable">${escapeHTML(String(error.message || error))}</p>`;
    }
    return;
  }

  // 🌐 Language selector
  const languageSelector = document.getElementById('language-selector');
  if (languageSelector) {
    // Set initial value from localStorage or resolved locale
    const savedLocale = localStorage.getItem('store-locale') || resolveStoreLocale();
    languageSelector.value = savedLocale;

    languageSelector.addEventListener('change', async (e) => {
      const newLocale = e.target.value;
      localStorage.setItem('store-locale', newLocale);
      setLocale(newLocale);
      // The engine holds its own copy of the table, so hand it the new one.
      pushLocales(activeLocaleTables());

      // Update UI text (buttons, labels, etc.)
      await localizePage(newLocale);

      renderStore(currentQuery, 1);
    });
  }

  // One listener for every card on every page, instead of one per button.
  const storeRoot = document.getElementById('app-store');
  storeRoot?.addEventListener('click', (event) => {
    const installButton = event.target.closest('[data-install]');
    if (installButton) {
      event.preventDefault();
      install_url(installButton.dataset.install);
      return;
    }
    const copyButton = event.target.closest('[data-copy]');
    if (copyButton) {
      event.preventDefault();
      copyToClipboard(copyButton.dataset.copy);
      return;
    }
    const continuation = event.target.closest('.category-continuation[data-page]');
    if (continuation) {
      renderStore(currentQuery, Number(continuation.dataset.page));
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const heading = event.target.closest('.category-heading');
    if (heading) toggleCategoryBlock(heading);
  });

  storeRoot?.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const heading = event.target.closest('.category-heading');
    if (!heading) return;
    event.preventDefault();
    toggleCategoryBlock(heading);
  });

  wirePaginationRow('pagination-row');
  wirePaginationRow('pagination-row-bottom');

  renderStore(); // Initial full render
  setupSearch(); // Enable search
});

// 💾 Save state on change and re-render
filterPWA.addEventListener('change', () => {
  localStorage.setItem('filter-pwa', filterPWA.checked);
  const searchText = searchInput?.value?.toLowerCase() || '';
  renderStore(searchText);
});

filterWeChat.addEventListener('change', () => {
  localStorage.setItem('filter-wechat', filterWeChat.checked);
  const searchText = searchInput?.value?.toLowerCase() || '';
  renderStore(searchText);
});

filterNative.addEventListener('change', () => {
  localStorage.setItem('filter-native', filterNative.checked);
  const searchText = searchInput?.value?.toLowerCase() || '';
  renderStore(searchText);
});

const toggleAllButton = document.getElementById('toggle-all-btn');
updateToggleAllButtonLabel();

toggleAllButton?.addEventListener('click', () => {
  const headings = document.querySelectorAll('.category-heading');
  if (headings.length === 0) return;

  const allExpanded = Array.from(headings).every((heading) =>
    heading.classList.contains('expanded')
  );
  const expand = !allExpanded;

  headings.forEach((heading) => {
    const grid = heading.nextElementSibling;
    if (!(grid instanceof HTMLElement)) return;

    const storageKey = heading.dataset.storageKey || `category-expanded-${heading.textContent}`;

    grid.classList.toggle('expanded', expand);
    grid.classList.toggle('collapsed', !expand);
    heading.classList.toggle('expanded', expand);
    heading.setAttribute('aria-expanded', String(expand));
    localStorage.setItem(storageKey, expand);
  });

  updateToggleAllButtonLabel();
});
