import i18next, { i18n as I18nInstance } from 'i18next';
import Backend from 'i18next-fs-backend';
import { headers } from 'next/headers';
import path from 'path';

const i18nInstances: Record<string, Promise<I18nInstance>> = {};

const createI18nInstance = (lng: string) => {
  if (!i18nInstances[lng]) {
    const instance = i18next.createInstance();

    i18nInstances[lng] = instance
      .use(Backend)
      .init({
        fallbackLng: 'en',
        supportedLngs: ['en', 'de'],
        preload: ['en', 'de'],
        lng,
        ns: ['translation'],
        defaultNS: 'translation',
        backend: {
          loadPath: path.join(process.cwd(), 'public/locales/{{lng}}/{{ns}}.json'),
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
