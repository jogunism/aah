import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import { initReactI18next } from 'react-i18next';
import path from 'path';

export async function initServerI18n(locale: string) {
  await i18next
    .use(Backend)
    .use(initReactI18next)
    .init({
      lng: locale,
      fallbackLng: 'en',
      supportedLngs: ['en', 'ko', 'ja'],
      ns: ['translation'],
      defaultNS: 'translation',
      backend: {
        loadPath: path.join(process.cwd(), '/public/locales/{{lng}}/{{ns}}.json'),
      },
      interpolation: {
        escapeValue: false,
      },
    });

  return i18next;
}
