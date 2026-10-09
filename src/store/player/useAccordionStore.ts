import { create } from "zustand";

type AccordionState = {
  openItem: string | null;
  setOpenItem: (item: string | null) => void;
};

export const useAccordionStore = create<AccordionState>((set) => ({
  openItem: null,
  setOpenItem: (item) => set({ openItem: item }),
}));
