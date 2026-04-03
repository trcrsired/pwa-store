import { categories } from './categories.js';
import './locale/enus.js';
import './locale/zhcn.js';
import { setLocale, L } from './locale/localization.js';
import { getPreferredLanguage } from './preferedlanguage.js';
import { localizePage } from './lang.js';

// Pagination state
let currentPage = 1;
const defaultPageSize = 50;
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

function add_install_button(container, url, apptype)
{
  if (has_navigator_install)
  {
    const installBtn = document.createElement('button');
    installBtn.className = 'install-button';
    installBtn.textContent = L(apptype=="wrapper"?'install_wrapper_desc':'install_desc');
    installBtn.dataset.url = url;
    installBtn.addEventListener('click', install_callback);
    container.appendChild(installBtn);
  }
}

function isNSFWAllowed() {
  return localStorage.getItem("hiddenfeatures") === "true";
}

// Render an app card
const renderAppCard = (app) => {
  const container = document.createElement('div');
  container.className = 'app-card';

  const localizedName = app.nameKey ? L(app.nameKey) : app.name;
  const localizedDescription = app.descriptionKey ? L(app.descriptionKey) : app.description;
  const apptype = app.apptype;
  const showBadge = apptype && apptype !== "pwa";
  const isWeChatMini = apptype === 'wechatmini';
  const isWeChat = apptype === 'wechat';
  const isNative = apptype === 'native';

  container.innerHTML = `
    <img src="${app.icon}" alt="${localizedName}" class="app-icon" loading="lazy" decoding="async" />
    <div class="app-name">${localizedName}</div>
    <div class="app-description">${localizedDescription}</div>
    ${app.nsfw ? `<span class="nsfw-badge">NSFW</span>` : ''}
    ${showBadge ? `<span class="apptype-badge">${L(apptype) || apptype}</span>` : ''}
  `;

  if (app.urlDisplay) {
    const urlLineDisplay = document.createElement('div');
    urlLineDisplay.className = 'app-url';
    urlLineDisplay.textContent = app.urlDisplay;
    container.appendChild(urlLineDisplay);
  }

  const urlLine = document.createElement('div');
  urlLine.className = 'app-url';
  var appurl = app.url;
  if (isWeChat) {
    appurl = `/store/wechat/${L("lang")}/`;
  }
  urlLine.textContent = appurl;
  container.appendChild(urlLine);

  const actions = document.createElement('div');
  actions.className = 'card-actions';

  const button = document.createElement(isWeChatMini ? 'button' : 'a');
  button.className = 'install-button';
  if (isWeChatMini) {
    button.textContent = L('copyurl_desc');
    button.addEventListener('click', () => copyToClipboard(app.url));
  } else {
    button.textContent = L(apptype == "wrapper" ? 'open_wrapper_desc' : 'open_desc');
    button.href = appurl;
  }
  actions.appendChild(button);

  if (!isWeChatMini && !isNative && !isWeChat) {
    add_install_button(actions, app.url, apptype);
  }

  const apptype2 = app.apptype2;
  if (apptype2) {
    var appurl2 = app.url2;
    const isWeChat2 = apptype2 === "wechat";
    if (isWeChat2) {
      appurl2 = `/store/wechat/${L("lang")}/`;
    }

    const badge2 = document.createElement('span');
    badge2.className = 'apptype-badge';
    badge2.textContent = L(apptype2) || apptype2;
    container.appendChild(badge2);

    const urlDisplay1 = app.urlDisplay || appurl;
    const urlDisplay2 = app.urlDisplay2 || appurl2;

    if (urlDisplay2 && urlDisplay2 !== urlDisplay1) {
      const urlLineDisplay2 = document.createElement('div');
      urlLineDisplay2.className = 'app-url';
      urlLineDisplay2.textContent = urlDisplay2;
      container.appendChild(urlLineDisplay2);
    }

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
      button2.textContent = L(apptype2 == "wrapper" ? 'open_wrapper_desc' : 'open_desc');
      button2.href = appurl2;
    }
    actions.appendChild(button2);

    const isNative2 = apptype2 === 'native';
    if (!isWeChatMini2 && !isNative2 && !isWeChat2) {
      add_install_button(actions, appurl2, apptype2);
    }
  }

  container.appendChild(actions);
  return container;
};

