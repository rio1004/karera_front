import { UserService } from "@/api/services/userApi.service";
import type { Transaction } from "@/types/operator/transaction";
import { create } from "zustand";

interface Bet {
  id: number;
  transactionId: number;
  choice: string;
  amount: string;
  winAmount: string;
  odds: string;
  meta: {
    updatedBalance: number;
    previousBalance: number;
  };
  gameSessionId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

interface Game {
  id: number;
  name: string;
  choices: string[];
  commission: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

interface GameSession {
  id: number;
  gameId: number;
  round: string;
  roomId: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

// Extend the existing TransactionDetailResponse or create a new one if it doesn't exist
interface ExtendedTransactionDetailResponse {
  transaction: Transaction;
  bet?: Bet;
  game?: Game;
  gameSession?: GameSession;
}

interface TransactionFilters {
  limit?: number;
  type?: string;
  startDate?: string;
  endDate?: string;
}

interface PlayerTransactionStore {
  transactions: Transaction[];
  selectedTransactionDetail: ExtendedTransactionDetailResponse | null;
  loading: boolean;
  loadingTransaction: boolean;
  error: string | null;
  transactionError: string | null;
  totalAmount: number;
  count: number;
  filters: TransactionFilters;

  fetchTransactions: () => Promise<void>;
  getTransactionById: (id: string) => Promise<void>;
  setFilters: (filters: TransactionFilters) => void;
  clearTransactions: () => void;
  clearSelectedTransaction: () => void;
  resetError: () => void;
  resetTransactionError: () => void;
}

export const usePlayerTransactionStore = create<PlayerTransactionStore>(
  (set, get) => ({
    transactions: [],
    selectedTransactionDetail: null,
    loading: false,
    loadingTransaction: false,
    error: null,
    transactionError: null,
    totalAmount: 0,
    count: 0,
    filters: { limit: 50 },

    fetchTransactions: async () => {
      const { filters } = get();

      set({ loading: true, error: null });

      try {
        const params: any = {
          limit: filters.limit || 50,
        };

        if (filters.type && filters.type !== "all") {
          params.type = filters.type;
        }

        if (filters.startDate) {
          params.startDate = filters.startDate;
        }

        if (filters.endDate) {
          params.endDate = filters.endDate;
        }

        const response = await UserService.GetTransactionPlayer(params);

        set({
          transactions: response.transactions || [],
          totalAmount: response.totalAmount || 0,
          count: response.count || 0,
          loading: false,
          error: null,
        });
      } catch (error: any) {
        set({
          transactions: [],
          totalAmount: 0,
          count: 0,
          loading: false,
          error: error?.message || "Failed to fetch transactions",
        });
      }
    },

    getTransactionById: async (id: string) => {
      set({ loadingTransaction: true, transactionError: null });

      try {
        const response = await UserService.GetTransactionById(id);
        set({
          selectedTransactionDetail:
            response as ExtendedTransactionDetailResponse,
          loadingTransaction: false,
          transactionError: null,
        });
      } catch (error: any) {
        set({
          selectedTransactionDetail: null,
          loadingTransaction: false,
          transactionError: error?.message || "Failed to fetch transaction",
        });
      }
    },

    setFilters: (newFilters: TransactionFilters) => {
      set((state) => ({
        filters: { ...state.filters, ...newFilters },
      }));
      get().fetchTransactions();
    },

    clearTransactions: () => {
      set({
        transactions: [],
        totalAmount: 0,
        count: 0,
        error: null,
      });
    },

    clearSelectedTransaction: () => {
      set({
        selectedTransactionDetail: null,
        transactionError: null,
      });
    },

    resetError: () => {
      set({ error: null });
    },

    resetTransactionError: () => {
      set({ transactionError: null });
    },
  })
);
