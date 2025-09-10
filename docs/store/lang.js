async function localizePage() {
  let browserLang = (navigator.language || 'en').toLowerCase();

/*
  browserLang = "zh"; // Force Chinese for testing
*/

  const languageMap = {
    'zh': 'zh',
    'zh-cn': 'zh',
    'zh-hans': 'zh',
    'zh-tw': 'zh'
  };

  const langKey = languageMap[browserLang] || languageMap[browserLang.split('-')[0]];
  if (!langKey) return;

  try {
    const response = await fetch(`lang/${langKey}.json`);
    const strings = await response.json();

    const setText = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.textContent = value;
      else console.warn(`Missing element: #${id}`);
    };

    const setHref = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.href = value;
      else console.warn(`Missing link element: #${id}`);
    };

    const setPlaceholder = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.placeholder = value;
      else console.warn(`Missing input element: #${id}`);
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
    setText('footer-extension', strings.footer_extension_tip);
    setText('footer-store-link', strings.footer_link_store);
    setText('footer-crx-link', strings.footer_link_crx);
    setText('footer-repo-link', strings.footer_link_repo);
    setText('footer-github-link', strings.footer_repo_link);
    setText('footer-license', strings.footer_license);
    setText('footer-contribution', strings.footer_contribution);
  } catch (error) {
    console.warn(`Failed to load language file: lang/${langKey}.json`, error);
  }
}

localizePage();
