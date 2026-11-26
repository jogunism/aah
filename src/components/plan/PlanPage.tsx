// 플랜 페이지(/plan, /plan/{학교}) 공통 화면. 정적 HTML에는 기본 선택의 빌더를 넣고 URL 쿼리는 브라우저에서 읽는다
import Header from '@/components/context/Header';
import Footer from '@/components/context/Footer';
import Contactus from '@/components/context/Contactus';
import { Suspense } from 'react';
import PlanBuilder from '@/components/plan/PlanBuilder';
import PlanBuilderFromQuery from '@/components/plan/PlanBuilderFromQuery';
import type { University } from '@/types/constants';
import type { Currency } from '@/lib/currency';
import type { Locale } from '@/lib/locales';

export default function PlanPage(props: {
  lang: Locale;
  title: string;
  lead: string;
  schools: University[];
  currency: Currency;
  school?: string; // school page: preselected in the static HTML
  defaultProgram: 'short' | 'long';
}) {
  const { lang, title, lead, schools, currency, school, defaultProgram } = props;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header lang={lang} />
      <div className="h-[60px]" />

      <main className="flex-grow">
        <section id="plan" className="max-w-[1180px] mx-auto px-5 md:px-6 pt-12 md:pt-16 pb-16 md:pb-24">
          <h1 className="text-[34px] md:text-[52px] leading-[1.08] font-extrabold tracking-[-0.03em] text-ink">
            {title}
          </h1>
          <p className="mt-3 mb-10 md:mb-12 max-w-[680px] text-[17px] md:text-xl leading-relaxed text-ink-2">
            {lead}
          </p>
          {/* The static HTML holds the default builder; the URL query (?program=&period=…) is read in the browser */}
          <Suspense
            fallback={
              <PlanBuilder
                lang={lang}
                initialProgram={defaultProgram}
                initialSchool={school}
                initial={schools}
                initialCurrency={currency}
                trackOpen={false}
              />
            }
          >
            <PlanBuilderFromQuery
              lang={lang}
              school={school}
              defaultProgram={defaultProgram}
              initial={schools}
              initialCurrency={currency}
            />
          </Suspense>
        </section>
        <Contactus />
      </main>

      <Footer lang={lang} />
    </div>
  );
}
