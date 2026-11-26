// 학교별 플랜 페이지(/plan/{학교}). 학교를 고른 견적을 서버에서 그려 학교 이름·학비로 검색되게 한다
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import PlanPage from '@/components/plan/PlanPage';
import { getTranslation } from '@/lib/i18n.server';
import { getServerCurrency } from '@/lib/currency.server';
import { getSchools } from '@/api/server';
import { defaultProgram, planPath } from '@/lib/plan';
import { CURRENCY_SYMBOL } from '@/lib/currency';
import { formatPrice } from '@/utils';
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
  params: Promise<{ lang: string; school: string }>;
}

// Not prerendered at build: ~100 school pages fetching at once get API 500s (throttling).
// Each page renders on its first visit and is then cached like a static page (ISR)
export async function generateStaticParams() {
  return [];
}

// The school and the program its page opens on; null when the school has no page
async function loadSchool(langParam: string, id: string) {
  const lang = isSupportedLocale(langParam) ? langParam : DEFAULT_LOCALE;
  const currency = await getServerCurrency(lang);
  const schools = await getSchools(currency);
  const school = schools.find((s) => s.id === id);
  const program = school ? defaultProgram(school) : null;
  return { lang, currency, schools, school: program ? school! : null, program: program ?? 'short' };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang: langParam, school: id } = await params;
  const { lang, currency, school, program } = await loadSchool(langParam, id);
  if (!school) return {};
  const { t } = await getTranslation(lang);

  // "from €1,940 for 1 semester": the first option's price before housing, as on the program pages
  const duration = school.pricing?.[program]?.terms[0]?.duration;
  const price = `${CURRENCY_SYMBOL[currency]}${formatPrice(program === 'long' ? school.priceLong : school.priceShort, lang)}`;
  const title = t('PLAN_SCHOOL_META_TITLE', { school: school.title });
  const description = t('PLAN_SCHOOL_META_DESC', {
    school: school.title,
    price,
    duration: duration
      ? t(`TUITION_CALCULATOR_DURATION_${duration.unit.toUpperCase()}`, { count: duration.value })
      : '',
  });
  const path = `/plan/${school.id}`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}${path}`,
      languages: buildHreflangMap(path),
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${lang}${path}`,
      siteName: 'aah! education',
      type: 'website',
      images: [OG_IMAGE],
      locale: LOCALE_META[lang].ogLocale,
      alternateLocale: SUPPORTED_LOCALES.filter((l) => l !== lang).map((l) => LOCALE_META[l].ogLocale),
    },
  };
}

export default async function SchoolPlanPage({ params }: PageProps) {
  const { lang: langParam, school: id } = await params;
  const { lang, currency, schools, school, program } = await loadSchool(langParam, id);
  // Unknown or hidden school (no prices): the general plan page. An empty list means the API
  // failed: throw, so a regeneration keeps the cached page instead of redirecting it away
  if (!school) {
    if (schools.length === 0) throw new Error('School list unavailable');
    redirect(planPath(lang));
  }
  const { t } = await getTranslation(lang);

  return (
    <PlanPage
      lang={lang}
      title={t('PLAN_SCHOOL_TITLE', { school: school.title })}
      lead={t('PLAN_LEAD')}
      schools={schools}
      currency={currency}
      school={school.id}
      defaultProgram={program}
    />
  );
}
