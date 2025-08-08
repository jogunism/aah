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
  const locale = lang === 'de' ? 'de-DE' : 'en-US';
  return price.toLocaleString(locale);
};
