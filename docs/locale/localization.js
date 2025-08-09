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