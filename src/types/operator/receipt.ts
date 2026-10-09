export interface SendCreditsData {
  creditAmount: string;
  sendUsing: string;
  mobileNumber: string;
  agreeToTerms: boolean;
}

export type Transaction = {
  id: string;
  userId: string;
  gameId?: string;
  receiverId: string;
  type: "deposit" | "withdraw" | "sendMoney" | "bet" | "gift"
  amount: string | number;
  status: "in progress" | "completed" | string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

// Transaction Receipt Component
export interface TransactionData {
  paymentMethod?: string;
  accountNo?: string;
  transactionType?: string;
  transactionNo?: string | number;
  dateAndTime?: string;
  status?: string;
  amount?: string;
  previousBalance?: string;
  loadAmount?: string;
  withdrawalAmount?: string;
  sendCreditsAmount?: string;
  updatedBalance?: string;
  updatedAt?: string;
  bankOrEwallet?: string;
  
  gameId?: string;
  gameName?: string;
  gameRound?: string;
  betChoice?: string;
  betOdds?: string;
  winAmount?: string;
  betAmount?: string;
  
  giftAmount?: string;
}

export interface TransactionReceiptProps {
  icon: React.ReactNode;
  label: string;
  amount: string;
  amountColor?: "green" | "red" | "orange" | "blue";
  amountPrefix?: "+" | "-" | "";
  transactionData: TransactionData;
  onDownloadReceipt?: () => void;
  onClose?: () => void;
}
export interface RecentTransactionsProps {
  transactions: Transaction[];
  userID: string;
  returnPositiveOrNegative: (transaction: Transaction) => string;
  formatNumber: (value: string) => string;
  walletBalance: number;
  maxItems?: number; 
  showViewAll?: boolean; 
  onTransactionClick: (transaction: Transaction) => void;
}
