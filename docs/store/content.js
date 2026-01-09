import { categories } from './categories.js';
import './locale/enus.js';
import './locale/zhcn.js';
import { setLocale, L } from './locale/localization.js';

function resolveStoreLocale() {
  const raw = (navigator.language || 'en').toLowerCase();
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

let searchIndexPrepared = false;
function prepareSearchIndex() {
  if (searchIndexPrepared) return;

  for (const category of categories) {
    const localizedCategoryName = category.nameKey ? L(category.nameKey) : category.name;
    category.__searchText = `${localizedCategoryName} ${category.name}`.toLowerCase();

    for (const app of category.apps) {
      const nameKey = app.nameKey ? L(app.nameKey) : '';
      const name = app.name || '';
      const descKey = app.descriptionKey ? L(app.descriptionKey) : '';
      const desc = app.description || '';
      const url1 = app.url || '';
      const url2 = app.url2 || '';
      const urlDisplay1 = app.urlDisplay || '';
      const urlDisplay2 = app.urlDisplay2 || '';
      app.__searchText = `${nameKey} ${name} ${descKey} ${desc} ${url1} ${url2} ${urlDisplay1} ${urlDisplay2}`.toLowerCase();
    }
  }

  searchIndexPrepared = true;
}

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

async function install_callback(e)
{
  let sanitizedUrl="";
  try {
    const targetUrl = e.currentTarget.dataset.url;
    sanitizedUrl = sanitize_install_url(targetUrl);
    await navigator.install(sanitizedUrl);
  } catch (err) {
    alert( `${L('installfailed_desc')}${err}\n${sanitizedUrl}\n${L('tryinstallmanually_desc')}`);
  }
}

function add_install_button(container, url)
{
  if (has_navigator_install)
  {
    const installBtn = document.createElement('button');
    installBtn.className = 'install-button';
    installBtn.textContent = L('install_desc');
    installBtn.dataset.url = url;
    installBtn.addEventListener('click', install_callback);
    container.appendChild(installBtn);
  }
}

const renderAppCard = (app) => {
  const container = document.createElement('div');
  container.className = 'app-card';

  const localizedName = app.nameKey ? L(app.nameKey) : app.name;
  const localizedDescription = app.descriptionKey ? L(app.descriptionKey) : app.description;
  const showBadge = app.apptype && app.apptype !== "pwa";
  const isWeChatMini = app.apptype === 'wechatmini';

  // Build static elements
  container.innerHTML = `
    <img src="${app.icon}" alt="${localizedName}" class="app-icon" loading="lazy" decoding="async" />
    <div class="app-name">${localizedName}</div>
    <div class="app-description">${localizedDescription}</div>
    <div class="app-meta">
      ${showBadge ? `<span class="apptype-badge">${L(app.apptype) || app.apptype}</span>` : ''}
    </div>
  `;

  const meta = container.querySelector('.app-meta');
  const actions = document.createElement('div');
  actions.className = 'card-actions';
  container.appendChild(actions);

  // Primary URL (not displayed)
  let appurl = app.url;
  const isWeChat = app.apptype === 'wechat';
  if (isWeChat) {
    appurl = `/store/wechat/${L("lang")}/`;
  }

  // Primary button
  const button = document.createElement(isWeChatMini ? 'button' : 'a');
  button.className = 'install-button';
  if (isWeChatMini) {
    button.textContent = L('copyurl_desc');
    button.addEventListener('click', () => copyToClipboard(app.url));
  } else {
    button.textContent = L('open_desc');
    button.href = appurl;
  }
  const isNative = app.apptype === 'native';
  if (!isWeChatMini && !isNative && !isWeChat)
  {
    add_install_button(actions, app.url);
  }
  actions.appendChild(button);

  const apptype2 = app.apptype2;
  // Secondary URL logic
  if (apptype2) {
    let appurl2 = app.url2;
    const isWeChat2 = apptype2 === "wechat";
    if (isWeChat2)
    {
      appurl2 = `/store/wechat/${L("lang")}/`;
    }
    // Always show secondary button
    // Show apptype2 badge only if different from primary apptype
    if (apptype2) {
      const badge2 = document.createElement('span');
      badge2.className = 'apptype-badge';
      badge2.textContent = L(apptype2) || apptype2;
      meta?.appendChild(badge2);
    }

    const isWeChatMini2 = apptype2 === 'wechatmini';

    const button2 = document.createElement(isWeChatMini2 ? 'button' : 'a');
    button2.className = 'install-button';
    if (isWeChatMini2) {
      button2.textContent = `${L('copyurl_desc')} (${L(apptype2) || apptype2})`;
      button2.addEventListener('click', () => copyToClipboard(appurl2));
    } else {
      button2.textContent = `${L('open_desc')} (${L(apptype2) || apptype2})`;
      button2.href = appurl2;
    }

    const isNative2 = apptype2 === 'native';
    if (!isWeChatMini2 && !isNative2 && !isWeChat2)
    {
      add_install_button(actions, appurl2);
    }
    actions.appendChild(button2);
  }

  return container;
};

const renderCategory = (category, forceExpand = false) => {
  const section = document.createElement('section');
  section.className = 'category-block';

  // Create category heading
  const heading = document.createElement('h2');
  const localizedCategoryName = category.nameKey ? L(category.nameKey) : category.name;
  heading.textContent = localizedCategoryName;
  heading.className = 'category-heading';

  // Create container for app cards
  const grid = document.createElement('div');
  grid.className = 'app-grid';

  // Use category name as localStorage key
  const storageKeyBase = category.nameKey || category.name;
  const storageKey = `category-expanded-${storageKeyBase}`;
  heading.dataset.storageKey = storageKey;
  const storedState = localStorage.getItem(storageKey) === 'true';
  const isExpanded = forceExpand || storedState;

  // Set initial visibility based on saved state or forced expansion
  grid.classList.add(isExpanded ? 'expanded' : 'collapsed');
  heading.classList.toggle('expanded', isExpanded);
  heading.setAttribute('role', 'button');
  heading.tabIndex = 0;
  heading.setAttribute('aria-expanded', String(isExpanded));

  // Toggle visibility and save state on click
  const toggleCategory = () => {
    const currentlyExpanded = grid.classList.contains('expanded');
    const newState = !currentlyExpanded;

    grid.classList.toggle('expanded', newState);
    grid.classList.toggle('collapsed', !newState);
    heading.classList.toggle('expanded', newState);
    heading.setAttribute('aria-expanded', String(newState));
    localStorage.setItem(storageKey, newState);
    updateToggleAllButtonLabel();
  };
  heading.addEventListener('click', toggleCategory);
  heading.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleCategory();
    }
  });

  // Render each app card inside the grid
  category.apps.forEach((app) => {
    if (!app.hide)
    {
      grid.appendChild(renderAppCard(app));
    }
  });

  // Append heading and grid to section
  section.appendChild(heading);
  section.appendChild(grid);
  return section;
};


