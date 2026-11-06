// 서버 렌더링 시 사용할 통화(쿠키 우선, 없으면 언어 기본 통화) 결정
import { cookies } from 'next/headers';
import { LOCALE_META, isSupportedLocale } from '@/lib/locales';
import { isCurrency, type Currency } from '@/lib/currency';

/** Currency for server rendering: the visitor's cookie, else the locale default. */
export async function getServerCurrency(lang: string): Promise<Currency> {
  try {
    const c = (await cookies()).get('currency')?.value;
    if (isCurrency(c)) return c;
  } catch {
    // outside a request scope (static generation) → fall back to the locale default
  }
  return isSupportedLocale(lang) ? LOCALE_META[lang].currency : 'USD';
}
