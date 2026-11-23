'use client';
// 약관의 유로 고정 금액을 방문자가 고른 통화로 표시(서버는 언어 기본 통화로 그림)

import { useCurrencyStore } from '@/store/currencyStore';
import { fromEur, type Currency } from '@/lib/currency';

export default function EurAmount({
  eur,
  lang,
  rates,
  initialCurrency,
}: {
  eur: number;
  lang: string;
  rates: Record<Currency, number> | null;
  initialCurrency: Currency;
}) {
  const chosen = useCurrencyStore((s) => (s.ready ? s.currency : null)) ?? initialCurrency;
  // Without rates (API down) the euro amount is the one that applies
  const currency: Currency = rates ? chosen : 'EUR';
  const amount = fromEur(eur, rates?.[currency] ?? 1);
  return (
    <span data-price-cur={currency} className="whitespace-nowrap">
      {new Intl.NumberFormat(lang, { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount)}
    </span>
  );
}
