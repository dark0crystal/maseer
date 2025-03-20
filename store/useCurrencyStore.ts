import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CurrencyState {
  currency: string;
  exchangeRates: Record<string, number>;
  setCurrency: (newCurrency: string) => Promise<void>;
  convertPrice: (amount: number) => number;
}

export const useCurrencyStore = create<CurrencyState>((set, get) => ({
  currency: 'OMR',

  // Fixed exchange rates with OMR as the base currency
  exchangeRates: {
    OMR: 1,       // Base currency
    USD: 1 / 0.385, // 1 OMR = ~2.60 USD
    EUR: 2.40,    // 1 OMR = 2.40 EUR (adjust manually if needed)
    GBP: 2.05     // 1 OMR = 2.05 GBP (adjust manually if needed)
  },

  setCurrency: async (newCurrency) => {
    await AsyncStorage.setItem('currency', newCurrency);
    set({ currency: newCurrency });
  },

  convertPrice: (amount) => {
    const { exchangeRates, currency } = get();
    return parseFloat((amount * exchangeRates[currency]).toFixed(2)); // ✅ Fix applied
  }
}));
