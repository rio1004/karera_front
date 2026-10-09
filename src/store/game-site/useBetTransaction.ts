import { create } from "zustand";
import type { BetTransactionTypes } from "../types/game-site/betTransactionTypes";

export const useBetTransactions = create<BetTransactionTypes>((set) => ({
  showSideBar: false,
  setShowSidebar: (value: boolean) => set({ showSideBar: value }),
}));
