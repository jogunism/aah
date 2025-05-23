import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import { headers } from 'next/headers';
import path from 'path';

const initI18n = async () => {
  const cookieHeader = (await headers()).get('cookie') || '';
  const langCookie =
    cookieHeader
      .split(';')
      .map(v => v.trim())
      .find(v => v.startsWith('language='))
      ?.split('=')[1] || 'en';

  const instance = i18next.createInstance();

  await instance.use(Backend).init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'de'],
    lng: langCookie,
    preload: ['en', 'de'],
    ns: ['translation'],
    defaultNS: 'translation',
    backend: {
      loadPath: path.resolve('./public/locales/{{lng}}/{{ns}}.json'),
    },
    interpolation: {
      escapeValue: false,
    },
  });

  return instance;
};

export default initI18n;
