import i18next, { i18n as I18nInstance } from 'i18next';
import { headers } from 'next/headers';

import enTranslation from '../../public/locales/en/translation.json';
import deTranslation from '../../public/locales/de/translation.json';
import frTranslation from '../../public/locales/fr/translation.json';
import esTranslation from '../../public/locales/es/translation.json';
import itTranslation from '../../public/locales/it/translation.json';

import { SUPPORTED_LOCALES, DEFAULT_LOCALE, isSupportedLocale } from './locales';

const resources = {
  en: { translation: enTranslation },
  de: { translation: deTranslation },
  fr: { translation: frTranslation },
  es: { translation: esTranslation },
  it: { translation: itTranslation },
} as const;

const i18nInstances: Record<string, Promise<I18nInstance>> = {};

export const createI18nInstance = (lng: string) => {
  if (!i18nInstances[lng]) {
    const instance = i18next.createInstance();

    i18nInstances[lng] = instance
      .init({
        fallbackLng: DEFAULT_LOCALE,
        supportedLngs: SUPPORTED_LOCALES as unknown as string[],
        lng,
        ns: ['translation'],
        defaultNS: 'translation',
        resources,
        interpolation: {
          escapeValue: false,
        },
        initImmediate: false,
      })
      .then(() => instance);
  }

  return i18nInstances[lng];
};

const getLanguageFromHeaders = async (): Promise<string> => {
  try {
    const headersList = await headers();
    const locale = headersList.get('x-locale');
    if (locale && isSupportedLocale(locale)) {
      return locale;
    }
  } catch {
    // headers() 호출 실패 시 기본값 사용
  }

  return DEFAULT_LOCALE;
};

export const getTranslation = async (lang?: string) => {
  const resolvedLang = lang || (await getLanguageFromHeaders());
  const i18n = await createI18nInstance(resolvedLang);

  return {
    t: i18n.t.bind(i18n),
    lang: resolvedLang,
  };
};

export default getTranslation;
