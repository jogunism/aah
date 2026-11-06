'use client';
// URL 쿼리(program, school)를 브라우저에서 읽어 플랜 빌더에 넘기는 래퍼(페이지를 정적 캐시로 두기 위함)

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import PlanBuilder from '@/components/plan/PlanBuilder';
import type { University } from '@/types/constants';
import type { Currency } from '@/lib/currency';

export default function PlanBuilderFromQuery(props: {
  lang: string;
  initial: University[];
  initialCurrency: Currency;
}) {
  const searchParams = useSearchParams();

  // The query is applied now: lift the pre-paint placeholder (see layout PRE_PAINT_SCRIPT)
  useEffect(() => {
    delete document.documentElement.dataset.planQuery;
  }, []);

  return (
    <PlanBuilder
      {...props}
      initialProgram={searchParams.get('program') === 'long' ? 'long' : 'short'}
      initialSchool={searchParams.get('school') ?? undefined}
    />
  );
}
