'use client';
// URL 쿼리(program, period, stay, cur)를 브라우저에서 읽어 플랜 빌더에 넘기는 래퍼(페이지를 정적 캐시로 두기 위함). 학교는 경로(/plan/{학교})에서 받는다

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import PlanBuilder from '@/components/plan/PlanBuilder';
import type { University } from '@/types/constants';
import type { Currency } from '@/lib/currency';

// "2" → 2; missing or malformed values are ignored
const positiveInt = (value: string | null) => {
  const n = Number(value);
  return Number.isInteger(n) && n > 0 ? n : undefined;
};

export default function PlanBuilderFromQuery(props: {
  lang: string;
  school?: string;
  defaultProgram: 'short' | 'long';
  initial: University[];
  initialCurrency: Currency;
}) {
  const { school, defaultProgram, ...rest } = props;
  const searchParams = useSearchParams();
  const program = searchParams.get('program');

  // The query is applied now: lift the pre-paint placeholder (see layout PRE_PAINT_SCRIPT)
  useEffect(() => {
    delete document.documentElement.dataset.planQuery;
  }, []);

  return (
    <PlanBuilder
      {...rest}
      initialProgram={program === 'long' || program === 'short' ? program : defaultProgram}
      initialSchool={school}
      initialPeriod={positiveInt(searchParams.get('period'))}
      initialStay={positiveInt(searchParams.get('stay'))}
      syncUrl
    />
  );
}
