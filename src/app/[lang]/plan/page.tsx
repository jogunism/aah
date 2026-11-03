// 플랜 빌더 페이지(/plan). 프로그램·학교 쿼리를 받아 견적을 보여주고 아래 문의 폼으로 연결
import { Metadata } from 'next';
import Header from '@/components/context/Header';
import Footer from '@/components/context/Footer';
import Contactus from '@/components/context/Contactus';
import PlanBuilder from '@/components/plan/PlanBuilder';
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

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ program?: string; school?: string }>;
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

export default async function PlanPage({ params, searchParams }: PageProps) {
  const { lang: langParam } = await params;
  const lang = isSupportedLocale(langParam) ? langParam : DEFAULT_LOCALE;
  const { program, school } = await searchParams;
  const { t } = await getTranslation(lang);
  const currency = await getServerCurrency(lang);
  const schools = await getSchools(currency);

  return (
    <div className="flex flex-col min-h-screen bg-white pb-[68px] lg:pb-0">
      <Header lang={lang} />
      <div className="h-[60px]" />

      <main className="flex-grow">
        <section id="plan" className="max-w-[1180px] mx-auto px-5 md:px-6 pt-12 md:pt-16 pb-16 md:pb-24">
          <h1 className="text-[34px] md:text-[52px] leading-[1.08] font-extrabold tracking-[-0.03em] text-ink">
            {t('PLAN_TITLE')}
          </h1>
          <p className="mt-3 mb-10 md:mb-12 max-w-[680px] text-[17px] md:text-xl leading-relaxed text-ink-2">
            {t('PLAN_LEAD')}
          </p>
          <PlanBuilder
            lang={lang}
            initialProgram={program === 'long' ? 'long' : 'short'}
            initialSchool={school}
            initial={schools}
            initialCurrency={currency}
          />
        </section>
        <Contactus />
      </main>

      <Footer />
    </div>
  );
}
