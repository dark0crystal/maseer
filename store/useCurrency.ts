import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CurrencyState {
  currency: string;
  exchangeRates: Record<string, number>;
  setCurrency: (newCurrency: string) => Promise<void>;
  convertPrice: (amount: number) => number;
}

export const useCurrencyStore = create<CurrencyState>((set, get) => ({
  currency: 'USD',

  // Fixed exchange rates (set manually)
  exchangeRates: {
    USD: 1,     // Base currency
    OMR: 0.385, // 1 USD = 0.385 OMR
    EUR: 0.92,  // 1 USD = 0.92 EUR
    GBP: 0.79   // 1 USD = 0.79 GBP
  },

  setCurrency: async (newCurrency) => {
    await AsyncStorage.setItem('currency', newCurrency);
    set({ currency: newCurrency });
  },

  convertPrice: (amount) => {
    const { exchangeRates, currency } = get();
    return (amount * exchangeRates[currency]).toFixed(2);
  }
}));
