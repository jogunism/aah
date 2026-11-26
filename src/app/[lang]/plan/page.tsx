// 플랜 빌더 페이지(/plan, 학교 선택 전). 학교를 고르면 학교 페이지(/plan/{학교})로 이어지고 아래 문의 폼으로 연결
import { Metadata } from 'next';
import PlanPage from '@/components/plan/PlanPage';
import { getTranslation } from '@/lib/i18n.server';
import { getServerCurrency } from '@/lib/currency.server';
import { getSchools } from '@/api/server';
import {
  SITE_URL,
  OG_IMAGE,
  LOCALE_META,
  SUPPORTED_LOCALES,
  buildHreflangMap,
  isSupportedLocale,
  DEFAULT_LOCALE,
} from '@/lib/locales';

export const revalidate = 3600; // static, rebuilt hourly (prices follow exchange rates)

interface PageProps {
  params: Promise<{ lang: string }>;
}

const PATH = '/plan';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang: langParam } = await params;
  const lang = isSupportedLocale(langParam) ? langParam : DEFAULT_LOCALE;
  const { t } = await getTranslation(lang);

  return {
    title: t('PLAN_META_TITLE'),
    description: t('PLAN_LEAD'),
    alternates: {
      canonical: `${SITE_URL}/${lang}${PATH}`,
      languages: buildHreflangMap(PATH),
    },
    openGraph: {
      title: t('PLAN_META_TITLE'),
      description: t('PLAN_LEAD'),
      url: `${SITE_URL}/${lang}${PATH}`,
      siteName: 'aah! education',
      type: 'website',
      images: [OG_IMAGE],
      locale: LOCALE_META[lang].ogLocale,
      alternateLocale: SUPPORTED_LOCALES.filter((l) => l !== lang).map((l) => LOCALE_META[l].ogLocale),
    },
  };
}

export default async function PlanIndexPage({ params }: PageProps) {
  const { lang: langParam } = await params;
  const lang = isSupportedLocale(langParam) ? langParam : DEFAULT_LOCALE;
  const { t } = await getTranslation(lang);
  const currency = await getServerCurrency(lang);
  const schools = await getSchools(currency);

  return (
    <PlanPage
      lang={lang}
      title={t('PLAN_TITLE')}
      lead={t('PLAN_LEAD')}
      schools={schools}
      currency={currency}
      defaultProgram="short"
    />
  );
}
