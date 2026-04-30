// Central locale config — single source of truth for SEO/i18n.
// To add a new locale: drop translation.json into public/locales/<code>/,
// import + register it in i18n.server.ts and i18n.client.ts, and add an
// entry below. Sitemap, hreflang, OG locale, language switcher, and route
// regex all derive from SUPPORTED_LOCALES.

export const SUPPORTED_LOCALES = ['en', 'de', 'fr', 'es', 'it'] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export const LOCALE_META: Record<
  Locale,
  { label: string; ogLocale: string; currency: 'USD' | 'EUR' }
> = {
  en: { label: '🇺🇸 EN', ogLocale: 'en_US', currency: 'USD' },
  de: { label: '🇩🇪 DE', ogLocale: 'de_DE', currency: 'EUR' },
  fr: { label: '🇫🇷 FR', ogLocale: 'fr_FR', currency: 'EUR' },
  es: { label: '🇪🇸 ES', ogLocale: 'es_ES', currency: 'EUR' },
  it: { label: '🇮🇹 IT', ogLocale: 'it_IT', currency: 'EUR' },
};

export const SITE_URL = 'https://aah.education';

export const isSupportedLocale = (lang: string): lang is Locale =>
  (SUPPORTED_LOCALES as readonly string[]).includes(lang);

export const LOCALE_PATH_REGEX = new RegExp(`^/(${SUPPORTED_LOCALES.join('|')})(?=/|$)`);

// Builds alternates.languages map for next/metadata, including x-default → DEFAULT_LOCALE.
export const buildHreflangMap = (path = ''): Record<string, string> => {
  const map: Record<string, string> = {};
  for (const lc of SUPPORTED_LOCALES) {
    map[lc] = `${SITE_URL}/${lc}${path}`;
  }
  map['x-default'] = `${SITE_URL}/${DEFAULT_LOCALE}${path}`;
  return map;
};
