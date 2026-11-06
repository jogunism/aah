// 단기/장기 프로그램 상세 페이지 공통 레이아웃(서브 메뉴·히어로·핵심 스펙·본문·학교별 가격·문의 폼·하단 고정 바)
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { getTranslation } from '@/lib/i18n.server';
import { getServerCurrency } from '@/lib/currency.server';
import { getPrices, getSchools } from '@/api/server';
import Header from '@/components/context/Header';
import Footer from '@/components/context/Footer';
import Contactus from '@/components/context/Contactus';
import ScrollLink from '@/components/common/ScrollLink';
import LivePrice from '@/components/common/LivePrice';
import BoldText from '@/components/common/BoldText';
import { buttonClass } from '@/components/ui/Button';
import SchoolPrices from './SchoolPrices';

type Program = 'short' | 'long';

const CONFIG = {
  short: {
    name: 'PROGRAM_MODAL_SHORT_TERM',
    title: 'PROGRAM_MODAL_SHORT_TERM_TITLE',
    lead: 'PROGRAMS_SHORT_DESCRIPTION',
    factPrefix: 'PROGRAM_MODAL_SHORT_TERM_TABLE_VALUE_1_',
    priceField: 'shortMin',
    image: '/assets/image4.jpg',
    button: 'primary',
  },
  long: {
    name: 'PROGRAM_MODAL_LONG_TERM',
    title: 'PROGRAM_MODAL_LONG_TERM_TITLE',
    lead: 'PROGRAMS_LONG_DESCRIPTION',
    factPrefix: 'PROGRAM_MODAL_LONG_TERM_TABLE_VALUE_1_',
    priceField: 'longMin',
    image: '/assets/image2.jpg',
    button: 'blue',
  },
} as const;

// Table rows used as key facts: unit length, levels, class hours, class size, visa
const FACT_ROWS = [3, 2, 5, 7, 8] as const;

