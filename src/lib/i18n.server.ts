import i18next, { i18n as I18nInstance } from 'i18next';
import { headers } from 'next/headers';

// 번역 파일을 직접 import 합니다.
import enTranslation from '../../public/locales/en/translation.json';
import deTranslation from '../../public/locales/de/translation.json';

const i18nInstances: Record<string, Promise<I18nInstance>> = {};

const createI18nInstance = (lng: string) => {
  if (!i18nInstances[lng]) {
    const instance = i18next.createInstance();

    i18nInstances[lng] = instance
      .init({
        fallbackLng: 'en',
        supportedLngs: ['en', 'de'],
        lng,
        ns: ['translation'],
        defaultNS: 'translation',
        resources: {
          en: {
            translation: enTranslation,
          },
          de: {
            translation: deTranslation,
          },
        },
        interpolation: {
          escapeValue: false,
        },
        initImmediate: false,
      })
      .then(() => instance);
  }

  return i18nInstances[lng];
};

export const getTranslation = async () => {
  const cookieHeader = (await headers()).get('cookie') || '';
  const lang =
    cookieHeader
      .split(';')
      .map(v => v.trim())
      .find(v => v.startsWith('language='))
      ?.split('=')[1] || 'en';

  const i18n = await createI18nInstance(lang);

  return {
    t: i18n.t.bind(i18n),
    lang,
  };
};

export default getTranslation;
