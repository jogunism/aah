import { create } from 'zustand';
import type { Currency } from '@/lib/currency';

export type { Currency };

interface CurrencyState {
  currency: Currency;
  ready: boolean; // true once CurrencySelector has applied the cookie / locale default
  setCurrency: (currency: Currency) => void;
}

export const useCurrencyStore = create<CurrencyState>(set => ({
  currency: 'EUR',
  ready: false,
  setCurrency: currency => {
    document.documentElement.dataset.cur = currency; // see globals.css price placeholders
    set({ currency, ready: true });
  },
}));
