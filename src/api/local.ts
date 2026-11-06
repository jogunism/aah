// 브라우저에서 같은 출처의 /api 프록시로 통화별 가격·학교 목록을 불러오는 함수
import type { Contactus, Prices, University } from '@/types/constants';
import type { Currency } from '@/lib/currency';

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

// Form submissions go through the /api route handlers, which add the API token on the server
const send = async (path: string, body: unknown): Promise<void> => {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`${path} failed with ${res.status}`);
};

export const sendContactUs = (formValues: Contactus) => send('/api/contact', formValues);

export const subscribeMailingList = (email: string, lang: string) =>
  send('/api/subscribe', { email, lang });

export const cancelSubscription = (email: string, lang: string) =>
  send('/api/unsubscribe', { email, lang });