// 🔄 Render the app store with search, type filters, and hide flag
const renderStore = (filterText = '') => {
  prepareSearchIndex();
  const root = document.getElementById('app-store');
  const resultCount = document.getElementById('result-count');
  if (!root || !resultCount) return;

  const isSearching = filterText.trim() !== ''; // ✅ Normalize whitespace
  root.innerHTML = '';
  let totalMatches = 0;

  const showPWA = document.getElementById('filter-pwa')?.checked;
  const showWeChat = document.getElementById('filter-wechat')?.checked;
  const showNative = document.getElementById('filter-native')?.checked;

  categories.forEach((category) => {
    const categoryText = category.__searchText || `${(category.nameKey ? L(category.nameKey) : category.name)} ${category.name}`.toLowerCase();

    const filteredApps = category.apps.filter(app => {
      // 🚫 Skip hidden apps immediately
      if (app.hide) return false;

      // 🔍 Search condition
      const combined = app.__searchText || '';

      const matchesSearch = categoryText.includes(filterText) || combined.includes(filterText);

      // 🔎 Type condition
      const type1 = app.apptype || 'pwa';
      const type2 = app.apptype2 || null;


      const isWeChatMini1 = type1 === 'wechatmini' || type1 === 'wechat';
      const isNative1 = type1 === 'native';
      const isPWA1 = !isWeChatMini1 && !isNative1 ;

      const isWeChatMini2 = type2 === 'wechatmini' || type2 === 'wechat';
      const isNative2 = type2 === 'native';
      const isPWA2 = type2 && !isWeChatMini2 &&  !isNative2;

      const matchesType =
        (isPWA1 && showPWA) || (isWeChatMini1 && showWeChat) || (isNative1 && showNative) ||
        (isPWA2 && showPWA) || (isWeChatMini2 && showWeChat) || (isNative2 && showNative);

      // ✅ Combine all conditions
      return matchesSearch && matchesType;
    });

    if (filteredApps.length > 0) {
      totalMatches += filteredApps.length;
      const filteredCategory = { ...category, apps: filteredApps };
      root.appendChild(renderCategory(filteredCategory, isSearching));
    }
  });

  resultCount.textContent = `${totalMatches} APP${totalMatches !== 1 ? 's' : ''}`;
  updateToggleAllButtonLabel();
};


// 🔧 Setup search input listener
const setupSearch = () => {
  const input = document.getElementById('search-input');
  if (!input) return;

  input.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    renderStore(query);
  });
};

const filterPWA = document.getElementById('filter-pwa');
const filterWeChat = document.getElementById('filter-wechat');
const filterNative = document.getElementById('filter-native');
const searchInput = document.getElementById('search-input');

// 🚀 Initialize everything
document.addEventListener('DOMContentLoaded', () => {
  // 🧠 Restore saved filter states, with default ON for PWA
  const savedPWA = localStorage.getItem('filter-pwa');
  const savedWeChat = localStorage.getItem('filter-wechat');
  const savedNative = localStorage.getItem('filter-native');

  filterPWA.checked = savedPWA === null ? true : savedPWA === 'true';
  filterWeChat.checked = savedWeChat === 'true';
  filterNative.checked = savedNative === 'true';

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
