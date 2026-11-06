// 홈 프로그램 섹션: 목적별 진입 카드와 단기/장기 프로그램 타일
import Image from 'next/image';
import Link from 'next/link';
import { getTranslation } from '@/lib/i18n.server';
import { getServerCurrency } from '@/lib/currency.server';
import { getPrices } from '@/api/server';
import { Section, SectionHeading } from '@/components/ui/Section';
import { buttonClass } from '@/components/ui/Button';
import LivePrice from '@/components/common/LivePrice';

type Program = 'short' | 'long';

const SEGMENTS: { n: 1 | 2 | 3 | 4; icon: string; program: Program }[] = [
  { n: 1, icon: '🏖️', program: 'short' },
  { n: 2, icon: '🌱', program: 'short' },
  { n: 3, icon: '💬', program: 'long' },
  { n: 4, icon: '🎓', program: 'long' },
];

/**
 * "What brings you to Korea?" entry points + the two program tiles with live prices.
 */
export default async function Programs({ lang }: { lang: string }) {
  const { t } = await getTranslation(lang);
  const currency = await getServerCurrency(lang);
  const prices = await getPrices(currency);

  const tagLabel = (p: Program) => (p === 'short' ? t('TAG_SHORT') : t('TAG_LONG'));

  const tiles = [
    {
      program: 'short' as const,
      color: 'bg-aah-red',
      text: 'text-aah-red',
      plan: 'primary' as const,
      title: t('TILE_SHORT_TITLE'),
      sub: t('TILE_SHORT_SUB'),
      meta: [t('TILE_SHORT_META_1'), t('TILE_SHORT_META_2')],
      field: 'shortMin' as const,
      priceTemplate: t('PRICE_FROM', { price: '{{price}}' }),
      image: '/assets/image4.jpg',
    },
    {
      program: 'long' as const,
      color: 'bg-aah-blue',
      text: 'text-aah-blue',
      plan: 'blue' as const,
      title: t('TILE_LONG_TITLE'),
      sub: t('TILE_LONG_SUB'),
      meta: [t('TILE_LONG_META_1'), t('TILE_LONG_META_2')],
      field: 'longMin' as const,
      priceTemplate: `${t('PRICE_FROM', { price: '{{price}}' })} ${t('PRICE_PER_SEMESTER')}`,
      image: '/assets/image2.jpg',
    },
  ];

  return (
    <div id="programs" className="w-full scroll-mt-16">
      {/* Entry points by need */}
      <Section>
        <SectionHeading title={t('SEG_TITLE')} lead={t('SEG_LEAD')} />
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {SEGMENTS.map(({ n, icon, program }) => (
            <li key={n}>
              <Link
                href={`/${lang}/programs/${program}`}
                className="group h-full flex flex-col rounded-[22px] border border-line bg-white p-4 md:p-6 hover:border-ink/30 hover:shadow-sm transition"
              >
                <span className="text-[26px] md:text-[28px]" aria-hidden="true">{icon}</span>
                <span className="mt-3 md:mt-4 text-[15px] md:text-lg font-bold leading-snug text-ink">
                  {t(`SEG_${n}_TITLE`)}
                </span>
                <span className="hidden md:block mt-1.5 text-sm leading-relaxed text-muted">{t(`SEG_${n}_DESC`)}</span>
                <span className="mt-auto pt-4 text-sm font-semibold text-aah-red group-hover:underline">
                  {tagLabel(program)} ›
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* Program tiles */}
      <Section className="!pt-0">
        <SectionHeading title={t('LINEUP_TITLE')} center />
        <div className="grid md:grid-cols-2 gap-4 md:gap-5">
          {tiles.map((tile) => (
            <article key={tile.program} className="flex flex-col overflow-hidden rounded-[28px] bg-soft text-center">
              <div className="px-5 pt-9 pb-7 md:px-9 md:pt-11">
                <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-bold text-white ${tile.color}`}>
                  {tagLabel(tile.program)}
                </span>
                <h3 className="mt-3.5 mb-2 text-[30px] md:text-[40px] font-extrabold leading-tight tracking-[-0.025em] text-ink">
                  {tile.title}
                </h3>
                <p className="text-[17px] text-ink-2">{tile.sub}</p>
                <ul className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-muted">
                  {tile.meta.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
                <p className="mt-3 text-[17px] text-ink-2 min-h-[30px]">
                  <LivePrice
                    field={tile.field}
                    lang={lang}
                    template={tile.priceTemplate}
                    initial={prices}
                    initialCurrency={currency}
                  />
                </p>
                {prices && <p className="mt-1 text-xs text-muted">{t('PRICE_ESTIMATE_NOTE')}</p>}
                <div className="mt-6 flex justify-center gap-3">
                  <Link href={`/${lang}/plan?program=${tile.program}`} className={buttonClass(tile.plan)}>
                    {t('TILE_PLAN')}
                  </Link>
                  <Link href={`/${lang}/programs/${tile.program}`} className={buttonClass('outline', 'md', tile.text)}>
                    {t('TILE_LEARN')}
                    <span className="sr-only">: {tile.title}</span>
                  </Link>
                </div>
              </div>
              <div className="relative mt-auto h-[200px] md:h-[300px]">
                <Image src={tile.image} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
              </div>
            </article>
          ))}
        </div>
      </Section>
    </div>
  );
}
