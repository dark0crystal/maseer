import { create } from "zustand";
interface ReservationState {
  dates: { start: string; end: string } | null;
  setDates: (dates: { start: string; end: string } | null) => void;
}

export const useReservationStore = create<ReservationState>((set) => ({
  dates: null,
  setDates: (dates) => set({ dates }),
}));
