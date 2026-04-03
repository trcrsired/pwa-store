export function getPreferredLanguage() {
  // Otherwise fallback to navigator.language or 'en-us'
  return (navigator.language || 'en-us').toLowerCase();
}
