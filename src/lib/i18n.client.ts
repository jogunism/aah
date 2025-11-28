'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 번역 파일을 직접 import 합니다.
import enTranslation from '../../public/locales/en/translation.json';
import deTranslation from '../../public/locales/de/translation.json';

// URL에서 언어 감지
const getLanguageFromURL = () => {
  if (typeof window === 'undefined') return 'en';
  const pathname = window.location.pathname;
  const match = pathname.match(/^\/(en|de)/);
  return match ? match[1] : 'en';
};

const i18nPromise = !i18n.isInitialized
  ? i18n
      .use(initReactI18next)
      .init({
        fallbackLng: 'en',
        supportedLngs: ['en', 'de'],
        lng: getLanguageFromURL(),
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
