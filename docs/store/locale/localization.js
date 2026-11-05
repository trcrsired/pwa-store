// localization.js
const Locales = {};
const defaultLocale = 'enus';
let activeLocale = defaultLocale;

export function registerLocale(localeName, localeTable) {
  Locales[localeName.toLowerCase()] = localeTable;
}

export function setLocale(localeName) {
  const normalized = localeName.toLowerCase();
  if (Locales[normalized]) {
    activeLocale = normalized;
  } else {
    activeLocale = defaultLocale;
  }
}

export function L(key) {
  const table = Locales[activeLocale];
  const fallbackTable = Locales[defaultLocale];
  return table?.[key] ?? fallbackTable?.[key] ?? key;
}
// The store engine does its own lookups inside wasm, so it needs the whole
// table rather than one string at a time: fallback first, active second, so
// pushing them in order makes the active language win.
export function activeLocaleTables() {
  const tables = [];
  if (Locales[defaultLocale]) tables.push(Locales[defaultLocale]);
  if (activeLocale !== defaultLocale && Locales[activeLocale]) tables.push(Locales[activeLocale]);
  return tables;
}
