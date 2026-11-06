// 서버 렌더링용 API 호출(요청 단위 중복 제거 + 서버 인스턴스에서 몇 분간 결과 재사용)
import { cache } from 'react';
import { retrieveUniversityList, retrieveAppVersion } from '@/api';
import http from '@/lib/http';
import type { Prices, University } from '@/types/constants';
import type { Currency } from '@/lib/currency';

/**
 * Server-side data helpers.
 * - React `cache` de-duplicates calls within one request, so several sections
 *   of a page share a single API call.
 * - `remember` keeps a successful result in the server instance for a few
 *   minutes, so page navigations don't wait for the API (Lambda) every time.
 *   Prices follow exchange rates refreshed every few hours, so a short delay is fine.
 *   Empty / failed results are not kept.
 */
const TTL_MS = 5 * 60 * 1000;
const memo = new Map<string, { at: number; value: unknown }>();

const remember = async <T>(key: string, load: () => Promise<T>, ok: (v: T) => boolean): Promise<T> => {
  const hit = memo.get(key);
  if (hit && Date.now() - hit.at < TTL_MS) return hit.value as T;
  const value = await load();
  if (ok(value)) memo.set(key, { at: Date.now(), value });
  return value;
};

export const getUniversities = cache(() =>
  remember('universities', () => retrieveUniversityList(), (list) => list.length > 0),
);

export const getAppVersion = cache(() =>
  remember('version', () => retrieveAppVersion(), (v) => !!v),
);

/**
 * Min/max program prices in the given currency. The API reads the `currency`
 * cookie, so pass it explicitly on server requests.
 */
export const getPrices = cache((currency: Currency) =>
  remember(
    `prices:${currency}`,
    async (): Promise<Prices | null> => {
      try {
        const res = await http.get<Prices>('/university/prices', {
          headers: { Cookie: `currency=${currency}` },
        });
        return res.data;
      } catch (error) {
        console.error('Error fetching prices:', error);
        return null;
      }
    },
    (p) => !!p,
  ),
);

/**
 * All schools (universities + language schools) with prices in the given currency.
 */
export const getSchools = cache((currency: Currency) =>
  remember(
    `schools:${currency}`,
    async (): Promise<University[]> => {
      try {
        const res = await http.get<University[]>('/university/list', {
          params: { schoolType: 'all' },
          headers: { Cookie: `currency=${currency}` },
        });
        return res.data;
      } catch (error) {
        console.error('Error fetching school list:', error);
        return [];
      }
    },
    (list) => list.length > 0,
  ),
);

/**
 * Forward a browser request body to the API with the server-side token and
 * pass the API's status through. Used by the /api route handlers so the token
 * never reaches the browser.
 */
export const forward = async (req: Request, method: 'post' | 'delete', url: string): Promise<Response> => {
  let data: unknown;
  try {
    data = await req.json();
  } catch {
    return Response.json({ message: 'Invalid JSON' }, { status: 400 });
  }
  try {
    const res = await http.request({ method, url, data, validateStatus: () => true });
    return Response.json(res.data, { status: res.status });
  } catch (error) {
    console.error(`Error forwarding ${method.toUpperCase()} ${url}:`, error);
    return Response.json({ message: 'Upstream error' }, { status: 502 });
  }
};
