// 서버 렌더링 시 사용할 통화(언어 기본 통화) 결정. 방문자가 고른 통화는 브라우저에서 다시 불러온다
import { LOCALE_META, isSupportedLocale } from '@/lib/locales';
import type { Currency } from '@/lib/currency';

/**
 * Currency for server rendering: always the locale default, so pages can be
 * cached and shared by every visitor (no cookies). The visitor's own choice is
 * applied on the client (LivePrice, SchoolPrices, PlanBuilder refetch).
 */
export async function getServerCurrency(lang: string): Promise<Currency> {
  return isSupportedLocale(lang) ? LOCALE_META[lang].currency : 'USD';
}
