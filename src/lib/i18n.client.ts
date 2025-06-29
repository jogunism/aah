'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

const i18nPromise = !i18n.isInitialized
  ? i18n
      .use(HttpBackend)
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        fallbackLng: 'en',
        supportedLngs: ['en', 'de'],
        detection: {
          order: ['cookie', 'navigator'],
          caches: ['cookie'],
          lookupCookie: 'language',
        },
        backend: {
          loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
        react: {
          useSuspense: false,
        },
      })
  : Promise.resolve();

export { i18nPromise };
export default i18n;
