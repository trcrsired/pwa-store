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
  });

  // Render each app card inside the grid
  category.apps.forEach((app) => {
    grid.appendChild(renderAppCard(app));
  });

  // Append heading and grid to section
  section.appendChild(heading);
  section.appendChild(grid);
  return section;
};


// 🔄 Render the app store with search and type filters
const renderStore = (filterText = '') => {
  const root = document.getElementById('app-store');
  const resultCount = document.getElementById('result-count');
  if (!root || !resultCount) return;

  const isSearching = filterText.trim() !== ''; // ✅ Normalize whitespace too
  root.innerHTML = '';
  let totalMatches = 0;

  const showPWA = document.getElementById('filter-pwa')?.checked;
  const showWeChat = document.getElementById('filter-wechat')?.checked;

  categories.forEach((category) => {
    const localizedName = category.nameKey ? L(category.nameKey) : category.name;
    const categoryText = `${localizedName} ${category.name}`.toLowerCase();

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

    filteredApps = filteredApps.filter(app => {
      const type = app.apptype || 'pwa';
      const isPWA = type === 'pwa' || type === 'wrapper';
      const isWeChatMini = type === 'wechatmini';
      return (isPWA && showPWA) || (isWeChatMini && showWeChat);
    });

    if (filteredApps.length > 0) {
      totalMatches += filteredApps.length;
      const filteredCategory = { ...category, apps: filteredApps };
      root.appendChild(renderCategory(filteredCategory, isSearching)); // ✅ Use flag
    }
  });

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

const toggleAllButton = document.getElementById('toggle-all-btn');
const allHeadings = document.querySelectorAll('.category-heading');

let allExpanded = true;

allHeadings.forEach((heading) => {
  const categoryName = heading.textContent;
  const storageKey = `category-expanded-${categoryName}`;
  const isExpanded = localStorage.getItem(storageKey) === 'true';

  if (!isExpanded) {
    allExpanded = false;
  }

  const grid = heading.nextElementSibling;
  grid.classList.toggle('expanded', isExpanded);
  grid.classList.toggle('collapsed', !isExpanded);
  heading.classList.toggle('expanded', isExpanded);
});

toggleAllButton.textContent = allExpanded ? L('Collapse All') : L('Expand All');

toggleAllButton.addEventListener('click', () => {
  const allHeadings = document.querySelectorAll('.category-heading');

  const allExpanded = Array.from(allHeadings).every((heading) => {
    const categoryName = heading.textContent;
    const storageKey = `category-expanded-${categoryName}`;
    return localStorage.getItem(storageKey) === 'true';
  });

  const expand = !allExpanded;

  allHeadings.forEach((heading) => {
    const grid = heading.nextElementSibling;
    const categoryName = heading.textContent;
    const storageKey = `category-expanded-${categoryName}`;

    grid.classList.toggle('expanded', expand);
    grid.classList.toggle('collapsed', !expand);
    heading.classList.toggle('expanded', expand);
    localStorage.setItem(storageKey, expand);
  });

  toggleAllButton.textContent = expand ? L('Collapse All') : L('Expand All');
});
