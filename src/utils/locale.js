export const supportedLocales = ['en-US', 'zh-CN'];
export const isSupportedLocale = value => supportedLocales.includes(value);

export function initialLocale(browserLanguage, getStorage) {
  try {
    const saved = getStorage().getItem('locale');
    if (isSupportedLocale(saved)) return saved;
  } catch { /* Privacy settings can reject even reading localStorage. */ }
  return /^zh(?:-|$)/i.test(browserLanguage || '') ? 'zh-CN' : 'en-US';
}

export function persistLocale(locale, getStorage) {
  if (!isSupportedLocale(locale)) return;
  try { getStorage().setItem('locale', locale); } catch { /* Keep the in-memory selection usable. */ }
}