// Render pagination controls with page input
const renderPagination = (containerId, totalPages, currentPage, currentPageApps, totalApps, onPageChange, onPageSizeChange, pageCategories = [], forceShow = false) => {
  const paginationRow = document.getElementById(containerId);
  if (!paginationRow) return;

  paginationRow.innerHTML = '';

  // Only hide if no apps at all
  if (totalApps === 0) {
    paginationRow.style.display = 'none';
    return;
  }

  paginationRow.style.display = 'flex';

  // Categories on this page (only for top pagination)
  if (containerId === 'pagination-row' && pageCategories.length > 0) {
    const categoriesInfo = document.createElement('div');
    categoriesInfo.className = 'page-categories';
    categoriesInfo.innerHTML = `<span class="page-categories-label">${L('categories_label')}:</span> `;
    pageCategories.forEach((cat) => {
      const badge = document.createElement('span');
      badge.className = 'category-badge clickable';
      badge.textContent = cat.name;
      badge.addEventListener('click', () => {
        const categoryHeading = document.querySelector(`.category-heading:has(.category-title)`);
        const allHeadings = document.querySelectorAll('.category-heading');
        for (const heading of allHeadings) {
          if (heading.textContent.includes(cat.name)) {
            heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
            break;
          }
        }
      });
      categoriesInfo.appendChild(badge);
    });
    paginationRow.appendChild(categoriesInfo);
  }

  // Apps count on this page
  const appsInfo = document.createElement('div');
  appsInfo.className = 'pagination-info';
  appsInfo.textContent = `${currentPageApps} ${L('apps_on_page')}`;
  paginationRow.appendChild(appsInfo);

  // Page size selector
  const sizeInfo = document.createElement('div');
  sizeInfo.className = 'pagination-info';
  sizeInfo.innerHTML = `
    <span>${L('show_label')}: </span>
    <input type="number" class="pagesize-input" min="1" value="${pageSize}" />
    <span> ${L('per_page')}</span>
  `;
  paginationRow.appendChild(sizeInfo);

  const sizeInput = sizeInfo.querySelector('.pagesize-input');
  sizeInput.addEventListener('change', (e) => {
    let newSize = parseInt(e.target.value, 10);
    if (newSize < 1) newSize = defaultPageSize;
    e.target.value = newSize;
    pageSize = newSize;
    localStorage.setItem('page-size', newSize);
    onPageSizeChange();
  });

  // Page navigation (only show if more than one page)
  if (totalPages > 1) {
    const pageInfo = document.createElement('div');
    pageInfo.className = 'pagination-info';
    pageInfo.innerHTML = `
      <span>${L('page_label')} </span>
      <input type="number" class="pagination-input" min="1" max="${totalPages}" value="${currentPage}" />
      <span> ${L('of_label')} ${totalPages} (${totalApps} ${L('total_label')})</span>
    `;
    paginationRow.appendChild(pageInfo);

    const pageInput = pageInfo.querySelector('.pagination-input');
    pageInput.addEventListener('change', (e) => {
      let newPage = parseInt(e.target.value, 10);
      if (newPage < 1) newPage = 1;
      if (newPage > totalPages) newPage = totalPages;
      e.target.value = newPage;
      onPageChange(newPage);
    });

    // Previous button
    const prevBtn = document.createElement('button');
    prevBtn.className = 'pagination-btn';
    prevBtn.textContent = '←';
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener('click', () => onPageChange(currentPage - 1));
    paginationRow.appendChild(prevBtn);

    // Next button
    const nextBtn = document.createElement('button');
    nextBtn.className = 'pagination-btn';
    nextBtn.textContent = '→';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener('click', () => onPageChange(currentPage + 1));
    paginationRow.appendChild(nextBtn);
  } else {
    // Just show total count if single page
    const totalInfo = document.createElement('div');
    totalInfo.className = 'pagination-info';
    totalInfo.textContent = `(${totalApps} ${L('total_label')})`;
    paginationRow.appendChild(totalInfo);
  }
};

