import type { GetMethodBaseQueryParams } from "@/types";

export interface TransactionReport extends Record<string, unknown> {
  transactionId: string;
  operatorIdTicketNo: string;
  game: string;
  site: string;
  dateOnly: string;
  dateCreated: string;
  matchId: string;
  gameRoundNo: string;
  transactionType: string;
  betAmount: number;
  transactionAmount: number;
  betBall: string;
  odds: number;
  winAmount: number;
  loseAmount: number;
  serviceFee: number;
  player: string;
  playerType: string;
  from: string;
  to: string;
  operatorRepresentative: string;
  operatorRepresentativeRole: string;
  operatorRepresentativeType: string;

  [key: string]: string | number | unknown;
}

export interface TransactionGGRReport {
  date: string;
  betAmount: number;
  winAmount: number;
  ggr: number;
  month: string;
  week: string;
  pagcorShare: number;
  auditFee: number;
}
export interface TransactionGGRReportResponse {
  rows: TransactionGGRReport[];
  totals: {
    betAmount: number;
    winAmount: number;
    ggr: number;
    pagcorShare: number;
    auditFee: number;
  };
  period: string;
}

export interface GameReport {
  gameName: string;
  matchId: number;
  totalBets: number;
  totalWins: number;
  serviceFee: number;
  createdAt: string;

  [key: string]: string | number | unknown;
}

export interface ReportState {
  gameReportData: GameReport[];
  gameCurrentPage: number;
  gameRowsPerPage: number;
  setGameReportData: (data: GameReport[]) => void;
  setGameCurrentPage: (page: number) => void;
  setGameRowsPerPage: (rows: number) => void;

  transactionReportData: TransactionReport[];
  transactionCurrentPage: number;
  transactionRowsPerPage: number;
  setTransactionReportData: (data: TransactionReport[]) => void;
  setTransactionCurrentPage: (page: number) => void;
  setTransactionRowsPerPage: (rows: number) => void;
}

export interface TransactionState {
  transactions: TransactionReport[];
  transactionsData: TransactionReport[];
  isLoading: boolean;
  isCurrentlyFetching: boolean;
  totalRows: number;
  limit: number;
  offset: number;

  transactionCurrentPage: number;
  transactionRowsPerPage: number;

  currentSearchQuery: string;

  selectedTransaction: TransactionReport | null;
  isDialogOpen: boolean;

  setSelectedTransaction: (transaction: TransactionReport | null) => void;
  setTransactionsData: (data: TransactionReport[]) => void;
  setTransactionRowsPerPage: (rows: number) => void;
  setTransactionCurrentPage: (page: number) => void;
  setIsDialogOpen: (open: boolean) => void;

  setCurrentSearchQuery: (searchQuery: string) => void;

  fetchTransactions: (params?: GetMethodBaseQueryParams) => Promise<{
    transactions: TransactionReport[];
    totalRows: number;
    limit: number;
    offset: number;
  }>;

  goToPage: (page: number) => Promise<void>;
  nextPage: () => Promise<void>;
  prevPage: () => Promise<void>;
}
