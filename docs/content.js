import { categories } from './categories.js';
import './locale/enus.js';
import './locale/zhcn.js';
import { setLocale, L } from './locale/localization.js';

setLocale(navigator.language.toLowerCase().replace('-', ''));

const renderAppCard = (app) => {
  const container = document.createElement('div');
  container.className = 'app-card';

  const localizedName = app.nameKey ? L(app.nameKey) : app.name;
  const localizedDescription = app.descriptionKey ? L(app.descriptionKey) : app.description;

  container.innerHTML = `
    <img src="${app.icon}" alt="${localizedName}" class="app-icon" />
    <div class="app-name">${localizedName}</div>
    <div class="app-description">${localizedDescription}</div>
    ${app.wrapper ? `<span class="wrapper-badge">${L("wrapper")}</span>` : ''}
    <a href="${app.url}" target="_blank" class="install-button">Open</a>
  `;
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

// 🔍 Render store with optional search filter
const renderStore = (filterText = '') => {
  const root = document.getElementById('app-store');
  if (!root) return;

  root.innerHTML = '';

  categories.forEach((category) => {
    const filteredApps = category.apps.filter(app => {
      const nameKeyText = app.nameKey ? L(app.nameKey) : '';
      const nameText = app.name || '';
      const descKeyText = app.descriptionKey ? L(app.descriptionKey) : '';
      const descText = app.description || '';

      const combinedText = `${nameKeyText} ${nameText} ${descKeyText} ${descText}`.toLowerCase();
      return combinedText.includes(filterText);
    });

    if (filteredApps.length > 0) {
      const filteredCategory = { ...category, apps: filteredApps };
      root.appendChild(renderCategory(filteredCategory));
    }
  });
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
  renderStore(); // Initial full render
  setupSearch(); // Enable search
});