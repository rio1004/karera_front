import { create } from "zustand";
import type { WalletTypes } from "../types/player/walletTypes";

export const useWalletStore = create<WalletTypes>((set) => ({
  showDrawer: false,
  setShowDrawer: (value: boolean) => set({ showDrawer: value }),
  showGenerateQR: false,
  setShowGenerateQR: (value: boolean) => set({ showGenerateQR: value }),
  showSupportedBank: false,
  setShowSupportedBank: (value: boolean) => set({ showSupportedBank: value }),
  depositAmount: 0,
  setDepositAmount: (value: number) => set({ depositAmount: value }),
  walletBalance: 0,
  setWalletBalance: (value: number) => set({ walletBalance: value }),
  showConfirmWithdraw: false,
  setShowConfirmWithdraw: (value: boolean) =>
    set({ showConfirmWithdraw: value }),
  isWithdrawalSuccess: false,
  setIswithdrawalSuccess: (value: boolean) =>
    set({ showConfirmWithdraw: value }),
  showWalletPin: false,
  setShowWalletPin: (value: boolean) => set({ showWalletPin: value }),
  isWithdrawSubmitted: false,
  setIsWithdrawSubmitted: (value: boolean) =>
    set({ isWithdrawSubmitted: value }),
  showSuccessPin: false,
  setShowSuccessPin: (value: boolean) => set({ showSuccessPin: value }),
  showSuccessUpdatePin: false,
  setShowSuccessUpdatePin: (value: boolean) =>
    set({ showSuccessUpdatePin: value }),
  isPinVerified: false,
  setIsPinVerified: (value: boolean) => set({ isPinVerified: value }),
  hasActivePin: false,
  setHasActivePin: (value: boolean) => set({ hasActivePin: value }),
  pins: ["", "", "", ""],
  setPins: (value: string[]) => set({ pins: value }),
  walletTab: "deposit",
  setWalletTab: (value: "deposit" | "withdraw") => set({ walletTab: value }),
}));