// Render a category block with its apps
const renderCategory = (category, isExpanded = true) => {
  const section = document.createElement('section');
  section.className = 'category-block';

  const heading = document.createElement('h2');
  const localizedCategoryName = category.nameKey ? L(category.nameKey) : category.name;
  heading.innerHTML = `
    <span class="category-title">
      ${localizedCategoryName}
      ${category.nsfw ? '<span class="nsfw-badge">NSFW</span>' : ''}
    </span>
  `;
  heading.className = 'category-heading';
  heading.classList.add(isExpanded ? 'expanded' : '');
  heading.setAttribute('role', 'button');
  heading.tabIndex = 0;
  heading.setAttribute('aria-expanded', String(isExpanded));

  const grid = document.createElement('div');
  grid.className = 'app-grid';
  grid.classList.add(isExpanded ? 'expanded' : 'collapsed');

  category.apps.forEach((app) => {
    if (!app.hide) {
      grid.appendChild(renderAppCard(app));
    }
  });

  const toggleCategory = () => {
    const currentlyExpanded = grid.classList.contains('expanded');
    grid.classList.toggle('expanded', !currentlyExpanded);
    grid.classList.toggle('collapsed', currentlyExpanded);
    heading.classList.toggle('expanded', !currentlyExpanded);
    heading.setAttribute('aria-expanded', String(!currentlyExpanded));
  };

  heading.addEventListener('click', toggleCategory);
  heading.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleCategory();
    }
  });

  section.appendChild(heading);
  section.appendChild(grid);
  return section;
};

// Get filtered categories with their apps
const getFilteredCategories = (filterText = '') => {
  const nsfwUnlocked = isNSFWAllowed();
  const showPWA = document.getElementById('filter-pwa')?.checked;
  const showWeChat = document.getElementById('filter-wechat')?.checked;
  const showNative = document.getElementById('filter-native')?.checked;

  const filteredCategories = [];

  categories.forEach((category) => {
    if (category.nsfw && !nsfwUnlocked) return;

    const categoryText = category.__searchText || `${(category.nameKey ? L(category.nameKey) : category.name)} ${category.name}`.toLowerCase();

    const filteredApps = category.apps.filter(app => {
      if (app.nsfw && !nsfwUnlocked) return false;
      if (app.hide) return false;

      const combined = app.__searchText || '';
      const matchesSearch = filterText === '' || categoryText.includes(filterText) || combined.includes(filterText);

      const type1 = app.apptype || 'pwa';
      const type2 = app.apptype2 || null;

      const isWeChatMini1 = type1 === 'wechatmini' || type1 === 'wechat';
      const isNative1 = type1 === 'native';
      const isPWA1 = !isWeChatMini1 && !isNative1;

      const isWeChatMini2 = type2 === 'wechatmini' || type2 === 'wechat';
      const isNative2 = type2 === 'native';
      const isPWA2 = type2 && !isWeChatMini2 && !isNative2;

      const matchesType =
        (isPWA1 && showPWA) || (isWeChatMini1 && showWeChat) || (isNative1 && showNative) ||
        (isPWA2 && showPWA) || (isWeChatMini2 && showWeChat) || (isNative2 && showNative);

      return matchesSearch && matchesType;
    });

    if (filteredApps.length > 0) {
      filteredCategories.push({
        ...category,
        apps: filteredApps
      });
    }
  });

  return filteredCategories;
};

// Get flat list of all apps with category info
const getFlatAppsList = (filteredCategories) => {
  const allApps = [];
  filteredCategories.forEach(category => {
    const categoryName = category.nameKey ? L(category.nameKey) : category.name;
    category.apps.forEach(app => {
      allApps.push({
        app,
        categoryName,
        categoryNsfw: category.nsfw
      });
    });
  });
  return allApps;
};

