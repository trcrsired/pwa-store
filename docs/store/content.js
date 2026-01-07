import { categories } from './categories.js';
import './locale/enus.js';
import './locale/zhcn.js';
import { setLocale, L } from './locale/localization.js';

setLocale(navigator.language.toLowerCase().replace('-', ''));

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
  // If no URL is provided, return an empty string
  if (!url) return "";

  // If the URL starts with "/" or ".", it means it's a relative path
  if (url.startsWith("/") || url.startsWith(".")) {
    if (url === ".") {
      return window.location.href;
    }
    // Use window.location.origin as the base and construct a full absolute URL
    // new URL(relative, base) automatically resolves "./" and "../" paths
    let newurl = window.location.origin+url;
    if (!newurl.endsWith("/"))
    {
      newurl = newurl + "/";
    }
    return newurl;
  }

  // Otherwise, assume it's already an absolute URL and return it directly
  return url;
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
    ${showBadge ? `<span class="apptype-badge">${L(app.apptype) || app.apptype}</span>` : ''}
  `;

  // Primary URL line
  // Show urlDisplay if it exists
  if (app.urlDisplay) {
    const urlLineDisplay = document.createElement('div');
    urlLineDisplay.className = 'app-url';
    urlLineDisplay.textContent = app.urlDisplay;
    container.appendChild(urlLineDisplay);
  }

  // Always show raw url
  const urlLine = document.createElement('div');
  urlLine.className = 'app-url';
  var appurl = app.url;
  const isWeChat = app.apptype === 'wechat';
  if (isWeChat)
  {
    appurl = `/store/wechat/${L("lang")}/`;
  }
  urlLine.textContent = appurl;
  container.appendChild(urlLine);

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
  container.appendChild(button);
  const isNative = app.apptype === 'native';
  if (!isWeChatMini && !isNative && !isWeChat)
  {
    add_install_button(container, app.url);
  }

  const apptype2 = app.apptype2;
  // Secondary URL logic
  if (apptype2) {
    var appurl2 = app.url2;
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
      container.appendChild(badge2);
    }

    const urlDisplay1 = app.urlDisplay || appurl;
    const urlDisplay2 = app.urlDisplay2 || appurl2;

    // Show urlDisplay2 if it exists and is different from primary
    if (urlDisplay2 && urlDisplay2 !== urlDisplay1) {
      const urlLineDisplay2 = document.createElement('div');
      urlLineDisplay2.className = 'app-url';
      urlLineDisplay2.textContent = urlDisplay2;
      container.appendChild(urlLineDisplay2);
    }

    // Always show raw url2
    if (appurl2 && urlDisplay2 != appurl2) {
      const urlLineRaw2 = document.createElement('div');
      urlLineRaw2.className = 'app-url';
      urlLineRaw2.textContent = appurl2;
      container.appendChild(urlLineRaw2);
    }

    const isWeChatMini2 = apptype2 === 'wechatmini';

    const button2 = document.createElement(isWeChatMini2 ? 'button' : 'a');
    button2.className = 'install-button';
    if (isWeChatMini2) {
      button2.textContent = L('copyurl_desc');
      button2.addEventListener('click', () => copyToClipboard(appurl2));
    } else {
      button2.textContent = L('open_desc');
      button2.href = appurl2;
    }
    container.appendChild(button2);

    const isNative2 = apptype2 === 'native';
    if (!isWeChatMini2 && !isNative2 && !isWeChat2)
    {
      add_install_button(container, appurl2);
    }
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
  heading.style.cursor = 'pointer';

  // Create container for app cards
  const grid = document.createElement('div');
  grid.className = 'app-grid';

  // Use category name as localStorage key
  const storageKey = `category-expanded-${localizedCategoryName}`;
  const storedState = localStorage.getItem(storageKey) === 'true';
  const isExpanded = forceExpand || storedState;

  // Set initial visibility based on saved state or forced expansion
  grid.classList.add(isExpanded ? 'expanded' : 'collapsed');
  heading.classList.toggle('expanded', isExpanded);

  // Toggle visibility and save state on click
  heading.addEventListener('click', () => {
    const currentlyExpanded = grid.classList.contains('expanded');
    const newState = !currentlyExpanded;

    grid.classList.toggle('expanded', newState);
    grid.classList.toggle('collapsed', !newState);
    heading.classList.toggle('expanded', newState);
    localStorage.setItem(storageKey, newState);
    updateToggleAllButtonLabel();
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
    const localizedName = category.nameKey ? L(category.nameKey) : category.name;
    const categoryText = `${localizedName} ${category.name}`.toLowerCase();

    const filteredApps = category.apps.filter(app => {
      // 🚫 Skip hidden apps immediately
      if (app.hide) return false;

      // 🔍 Search condition
      const nameKey = app.nameKey ? L(app.nameKey) : '';
      const name = app.name || '';
      const descKey = app.descriptionKey ? L(app.descriptionKey) : '';
      const desc = app.description || '';
      const url1 = app.url || '';
      const url2 = app.url2 || '';
      const urlDisplay1 = app.urlDisplay || '';
      const urlDisplay2 = app.urlDisplay2 || '';
      const combined = `${nameKey} ${name} ${descKey} ${desc} ${url1} ${url2} ${urlDisplay1} ${urlDisplay2}`.toLowerCase();

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

    const categoryName = heading.textContent;
    const storageKey = `category-expanded-${categoryName}`;

    grid.classList.toggle('expanded', expand);
    grid.classList.toggle('collapsed', !expand);
    heading.classList.toggle('expanded', expand);
    localStorage.setItem(storageKey, expand);
  });

  updateToggleAllButtonLabel();
});
