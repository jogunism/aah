// 브라우저에서 같은 출처의 /api 프록시로 통화별 가격·학교 목록을 불러오는 함수
import type { Prices, University } from '@/types/constants';

type Currency = 'USD' | 'EUR';

export const fetchPrices = async (currency: Currency): Promise<Prices | null> => {
  try {
    const res = await fetch(`/api/prices?currency=${currency}`);
    return res.ok ? await res.json() : null;
  } catch {
    return null;
  }
};

export const fetchSchools = async (currency: Currency): Promise<University[]> => {
  try {
    const res = await fetch(`/api/schools?currency=${currency}`);
    return res.ok ? await res.json() : [];
  } catch {
    return [];
  }
};
