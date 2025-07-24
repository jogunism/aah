// Utils.

/**
 * Convert price separater by languages
 * @param price
 * @param lang
 * @returns string
 */
export const formatPrice = (price: number, lang: string) => {
  const locale = lang === 'de' ? 'de-DE' : 'en-US';
  return price.toLocaleString(locale);
};
