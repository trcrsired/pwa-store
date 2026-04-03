import { getPreferredLanguage } from './preferedlanguage.js';

// Map locale codes to lang file names
const localeToLang = {
  'enus': 'en',
  'zhcn': 'zh',
  'en': 'en',
  'zh': 'zh'
};

export async function localizePage(localeOverride = null) {
  let langKey;

  if (localeOverride) {
    langKey = localeToLang[localeOverride] || 'en';
  } else {
    // Check localStorage first
    const savedLocale = localStorage.getItem('store-locale');
    if (savedLocale) {
      langKey = localeToLang[savedLocale] || 'en';
    } else {
      let browserLang = getPreferredLanguage();
      const languageMap = {
        'zh': 'zh',
        'zh-cn': 'zh',
        'zh-hans': 'zh',
        'zh-tw': 'zh',
        'en': 'en',
        'en-us': 'en'
      };
      langKey = languageMap[browserLang] || languageMap[browserLang.split('-')[0]] || 'en';
    }
  }

  try {
    const response = await fetch(`lang/${langKey}.json`);
    const strings = await response.json();

    const setText = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.textContent = value;
    };

    const setHref = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.href = value;
    };

    const setPlaceholder = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.placeholder = value;
    };

    // Header
    setText('site-title', strings.site_title);
    setText('site-subtitle', strings.site_subtitle);

    // Navigation
    setText('how-link', strings.how_link);
    setHref('how-link', strings.how_href);

    // Search
    setPlaceholder('search-input', strings.search_placeholder);
    setText('label-filter-wechat', strings.filter_wechat);
    setText('label-filter-native', strings.filter_native);
    // Footer
    setText('footer-browser', strings.footer_browser_recommendation);
    setText('footer-warning', strings.footer_warning);
    setText('footer-extension', strings.footer_extension_tip);
    setText('footer-store-link', strings.footer_link_store);
    setText('footer-crx-link', strings.footer_link_crx);
    setText('footer-repo-link', strings.footer_link_repo);
    setText('footer-github-link', strings.footer_repo_link);
    setText('footer-license', strings.footer_license);
    setText('footer-contribution', strings.footer_contribution);

    return true;
  } catch (error) {
    console.warn(`Failed to load language file: lang/${langKey}.json`, error);
    return false;
  }
}

// Initial localization after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const savedLocale = localStorage.getItem('store-locale');
  localizePage(savedLocale);
});