export function getPreferredLanguage() {
  // If navigator.languages exists and contains English, prefer English
  if (Array.isArray(navigator.languages)) {
    const hasEnglish = navigator.languages.some(lang => {
      const lower = lang.toLowerCase();
      return lower === 'en-us' || lower === 'en';
    });
    if (hasEnglish) return 'en-us';
  }

  // Otherwise fallback to navigator.language or 'en-us'
  return (navigator.language || 'en-us').toLowerCase();
}
