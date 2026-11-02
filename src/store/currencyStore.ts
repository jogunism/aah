import { create } from 'zustand';

export type Currency = 'EUR' | 'USD';

interface CurrencyState {
  currency: Currency;
  ready: boolean; // true once CurrencySelector has applied the cookie / locale default
  setCurrency: (currency: Currency) => void;
}

export const useCurrencyStore = create<CurrencyState>(set => ({
  currency: 'EUR',
  ready: false,
  setCurrency: currency => set({ currency, ready: true }),
}));
