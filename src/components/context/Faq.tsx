// 홈 FAQ 섹션(서버 렌더링 + FAQPage 구조화 데이터)
import { getTranslation } from '@/lib/i18n.server';
import { buildFaqSchema } from '@/lib/schema';

import { FAQ_ITEMS } from '@/lib/faq';

/**
 * Frequently asked questions.
 * Server-rendered with native <details> so every answer is in the HTML for
 * search engines and AI crawlers, plus FAQPage structured data.
 */
export default async function Faq() {
  const { t } = await getTranslation();

  const items = FAQ_ITEMS.map((n) => ({
    question: t(`FAQ_Q${n}`),
    answer: t(`FAQ_A${n}`),
  }));

  return (
    <section id="faq" className="w-full py-16 md:py-24 scroll-mt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(items)) }}
      />
      <div className="w-full px-5 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-[30px] md:text-[44px] leading-[1.1] font-extrabold tracking-[-0.025em] text-ink mb-3 text-center">{t('FAQ_TITLE')}</h2>
          <p className="text-[17px] md:text-xl text-ink-2 mb-10 text-center">{t('FAQ_DESCRIPTION')}</p>

          <div className="space-y-3">
            {items.map(({ question, answer }, i) => (
              <details
                key={i}
                className="group bg-white rounded-2xl border border-line"
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-5 md:px-6 py-4 text-base md:text-lg font-semibold text-ink [&::-webkit-details-marker]:hidden">
                  <h3>{question}</h3>
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-2xl leading-none text-aah-red transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="px-6 pb-5 text-base text-gray-700 leading-relaxed">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
