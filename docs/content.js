import { categories } from './categories.js';

const renderAppCard = (app) => {
  const container = document.createElement('div');
  container.className = 'app-card';

  container.innerHTML = `
    <img src="${app.icon}" alt="${app.name}" class="app-icon" />
    <div class="app-name">${app.name}</div>
    <div class="app-description">${app.description}</div>
    ${app.wrapper ? `<span class="wrapper-badge">Wrapper</span>` : ''}
    <a href="${app.url}" target="_blank" class="install-button">Open</a>
  `;
  return container;
};

const renderCategory = (category) => {
  const section = document.createElement('section');
  section.className = 'category-block';

  const heading = document.createElement('h2');
  heading.textContent = category.name;
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

  root.innerHTML = ''; // Clear previous content

  categories.forEach((category) => {
    const filteredApps = category.apps.filter(app =>
      app.name.toLowerCase().includes(filterText) ||
      app.description.toLowerCase().includes(filterText)
    );

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