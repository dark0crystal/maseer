import { create } from 'zustand';
import { z } from 'zod';

// Zod schemas for validation
export const DateSchema = z.object({
  startDate: z.date(),
  endDate: z.date()
});

export const GuestSchema = z.object({
  numberOfGuests: z.number().min(1, "At least one guest is required"),
  phoneNumber: z.string().min(10, "Valid phone number is required")
});

interface ReservationState {
  selectedDates: {
    startDate: Date | null;
    endDate: Date | null;
  };
  numberOfGuests: number;
  phoneNumber: string;
  totalPrice: number;
  activityDetails: any;
  setSelectedDates: (dates: { startDate: Date | null; endDate: Date | null }) => void;
  setNumberOfGuests: (count: number) => void;
  setPhoneNumber: (phone: string) => void;
  setActivityDetails: (details: any) => void;
  calculateTotalPrice: () => void;
  resetReservation: () => void;
  setTotalPrice: (price: number) => void;
}

export const useReservationStore = create<ReservationState>((set, get) => ({
  selectedDates: {
    startDate: null,
    endDate: null
  },
  numberOfGuests: 1,
  phoneNumber: '',
  totalPrice: 0,
  activityDetails: null,

  setSelectedDates: (dates) => {
    set({ selectedDates: dates });
    get().calculateTotalPrice();
  },
  
  setNumberOfGuests: (count) => {
    set({ numberOfGuests: count });
    get().calculateTotalPrice();
  },
  
  setPhoneNumber: (phone) => set({ phoneNumber: phone }),
  
  setActivityDetails: (details) => {
    set({ activityDetails: details });
    get().calculateTotalPrice();
  },
  
  calculateTotalPrice: () => {
    const { numberOfGuests, activityDetails, selectedDates } = get();
    const basePrice = parseFloat(activityDetails?.price || '0');
    
    if (selectedDates.startDate && selectedDates.endDate) {
      const oneDay = 1000 * 60 * 60 * 24;
      const numberOfDays = Math.max(
        Math.ceil((selectedDates.endDate.getTime() - selectedDates.startDate.getTime()) / oneDay),
        1
      );
      set({ totalPrice: basePrice * numberOfGuests * numberOfDays });
    } else {
      set({ totalPrice: basePrice * numberOfGuests });
    }
  },
  
  resetReservation: () => set({
    selectedDates: { startDate: null, endDate: null },
    numberOfGuests: 1,
    phoneNumber: '',
    totalPrice: 0,
    activityDetails: null
  }),
  
  setTotalPrice: (price) => set({ totalPrice: price })
}));
