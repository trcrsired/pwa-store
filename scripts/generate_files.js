import { categories } from "../docs/store/categories.js"

function generateCpp(cate) {
  let cpp = "";

  cate.forEach(cat => {
    cpp += `// Category: ${cat.name}\n`;
    cpp += `struct AppInfo ${cat.nameKey}_apps[] = {\n`;

    cat.apps.forEach(app => {
      cpp += `  { "${app.name}", "${app.icon}", "${app.url}", "${app.descriptionKey}" },\n`;
    });

    cpp += `};\n\n`;
  });

  return cpp;
}

console.log(generateCpp(categories));