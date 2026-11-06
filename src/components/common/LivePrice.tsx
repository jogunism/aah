'use client';
// 서버에서 그린 시작가를 통화 변경 시 클라이언트에서 갱신하는 가격 표시

import { useEffect, useState } from 'react';
import { useCurrencyStore } from '@/store/currencyStore';
import { fetchPrices } from '@/api/local';
import { formatPrice } from '@/utils';
import type { Prices } from '@/types/constants';
import { CURRENCY_SYMBOL as SYMBOL, type Currency } from '@/lib/currency';

// One shared request per currency for all LivePrice instances on the page
const inflight: Partial<Record<Currency, Promise<Prices | null>>> = {};
const loadPrices = (c: Currency) =>
  (inflight[c] ??= fetchPrices(c).then((p) => {
    if (!p) delete inflight[c]; // retry next time instead of caching the failure
    return p;
  }));

/**
 * "From $X" text. Server-rendered with the locale's default currency,
 * refreshed on the client when the visitor switches currency.
 */
export default function LivePrice({
  field,
  lang,
  template,
  initial,
  initialCurrency,
  amountClassName = 'text-[22px] font-bold text-ink',
}: {
  field: keyof Prices;
  lang: string;
  template: string; // e.g. "From {{price}}"
  initial: Prices | null;
  initialCurrency: Currency;
  amountClassName?: string;
}) {
  const currency = useCurrencyStore((s) => (s.ready ? s.currency : null)) as Currency | null;
  const [state, setState] = useState({ prices: initial, currency: initialCurrency });

  useEffect(() => {
    if (!currency || currency === state.currency) return;
    let alive = true;
    loadPrices(currency).then((p) => alive && p && setState({ prices: p, currency }));
    return () => {
      alive = false;
    };
  }, [currency, state.currency]);

  const amount = state.prices?.[field];
  if (!amount || amount <= 0) return null;

  const [before, after] = template.split('{{price}}');
  return (
    <>
      {before}
      <b className={amountClassName}>
        {SYMBOL[state.currency]}
        {formatPrice(amount, lang)}
      </b>
      {after}
    </>
  );
}
