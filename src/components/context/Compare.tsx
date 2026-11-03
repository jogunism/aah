// 홈 단기 vs 장기 프로그램 비교표(가격 범위는 API 데이터)
import { getTranslation } from '@/lib/i18n.server';
import { getServerCurrency } from '@/lib/currency.server';
import { getPrices } from '@/api/server';
import { Section, SectionHeading } from '@/components/ui/Section';
import LivePrice from '@/components/common/LivePrice';
import BoldText from '@/components/common/BoldText';
import type { Prices } from '@/types/constants';

export default async function Compare({ lang }: { lang: string }) {
  const { t } = await getTranslation(lang);
  const currency = await getServerCurrency(lang);
  const prices = await getPrices(currency);

  // No price data (API error) → leave the cell empty rather than a bare " – "
  const range = (min: keyof Prices, max: keyof Prices) => prices && (
    <span className="font-semibold text-ink">
      <LivePrice field={min} lang={lang} template="{{price}}" initial={prices} initialCurrency={currency} amountClassName="" />
      {' - '}
      <LivePrice field={max} lang={lang} template="{{price}}" initial={prices} initialCurrency={currency} amountClassName="" />
    </span>
  );

  const rows = [
    { label: t('COMPARE_ROW_LENGTH'), short: t('COMPARE_SHORT_LENGTH'), long: t('COMPARE_LONG_LENGTH') },
    { label: t('COMPARE_ROW_START'), short: t('COMPARE_SHORT_START'), long: t('COMPARE_LONG_START') },
    { label: t('COMPARE_ROW_CLASSES'), short: t('COMPARE_SHORT_CLASSES'), long: t('COMPARE_LONG_CLASSES') },
    { label: t('COMPARE_ROW_SIZE'), short: t('COMPARE_SHORT_SIZE'), long: t('COMPARE_LONG_SIZE') },
    { label: t('COMPARE_ROW_VISA'), short: t('TILE_SHORT_META_2'), long: t('COMPARE_LONG_VISA') },
    { label: t('COMPARE_ROW_BEST'), short: t('COMPARE_SHORT_BEST'), long: t('COMPARE_LONG_BEST') },
    {
      label: t('COMPARE_ROW_PRICE'),
      short: range('shortMin', 'shortMax'),
      long: prices && (
        <>
          {range('longMin', 'longMax')} {t('PRICE_PER_SEMESTER')}
        </>
      ),
    },
  ];

  return (
    <Section id="compare" className="!pt-0">
      <SectionHeading title={t('COMPARE_TITLE')} center />
      <div className="overflow-hidden rounded-[22px] border border-line">
        <table className="w-full text-sm md:text-[15px] text-ink-2">
          <thead className="bg-soft text-ink">
            <tr className="grid grid-cols-2 md:table-row">
              <th className="hidden md:table-cell w-[22%]" />
              {[
                { label: t('TAG_SHORT'), dot: 'bg-aah-red' },
                { label: t('TAG_LONG'), dot: 'bg-aah-blue' },
              ].map((h) => (
                <th key={h.label} scope="col" className="px-4 md:px-6 py-4 text-left text-base md:text-[17px] font-bold">
                  <span className={`inline-block w-2.5 h-2.5 rounded-full mr-2 ${h.dot}`} aria-hidden="true" />
                  {h.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="grid grid-cols-2 md:table-row border-t border-line">
                <th
                  scope="row"
                  className="col-span-2 px-4 pt-3 md:px-6 md:py-4 text-left align-top font-medium text-muted text-xs uppercase tracking-wide md:text-[15px] md:normal-case md:tracking-normal"
                >
                  {r.label}
                </th>
                <td className="px-4 py-2.5 md:px-6 md:py-4 align-top whitespace-pre-line">{r.short}</td>
                <td className="px-4 py-2.5 md:px-6 md:py-4 align-top whitespace-pre-line">{r.long}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-center text-[13px] text-muted"><BoldText text={t('COMPARE_PRICE_NOTE')} /></p>
    </Section>
  );
}
