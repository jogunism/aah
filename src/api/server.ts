// 서버 렌더링용 API 호출(요청 단위 캐시로 중복 호출 방지)
import { cache } from 'react';
import { retrieveUniversityList } from '@/api';
import http from '@/lib/http';
import type { Prices } from '@/types/constants';

/**
 * Server-side data helpers, de-duplicated per request with React `cache`,
 * so several sections of one page share a single API call.
 */
export const getUniversities = cache(() => retrieveUniversityList());
export const getAllSchools = cache(() => retrieveUniversityList('all'));

/**
 * Min/max program prices in the given currency. The API reads the `currency`
 * cookie, so pass it explicitly on server requests.
 */
export const getPrices = cache(async (currency: 'USD' | 'EUR'): Promise<Prices | null> => {
  try {
    const res = await http.get<Prices>('/university/prices', {
      headers: { Cookie: `currency=${currency}` },
    });
    return res.data;
  } catch (error) {
    console.error('Error fetching prices:', error);
    return null;
  }
});
