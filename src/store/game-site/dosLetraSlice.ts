import type { StateCreator } from "zustand";
import type { DosLetraSlice, BetItem, BetType } from "../types/game-site/dosLetraTypes";
import type { TicketResponse } from "@/types";

export const createDosLetraSlice: StateCreator<DosLetraSlice> = (set, get) => ({
  betList: [],
  setBetList: (bets: BetItem[]) => set({ betList: bets }),
  addBetList: (bet: BetItem) =>
    set((state) => {
      const updated = [...state.betList, bet];
      return {
        betList: updated,
      };
    }),
  removeBetList: (id: string) =>
    set((state) => {
      const updated = state.betList.filter((bet) => bet.id !== id);
      return {
        betList: updated,
        showPayment: updated.length > 0,
      };
    }),
  betAmount: 0,
  setBetAmount: (value: number) => set({ betAmount: value }),
  betType: "",
  setBetType: (value: BetType) => set({ betType: value }),
  ball: "",
  setBall: (value: string) => set({ ball: value }),
  rounds: 1,
  setRounds: (value: number) => set({ rounds: value }),
  isDisabled: false,
  setIsDisabled: (value: boolean) => set({ isDisabled: value }),
  paymentAmount: 0,
  setPaymentAmount: (value: number) => set({ paymentAmount: value }),
  totalBetAmount: 0,
  setTotalBetAmount: (value: number) => set({ totalBetAmount: value }),
  showPayment: false,
  setShowPayment: (value: boolean) => set({ showPayment: value }),
  showConfirmModal: false,
  setShowConfirmModal: (value: boolean) => set({ showConfirmModal: value }),
  showPrintReceipt: false,
  setShowPrintReceipt: (value: boolean) => set({ showPrintReceipt: value }),
  confirmDisable: false,
  setConfirmDisable: (value: boolean) => set({ confirmDisable: value }),
  showSidebar: false,
  setShowSidebar: (value: boolean) => set({ showSidebar: value }),
  ticketData: null,
  setTicketData: (value: TicketResponse["ticket"]) =>
    set({ ticketData: value }),
  changeAmount: () => get().paymentAmount - get().totalBetAmount,
});
