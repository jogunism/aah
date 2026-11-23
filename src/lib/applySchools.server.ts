// 신청서 학교 목록(서버): 가격이 있는 학교만, 장기·단기 제공 여부와 함께. /apply와 포털 신청서 수정이 같이 씀
import { getSchools } from '@/api/server';
import { getServerCurrency } from '@/lib/currency.server';
import type { ApplySchool } from '@/components/portal/ApplyForm';
import type { University } from '@/types/constants';

// Same rule as the plan builder: pricing for the program, or a legacy price above 0
const offers = (u: University, program: 'long' | 'short') =>
  u.pricing ? !!u.pricing[program] : (program === 'short' ? u.priceShort : u.priceLong) > 0;

export const getApplySchools = async (lang: string): Promise<ApplySchool[]> =>
  (await getSchools(await getServerCurrency(lang))).map((u) => ({
    id: u.id,
    title: u.title,
    long: offers(u, 'long'),
    short: offers(u, 'short'),
  }));