export default async function ProgramPage({
  lang,
  program,
  children,
}: {
  lang: string;
  program: Program;
  children: ReactNode; // program body content
}) {
  const { t } = await getTranslation(lang);
  const currency = await getServerCurrency(lang);
  const [prices, schools] = await Promise.all([getPrices(currency), getSchools(currency)]);
  const c = CONFIG[program];

  const priceTemplate =
    program === 'long'
      ? `${t('PRICE_FROM', { price: '{{price}}' })} ${t('PRICE_PER_SEMESTER')}`
      : t('PRICE_FROM', { price: '{{price}}' });
  const planHref = `/${lang}/plan?program=${program}`;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header lang={lang} />
      <div className="h-[60px]" />

      {/* Product sub-nav */}
      <div className="sticky top-[60px] z-[900] bg-white/90 backdrop-blur-xl border-b border-line">
        <div className="max-w-[1180px] mx-auto h-[52px] px-5 md:px-6 flex items-center gap-6">
          <p className="text-[17px] md:text-[19px] font-bold tracking-tight text-ink">{t(c.name)}</p>
          <nav aria-label={t(c.name)} className="hidden md:block ml-auto">
            <ul className="flex gap-6 text-[13px] text-ink-2">
              <li><a href="#overview" className="hover:text-ink">{t('PROGRAM_NAV_OVERVIEW')}</a></li>
              <li><a href="#details" className="hover:text-ink">{t('PROGRAM_NAV_DETAILS')}</a></li>
              <li><a href="#schools" className="hover:text-ink">{t('PROGRAM_NAV_SCHOOLS')}</a></li>
            </ul>
          </nav>
          <Link href={planHref} className={buttonClass(c.button, 'sm', 'ml-auto md:ml-0')}>
            {t('PROGRAM_PLAN_APPLY')}
          </Link>
        </div>
      </div>

      <main className="flex-grow">
        {/* Hero */}
        <section id="overview" className="scroll-mt-[120px] pt-14 md:pt-20 text-center">
          <div className="max-w-[1180px] mx-auto px-5 md:px-6">
            <p className="text-sm font-bold uppercase tracking-wide text-aah-red">{t(c.name)}</p>
            <h1 className="mt-3 mx-auto max-w-[900px] text-[34px] md:text-[56px] leading-[1.08] font-extrabold tracking-[-0.03em] text-ink">
              {t(c.title)}
            </h1>
            <p className="mt-4 mx-auto max-w-[680px] text-[17px] md:text-xl leading-relaxed text-ink-2">{t(c.lead)}</p>
            <div className="mt-7 flex flex-col sm:flex-row justify-center gap-3">
              <Link href={planHref} className={buttonClass(c.button)}>
                {t('PROGRAM_PLAN_APPLY')}
              </Link>
              <ScrollLink lang={lang} section="contactus" className={buttonClass('outline', 'md', 'text-ink')}>
                {t('PROGRAM_TALK')}
              </ScrollLink>
            </div>
            <p className="mt-4 text-[15px] text-muted">
              <LivePrice
                field={c.priceField}
                lang={lang}
                template={priceTemplate}
                initial={prices}
                initialCurrency={currency}
                amountClassName="font-semibold text-ink"
              />
            </p>
            {prices && <p className="mt-1 text-xs text-muted">{t('PRICE_ESTIMATE_NOTE')}</p>}
            <div className="relative mt-10 md:mt-14 h-[240px] md:h-[480px] overflow-hidden rounded-[24px] md:rounded-[28px]">
              <Image src={c.image} alt="" fill priority sizes="(min-width: 1180px) 1132px, 100vw" className="object-cover" />
            </div>

            {/* Key facts */}
            <dl className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-px bg-line rounded-[22px] border border-line text-left overflow-hidden">
              {FACT_ROWS.map((n) => (
                <div key={n} className="bg-white p-4 md:p-6 last:col-span-2 md:last:col-span-1">
                  <dt className="text-xs text-muted">{t(`PROGRAM_MODAL_TABLE_SECTION_${n}`)}</dt>
                  <dd className="mt-1 text-[15px] md:text-base font-bold leading-snug text-ink">{t(`${c.factPrefix}${n}`)}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Program body */}
        <section id="details" className="scroll-mt-[120px] py-14 md:py-20">
          <div className="max-w-[1180px] mx-auto px-5 md:px-6">{children}</div>
        </section>

        {/* Schools & prices */}
        <section id="schools" className="scroll-mt-[120px] bg-soft py-14 md:py-20">
          <div className="max-w-[1180px] mx-auto px-5 md:px-6">
            <h2 className="text-[30px] md:text-[44px] leading-[1.1] font-extrabold tracking-[-0.025em] text-ink">
              {t('PROGRAM_SCHOOLS_TITLE')}
            </h2>
            <p className="mt-3 mb-10 text-[17px] md:text-xl text-ink-2">{t('PROGRAM_SCHOOLS_LEAD')}</p>
            <SchoolPrices
              lang={lang}
              program={program}
              initial={schools}
              initialCurrency={currency}
              labels={{
                university: t('TUITION_CALCULATOR_GROUP_UNIVERSITY'),
                languageSchool: t('TUITION_CALCULATOR_GROUP_LANGUAGE_SCHOOL'),
                select: t('PROGRAM_SCHOOL_SELECT'),
                from: t('PRICE_FROM', { price: '{{price}}' }),
                perSemester: t('PRICE_PER_SEMESTER'),
              }}
            />
            <p className="mt-6 text-[13px] text-muted"><BoldText text={t('COMPARE_PRICE_NOTE')} /></p>
          </div>
        </section>

        {/* "Talk to an advisor" scrolls here instead of leaving for the home page */}
        <Contactus />

        {/* Sticky buy bar */}
        <div className="sticky bottom-0 z-[800] bg-white/95 backdrop-blur border-t border-line">
          <div className="max-w-[1180px] mx-auto px-5 md:px-6 py-3 md:h-[76px] flex items-center gap-4">
            <div className="hidden md:block min-w-0">
              <p className="font-bold text-ink">{t(c.name)}</p>
              <p className="text-[13px] text-muted truncate">{t('PROGRAM_BAR_NOTE')}</p>
            </div>
            <div className="flex w-full md:w-auto md:ml-auto gap-2.5">
              <ScrollLink lang={lang} section="contactus" className={buttonClass('outline', 'md', 'flex-1 md:flex-none text-ink')}>
                {t('PROGRAM_TALK')}
              </ScrollLink>
              <Link href={planHref} className={buttonClass(c.button, 'md', 'flex-1 md:flex-none')}>
                {t('PROGRAM_PLAN_APPLY')}
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
