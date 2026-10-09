export type Winner = {
  winnings: number;
  firstName: string;
  lastName: string;
};

export interface DosLetraStoreTypes {
  betState: string;
  setBetState: (betState: string) => void;
  betColor: string;
  setBetColor: (betColor: string) => void;
  betBtnBgColor: string;
  setBetBtnBgColor: (betBgColor: string) => void;
  countdown: number;
  setCountdown: (countDown: number) => void;
  betAmountA: number;
  betAmountB: number;
  setBetAmountA: (betAmountA: number) => void;
  setBetAmountB: (betAmountB: number) => void;
  showHistory: boolean;
  setShowHistory: (showHistory: boolean) => void;
  showGiftDrawer: boolean;
  setShowGiftDrawer: (showHistory: boolean) => void;
  showBadgeDrawer: boolean;
  setShowBadgeDrawer: (showBadgeDrawer: boolean) => void;
  showLeaderBoard: boolean;
  setShowLeaderBoard: (showBadgeDrawer: boolean) => void;
  showDrawer: boolean;
  setShowDrawer: (showDrawer: boolean) => void;
  betType: string;
  setBetType: (betType: string) => void;
  multiplier: number;
  setMultiplier: (multiplier: number) => void;
  OddA: number;
  setOddA: (OddA: number) => void;
  OddB: number;
  setOddB: (OddB: number) => void;
  declaredWinner: string;
  setDeclaredWinner: (declaredWinner: string) => void;
  topWinners: Winner[];
  setTopWinners: (topWinners: Winner[]) => void;
  winnings: number;
  setWinnings: (winnings: number) => void;
  netA: number;
  setNetA: (netA: number) => void;
  netB: number;
  setNetB: (netB: number) => void;

  resetGame: () => void;
}
