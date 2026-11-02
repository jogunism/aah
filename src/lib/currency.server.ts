import { cookies } from 'next/headers';
import { LOCALE_META, isSupportedLocale } from '@/lib/locales';

/** Currency for server rendering: the visitor's cookie, else the locale default. */
export async function getServerCurrency(lang: string): Promise<'USD' | 'EUR'> {
  try {
    const c = (await cookies()).get('currency')?.value;
    if (c === 'USD' || c === 'EUR') return c;
  } catch {
    // outside a request scope (static generation) → fall back to the locale default
  }
  return isSupportedLocale(lang) ? LOCALE_META[lang].currency : 'USD';
}
