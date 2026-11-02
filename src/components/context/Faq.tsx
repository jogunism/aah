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
    <section id="faq" className="relative w-full bg-white mb-30 scroll-mt-[60px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(items)) }}
      />
      <div className="relative bg-gradient-to-b from-[#f3e1eb] to-[#fff] w-full px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">{t('FAQ_TITLE')}</h2>
          <p className="text-lg text-gray-800 mb-10 text-center">{t('FAQ_DESCRIPTION')}</p>

          <div className="space-y-3">
            {items.map(({ question, answer }, i) => (
              <details
                key={i}
                className="group bg-white rounded-2xl border border-gray-200 shadow-sm"
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-6 py-4 text-lg font-semibold text-gray-800 [&::-webkit-details-marker]:hidden">
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
