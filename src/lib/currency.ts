// 사이트에서 쓰는 통화 목록·기호·검사 함수(서버·클라이언트 공용)

export const CURRENCIES = ['USD', 'EUR', 'GBP'] as const;
export type Currency = (typeof CURRENCIES)[number];

export const CURRENCY_SYMBOL: Record<Currency, string> = { USD: '$', EUR: '€', GBP: '£' };

export const isCurrency = (value: string | null | undefined): value is Currency =>
  CURRENCIES.includes(value as Currency);

/**
 * A fixed euro amount (our service fee, refunds) in another currency: same rule as the
 * API's service fee conversion (tuition.service fromEur) – rounded to the nearest 10.
 */
export const fromEur = (eur: number, perEur: number) => (perEur === 1 ? eur : Math.round((eur * perEur) / 10) * 10);
