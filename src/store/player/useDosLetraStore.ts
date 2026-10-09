import { create } from "zustand";
import type { DosLetraStoreTypes, Winner } from "../types/player/dosletra";
import { UI_COLORS } from "@/constant/colors";

export const useDosLetraStore = create<DosLetraStoreTypes>((set) => ({
  betState: "Closed",
  betColor: "success",
  betBtnBgColor: UI_COLORS.LINEAR.green,
  countdown: 0,
  showHistory: false,
  showDrawer: false,
  betAmountA: 0,
  betAmountB: 0,
  betType: "",
  multiplier: 0,
  OddA: 0,
  OddB: 0,
  declaredWinner: "",
  topWinners: [],
  winnings: 0,
  netA: 0,
  netB: 0,
  showGiftDrawer: false,
  showBadgeDrawer: false,
  showLeaderBoard: false, 

  setShowLeaderBoard: (value: boolean) => set({ showLeaderBoard: value }),
  setShowBadgeDrawer: (value: boolean) => set({ showBadgeDrawer: value }),
  setShowGiftDrawer: (value: boolean) => set({ showGiftDrawer: value }),
  setWinnings: (value: number) => set({ winnings: value }),
  setTopWinners: (value: Winner[]) => set({ topWinners: value }),
  setDeclaredWinner: (value: string) => set({ declaredWinner: value }),
  setOddA: (value: number) => set({ OddA: value }),
  setOddB: (value: number) => set({ OddB: value }),
  setMultiplier: (value: number) => set({ multiplier: value }),
  setBetType: (value: string) => set({ betType: value }),
  setBetAmountA: (value: number) => set({ betAmountA: value }),
  setBetAmountB: (value: number) => set({ betAmountB: value }),
  setShowDrawer: (value: boolean) => set({ showDrawer: value }),
  setShowHistory: (value: boolean) => set({ showHistory: value }),
  setBetBtnBgColor: (value: string) => set({ betBtnBgColor: value }),
  setBetColor: (value: string) => set({ betColor: value }),
  setBetState: (value: string) => set({ betState: value }),
  setCountdown: (value: number) => set({ countdown: value }),
  setNetA: (value: number) => set({ netA: value }),
  setNetB: (value: number) => set({ netB: value }),
  resetGame: () => {
    set({
      countdown: 0,
    });
  },
}));
