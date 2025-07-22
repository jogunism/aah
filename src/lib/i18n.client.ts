'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// 번역 파일을 직접 import 합니다.
import enTranslation from '../../public/locales/en/translation.json';
import deTranslation from '../../public/locales/de/translation.json';

const i18nPromise = !i18n.isInitialized
  ? i18n
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        fallbackLng: 'en',
        supportedLngs: ['en', 'de'],
        detection: {
          order: ['cookie'],
          caches: ['cookie'],
          lookupCookie: 'language',
        },
        resources: {
          en: {
            translation: enTranslation,
          },
          de: {
            translation: deTranslation,
          },
        },
        react: {
          useSuspense: false,
        },
      })
  : Promise.resolve();

export { i18nPromise };
export default i18n;
