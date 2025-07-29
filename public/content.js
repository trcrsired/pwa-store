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

const mountStore = () => {
  const root = document.getElementById('app-store');
  if (!root) return;

  categories.forEach((category) => {
    root.appendChild(renderCategory(category));
  });
};

document.addEventListener('DOMContentLoaded', mountStore);
