import { create } from "zustand";
import { AdminService } from "@/api/services/transactionApi.service";
import type { GetMethodBaseQueryParams } from "@/types";
import type { TransactionState } from "../types/admin/reportsTypes";

export const useArchiveTransactionStore = create<TransactionState>(
  (set, get) => ({
    transactions: [],
    transactionsData: [],
    isLoading: false,
    isCurrentlyFetching: false,
    totalRows: 0,
    limit: 10,
    offset: 0,

    transactionCurrentPage: 1,
    transactionRowsPerPage: 10,

    currentSearchQuery: "",

    selectedTransaction: null,
    isDialogOpen: false,

    setSelectedTransaction: (transaction) =>
      set({ selectedTransaction: transaction }),
    setTransactionsData: (data) => set({ transactionsData: data }),
    setIsDialogOpen: (open) => set({ isDialogOpen: open }),

    setCurrentSearchQuery: (searchQuery) => {
      set({ currentSearchQuery: searchQuery });
      if (get().transactionCurrentPage !== 1) {
        set({ transactionCurrentPage: 1, offset: 0 });
      }
    },

    setTransactionRowsPerPage: (rows) => {
      const { isCurrentlyFetching, currentSearchQuery } = get();
      if (isCurrentlyFetching) return;

      set({
        transactionRowsPerPage: rows,
        limit: rows,
        transactionCurrentPage: 1,
        offset: 0,
      });

      get().fetchTransactions({
        searchQuery: currentSearchQuery || undefined,
      });
    },

    setTransactionCurrentPage: (page) => {
      const { isCurrentlyFetching, limit, currentSearchQuery } = get();
      if (isCurrentlyFetching) return;

      const offset = (page - 1) * limit;
      set({ transactionCurrentPage: page, offset });

      get().fetchTransactions({
        searchQuery: currentSearchQuery || undefined,
      });
    },
    fetchTransactions: async (params: GetMethodBaseQueryParams = {}) => {
      const { isCurrentlyFetching, limit, offset, currentSearchQuery } = get();
      if (isCurrentlyFetching) {
        return {
          transactions: [],
          totalRows: 0,
          limit,
          offset,
        };
      }

      set({ isLoading: true, isCurrentlyFetching: true });

      try {
        const mergedParams: GetMethodBaseQueryParams = {
          limit,
          offset,
          ...(currentSearchQuery && { searchQuery: currentSearchQuery }),
          ...params,
        };

        const res = await AdminService.getArchiveTransactions(mergedParams);
        console.log(res, "RESULT")
        const {
          transactions = [],
          total: apiTotal,
          limit: apiLimit,
          offset: apiOffsetResp,
        } = res;

        set({
          transactions,
          transactionsData: transactions,
          totalRows: apiTotal ?? 0,
          limit: apiLimit ?? mergedParams.limit!,
          offset: apiOffsetResp ?? mergedParams.offset!,
        });

        return {
          transactions,
          totalRows: apiTotal ?? 0,
          limit: apiLimit ?? mergedParams.limit!,
          offset: apiOffsetResp ?? mergedParams.offset!,
        };
      } catch (err) {
        console.error("[Transaction Store] Fetch failed", err);

        const errorResult = {
          transactions: [],
          totalRows: 0,
          limit: params.limit ?? limit,
          offset: params.offset ?? offset,
        };

        set({
          transactions: [],
          transactionsData: [],
          totalRows: 0,
        });

        return errorResult;
      } finally {
        set({ isLoading: false, isCurrentlyFetching: false });
      }
    },

    goToPage: async (page: number) => {
      if (!page || isNaN(page)) return;

      const { limit, totalRows, currentSearchQuery } = get();
      const totalPages = Math.ceil(totalRows / limit);
      const newPage = Math.min(Math.max(page, 1), totalPages);
      const newOffset = (newPage - 1) * limit;

      set({ offset: newOffset, transactionCurrentPage: newPage });

      await get().fetchTransactions({
        searchQuery: currentSearchQuery || undefined,
      });
    },

    nextPage: async () => {
      const { offset, limit, totalRows, currentSearchQuery } = get();
      const totalPages = Math.ceil(totalRows / limit);
      const currentPage = Math.floor(offset / limit) + 1;
      if (currentPage >= totalPages) return;
      set({ offset: offset + limit, transactionCurrentPage: currentPage + 1 });
      await get().fetchTransactions({
        searchQuery: currentSearchQuery || undefined,
      });
    },

    prevPage: async () => {
      const { offset, limit, currentSearchQuery } = get();
      const currentPage = Math.floor(offset / limit) + 1;
      if (offset === 0) return;
      set({
        offset: Math.max(0, offset - limit),
        transactionCurrentPage: currentPage - 1,
      });
      await get().fetchTransactions({
        searchQuery: currentSearchQuery || undefined,
      });
    },
  })
);
