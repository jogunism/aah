'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from '../../public/locales/en/translation.json';
import deTranslation from '../../public/locales/de/translation.json';
import frTranslation from '../../public/locales/fr/translation.json';
import esTranslation from '../../public/locales/es/translation.json';
import itTranslation from '../../public/locales/it/translation.json';

import {
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
  LOCALE_PATH_REGEX,
} from './locales';

const getLanguageFromURL = () => {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;
  const match = window.location.pathname.match(LOCALE_PATH_REGEX);
  return match ? match[1] : DEFAULT_LOCALE;
};

const i18nPromise = !i18n.isInitialized
  ? i18n
      .use(initReactI18next)
      .init({
        fallbackLng: DEFAULT_LOCALE,
        supportedLngs: SUPPORTED_LOCALES as unknown as string[],
        lng: getLanguageFromURL(),
        resources: {
          en: { translation: enTranslation },
          de: { translation: deTranslation },
          fr: { translation: frTranslation },
          es: { translation: esTranslation },
          it: { translation: itTranslation },
        },
        react: {
          useSuspense: false,
        },
      })
  : Promise.resolve();

export { i18nPromise };
export default i18n;
