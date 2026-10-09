import { create } from "zustand";
import type { OperatorWalletTypes } from "../types/operator/operatorWalletTypes";

export const useOperatorWalletStore = create<OperatorWalletTypes>((set) => ({
  showSendDrawer: false,
  setShowSendDrawer: (value: boolean) => set({ showSendDrawer: value }),
  showSendPin: false,
  setShowSendPin: (value: boolean) => set({ showSendPin: value }),
  totalBalance: 0,
  setTotalBalance: (value: number) => set({ totalBalance: value }),
  wallets: {
    game: {
      balance: "0.0000",
      totalCredits: 0,
      totalDebits: 0,
      transactionCount: 0,
    },
    commission: {
      balance: "0.0000",
      totalCredits: 0,
      totalDebits: 0,
      transactionCount: 0,
    },
    load: {
      balance: "0.0000",
      totalCredits: 0,
      totalDebits: 0,
      transactionCount: 0,
    },
  },
  setWallets: (wallets) => set({ wallets }),
  updateWallet: (type, data) =>
    set((state) => ({
      wallets: {
        ...state.wallets,
        [type]: { ...state.wallets[type], ...data },
      },
    })),
}));
