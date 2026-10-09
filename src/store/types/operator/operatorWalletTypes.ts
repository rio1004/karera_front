export type OpWallet = {
  balance: string;
  totalCredits: number;
  totalDebits: number;
  transactionCount: number;
};

export interface OperatorWalletTypes {
  showSendDrawer: boolean;
  setShowSendDrawer: (value: boolean) => void;
  showSendPin: boolean;
  setShowSendPin: (value: boolean) => void;
  totalBalance: number;
  setTotalBalance: (value: number) => void;

  wallets: {
    game: OpWallet;
    commission: OpWallet;
    load: OpWallet;
  };
  setWallets: (wallets: OperatorWalletTypes["wallets"]) => void;
  updateWallet: (
    type: keyof OperatorWalletTypes["wallets"],
    data: Partial<OpWallet>
  ) => void;
}
