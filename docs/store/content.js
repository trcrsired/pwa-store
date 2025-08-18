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

const renderAppCard = (app) => {
  const container = document.createElement('div');
  container.className = 'app-card';

  const localizedName = app.nameKey ? L(app.nameKey) : app.name;
  const localizedDescription = app.descriptionKey ? L(app.descriptionKey) : app.description;
  const showBadge = app.apptype && app.apptype !== "pwa";
  const isWeChatMini = app.apptype === 'wechatmini';

  // Build static elements
  container.innerHTML = `
    <img src="${app.icon}" alt="${localizedName}" class="app-icon" />
    <div class="app-name">${localizedName}</div>
    <div class="app-description">${localizedDescription}</div>
    ${showBadge ? `<span class="apptype-badge">${L(app.apptype)}</span>` : ''}
  `;

  // Add install button separately to bind event safely
  const button = document.createElement(isWeChatMini ? 'button' : 'a');
  button.className = 'install-button';

  if (isWeChatMini) {
    button.textContent = L('copyurl_desc');
    button.addEventListener('click', () => copyToClipboard(app.url));
  } else {
    button.textContent = L('open_desc');
    button.href = app.url;
    button.target = '_blank';
  }

  container.appendChild(button);
  return container;
};

const renderCategory = (category) => {
  const section = document.createElement('section');
  section.className = 'category-block';

  const heading = document.createElement('h2');
  const localizedCategoryName = category.nameKey ? L(category.nameKey) : category.name;
  heading.textContent = localizedCategoryName;
  section.appendChild(heading);

  const grid = document.createElement('div');
  grid.className = 'app-grid';

  category.apps.forEach((app) => {
    grid.appendChild(renderAppCard(app));
  });

  section.appendChild(grid);
  return section;
};

// 🔄 Render the app store with search and type filters
const renderStore = (filterText = '') => {
  const root = document.getElementById('app-store');
  const resultCount = document.getElementById('result-count');
  if (!root || !resultCount) return;

  root.innerHTML = '';
  let totalMatches = 0;

  // ✅ Read filter checkbox states
  const showPWA = document.getElementById('filter-pwa')?.checked;
  const showWeChat = document.getElementById('filter-wechat')?.checked;

  categories.forEach((category) => {
    const localizedName = category.nameKey ? L(category.nameKey) : category.name;
    const categoryText = `${localizedName} ${category.name}`.toLowerCase();

    // 🔍 Filter apps by search text
    let filteredApps = categoryText.includes(filterText)
      ? category.apps
      : category.apps.filter(app => {
          const nameKey = app.nameKey ? L(app.nameKey) : '';
          const name = app.name || '';
          const descKey = app.descriptionKey ? L(app.descriptionKey) : '';
          const desc = app.description || '';
          const combined = `${nameKey} ${name} ${descKey} ${desc}`.toLowerCase();
          return combined.includes(filterText);
        });

    // 🧩 Filter apps by type
    filteredApps = filteredApps.filter(app => {
      const type = app.apptype || 'pwa';
      const isPWA = type === 'pwa' || type === 'wrapper';
      const isWeChatMini = type === 'wechatmini';
      return (isPWA && showPWA) || (isWeChatMini && showWeChat);
    });

    // 📦 Render category if it has matching apps
    if (filteredApps.length > 0) {
      totalMatches += filteredApps.length;
      const filteredCategory = { ...category, apps: filteredApps };
      root.appendChild(renderCategory(filteredCategory));
    }
  });

  // 🧮 Update result count
  resultCount.textContent = `${totalMatches} APP${totalMatches !== 1 ? 's' : ''}`;
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

// 🚀 Initialize everything
document.addEventListener('DOMContentLoaded', () => {
  // 🧠 Restore saved filter states, with default ON for PWA
  const savedPWA = localStorage.getItem('filter-pwa');
  const savedWeChat = localStorage.getItem('filter-wechat');

  filterPWA.checked = savedPWA === null ? true : savedPWA === 'true';
  filterWeChat.checked = savedWeChat === 'true';

  renderStore(); // Initial full render
  setupSearch(); // Enable search
});

const filterPWA = document.getElementById('filter-pwa');
const filterWeChat = document.getElementById('filter-wechat');
const searchInput = document.getElementById('search-input');

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
