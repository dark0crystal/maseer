import { create } from "zustand";

interface ReservationState {
  dates: { start: Date; end: Date }[];
  setDates: (dates: { start: Date; end: Date }[]) => void;
}

export const useReservationStore = create<ReservationState>((set) => ({
  dates: [],
  setDates: (dates) => set({ dates }),
}));
