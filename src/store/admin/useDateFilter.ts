import { create } from "zustand";

interface DateFilterState {
  startDate: Date | null;
  endDate: Date | null;
  setDateRange: (start: Date | null, end: Date | null) => void;
}

export const useDateFilter = create<DateFilterState>((set) => ({
  startDate: null,
  endDate: null,
  setDateRange: (start, end) => set({ startDate: start, endDate: end }),
}));