// Get apps for a specific page (strict pageSize)
const getAppsForPage = (flatAppsList, page) => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return flatAppsList.slice(startIndex, endIndex);
};

// Group apps by category for display
const groupAppsByCategory = (pageApps) => {
  const grouped = {};
  pageApps.forEach(({ app, categoryName, categoryNsfw }) => {
    if (!grouped[categoryName]) {
      grouped[categoryName] = {
        name: categoryName,
        nsfw: categoryNsfw,
        apps: []
      };
    }
    grouped[categoryName].apps.push(app);
  });
  return Object.values(grouped);
};

// 🔄 Render the app store with pagination
const renderStore = (filterText = '', page = 1) => {
  prepareSearchIndex();
  const root = document.getElementById('app-store');
  const resultCount = document.getElementById('result-count');
  if (!root || !resultCount) return;

  const isSearching = filterText.trim() !== '';
  currentPage = page;
  root.innerHTML = '';

  const filteredCategories = getFilteredCategories(filterText);
  const flatAppsList = getFlatAppsList(filteredCategories);
  const totalApps = flatAppsList.length;
  const totalPages = Math.ceil(totalApps / pageSize);

  resultCount.textContent = `${totalApps} APP${totalApps !== 1 ? 's' : ''}`;

  // When searching, show all results (no pagination) with category grouping
  if (isSearching) {
    // Group all filtered categories for display
    const allPageCategories = filteredCategories.map(cat => ({
      name: cat.nameKey ? L(cat.nameKey) : cat.name,
      nsfw: cat.nsfw,
      apps: cat.apps
    }));

    // Top pagination with categories and page size
    renderPagination('pagination-row', 1, 1, totalApps, totalApps, () => {}, () => renderStore(filterText, 1), allPageCategories);

    filteredCategories.forEach((category) => {
      root.appendChild(renderCategory(category, true));
    });

    // Bottom pagination
    renderPagination('pagination-row-bottom', 1, 1, totalApps, totalApps, () => {}, () => renderStore(filterText, 1), []);

    updateToggleAllButtonLabel();

    // Update scroll buttons after render
    if (typeof window.updateScrollButtons === 'function') {
      setTimeout(window.updateScrollButtons, 50);
    }
    return;
  }

  // Paginated view - get apps for current page
  const pageApps = getAppsForPage(flatAppsList, currentPage);
  const pageAppsCount = pageApps.length;
  const pageCategories = groupAppsByCategory(pageApps);

  // Top pagination
  renderPagination('pagination-row', totalPages, currentPage, pageAppsCount, totalApps,
    (newPage) => {
      renderStore(filterText, newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    () => renderStore(filterText, 1), // Reset to page 1 when page size changes
    pageCategories
  );

  // Render each category group
  pageCategories.forEach((catGroup) => {
    root.appendChild(renderCategory(catGroup, true));
  });

  // Bottom pagination
  renderPagination('pagination-row-bottom', totalPages, currentPage, pageAppsCount, totalApps,
    (newPage) => {
      renderStore(filterText, newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    () => renderStore(filterText, 1),
    [] // Don't show categories on bottom pagination
  );

  updateToggleAllButtonLabel();

  // Update scroll buttons after render
  if (typeof window.updateScrollButtons === 'function') {
    setTimeout(window.updateScrollButtons, 50);
  }
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
document.addEventListener('DOMContentLoaded', () => {
  // 🧠 Restore saved filter states, with default ON for PWA
  const savedPWA = localStorage.getItem('filter-pwa');
  const savedWeChat = localStorage.getItem('filter-wechat');
  const savedNative = localStorage.getItem('filter-native');

  filterPWA.checked = savedPWA === null ? true : savedPWA === 'true';
  filterWeChat.checked = savedWeChat === 'true';
  filterNative.checked = savedNative === 'true';

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
      searchIndexPrepared = false; // Force rebuild search index with new locale

      // Update UI text (buttons, labels, etc.)
      await localizePage(newLocale);

      renderStore();
    });
  }

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
