import { create } from 'zustand';

export type Currency = 'EUR' | 'USD';

interface CurrencyState {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
}

export const useCurrencyStore = create<CurrencyState>(set => ({
  currency: 'EUR',
  setCurrency: currency => set({ currency }),
}));
