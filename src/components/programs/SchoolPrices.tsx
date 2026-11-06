'use client';
// 프로그램 상세 페이지의 학교별 시작가 목록(통화 변경 시 다시 불러옴)

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useCurrencyStore } from '@/store/currencyStore';
import { fetchSchools } from '@/api/local';
import { formatPrice } from '@/utils';
import type { University } from '@/types/constants';
import { CURRENCY_SYMBOL as SYMBOL, type Currency } from '@/lib/currency';

type Program = 'short' | 'long';

const priceOf = (s: University, program: Program) => (program === 'short' ? s.priceShort : s.priceLong);

export default function SchoolPrices({
  lang,
  program,
  initial,
  initialCurrency,
  labels,
}: {
  lang: string;
  program: Program;
  initial: University[];
  initialCurrency: Currency;
  labels: { university: string; languageSchool: string; select: string; from: string; perSemester: string };
}) {
  const currency = useCurrencyStore((s) => (s.ready ? s.currency : null)) as Currency | null;
  const [state, setState] = useState({ schools: initial, currency: initialCurrency });

  useEffect(() => {
    if (!currency || currency === state.currency) return;
    let alive = true;
    fetchSchools(currency).then((list) => alive && list.length && setState({ schools: list, currency }));
    return () => {
      alive = false;
    };
  }, [currency, state.currency]);

  // Same rule as the plan builder (synced pricing first, legacy price otherwise), so every
  // "Select" link opens /plan with the school preselected
  const offered = state.schools.filter(
    (s) => (s.pricing ? !!s.pricing[program] : true) && priceOf(s, program) > 0,
  );
  const groups = [
    { label: labels.university, items: offered.filter((s) => s.schoolType !== 'language_school') },
    { label: labels.languageSchool, items: offered.filter((s) => s.schoolType === 'language_school') },
  ].filter((g) => g.items.length);

  const [before, after] = labels.from.split('{{price}}');

  return (
    <div className="space-y-8">
      {groups.map((g) => (
        <div key={g.label}>
          <p className="mb-3 text-xs font-bold uppercase tracking-wide text-muted">{g.label}</p>
          <ul className="overflow-hidden rounded-[22px] border border-line divide-y divide-line">
            {g.items.map((s) => (
              <li key={s.id} className="flex items-center gap-3 md:gap-4 bg-white px-4 py-3.5 md:px-6 md:py-4">
                <Image src={`/assets/emblem/${s.id}.png`} alt="" width={40} height={40} className="w-10 h-10 object-contain shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-[15px] font-semibold text-ink leading-tight">{s.title}</p>
                  <p className="text-xs text-muted">{s.subTitle}</p>
                  {/* mobile: price under the name */}
                  <p className="sm:hidden mt-1 text-[13px] text-ink-2">
                    {before}
                    <b className="text-ink">
                      {SYMBOL[state.currency]}
                      {formatPrice(priceOf(s, program), lang)}
                    </b>
                    {after}
                    {program === 'long' && <> {labels.perSemester}</>}
                  </p>
                </div>
                <p className="hidden sm:block text-sm text-ink-2 text-right whitespace-nowrap">
                  {before}
                  <b className="text-[17px] text-ink">
                    {SYMBOL[state.currency]}
                    {formatPrice(priceOf(s, program), lang)}
                  </b>
                  {after}
                  {program === 'long' && <> {labels.perSemester}</>}
                </p>
                <Link
                  href={`/${lang}/plan?program=${program}&school=${s.id}`}
                  className="inline-flex shrink-0 h-9 px-3 sm:px-4 items-center rounded-full border-[1.5px] border-aah-red text-aah-red text-[13px] font-semibold hover:bg-aah-red/5"
                >
                  {labels.select}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
