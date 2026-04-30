// Utils.

/**
 * Convert price separater by languages
 * @param price
 * @param lang
 * @returns string
 */
export const formatPrice = (price: number, lang: string) => {
  if (typeof price !== 'number' || isNaN(price)) {
    return '';
  }
  const localeMap: Record<string, string> = {
    en: 'en-US',
    de: 'de-DE',
    fr: 'fr-FR',
    es: 'es-ES',
    it: 'it-IT',
  };
  return price.toLocaleString(localeMap[lang] ?? 'en-US');
};
