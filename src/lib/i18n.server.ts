import i18next, { i18n as I18nInstance } from 'i18next';
import { headers } from 'next/headers';

// 번역 파일을 직접 import 합니다.
import enTranslation from '../../public/locales/en/translation.json';
import deTranslation from '../../public/locales/de/translation.json';

const supportedLocales = ['en', 'de'];

const i18nInstances: Record<string, Promise<I18nInstance>> = {};

export const createI18nInstance = (lng: string) => {
  if (!i18nInstances[lng]) {
    const instance = i18next.createInstance();

    i18nInstances[lng] = instance
      .init({
        fallbackLng: 'en',
        supportedLngs: supportedLocales,
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

// 미들웨어에서 설정한 x-locale 헤더에서 언어 감지
const getLanguageFromHeaders = async (): Promise<string> => {
  try {
    const headersList = await headers();
    const locale = headersList.get('x-locale');
    if (locale && supportedLocales.includes(locale)) {
      return locale;
    }
  } catch {
    // headers() 호출 실패 시 기본값 사용
  }

  return 'en';
};

// URL 파라미터 기반으로 번역 가져오기
export const getTranslation = async (lang?: string) => {
  // lang이 명시적으로 전달되지 않으면 헤더에서 감지
  const resolvedLang = lang || (await getLanguageFromHeaders());
  const i18n = await createI18nInstance(resolvedLang);

  return {
    t: i18n.t.bind(i18n),
    lang: resolvedLang,
  };
};

export default getTranslation;
