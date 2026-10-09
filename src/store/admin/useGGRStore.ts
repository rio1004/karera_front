import { AdminService } from '@/api/services/transactionApi.service';
import type { GetMethodBaseQueryParams } from '@/types';
import { create } from 'zustand';
import type { TransactionGGRReport } from '../types/admin/reportsTypes';

interface GGRReportTotals {
  betAmount: number;
  winAmount: number;
  ggr: number;
  pagcorShare: number;
  auditFee: number;
}

interface GGRReportState {
  // Data
  ggrReportData: TransactionGGRReport[];
  totalRows: number;
  totals: GGRReportTotals | null;
  
  // Loading state
  isLoading: boolean;
  isCurrentlyFetching: boolean;
  
  // Search
  currentSearchQuery: string;
  
  // Actions
  setGgrReportData: (data: TransactionGGRReport[]) => void;
  setCurrentSearchQuery: (query: string) => void;
  calculateTotals: () => GGRReportTotals | null;
  fetchGgrReport: (params?: GetMethodBaseQueryParams) => Promise<{
    rows: TransactionGGRReport[];
    totalRows: number;
  }>;
}

export const useGgrReportStore = create<GGRReportState>((set, get) => ({
  // Initial state
  ggrReportData: [],
  totalRows: 0,
  totals: null,
  isLoading: false,
  isCurrentlyFetching: false,
  currentSearchQuery: '',
  
  // Setters
  setGgrReportData: (rows) => {
    set({ ggrReportData: rows });
    // Recalculate totals when data changes
    get().calculateTotals();
  },
  
  setCurrentSearchQuery: (query) => set({ currentSearchQuery: query }),
  
  // Calculate totals from current data
  calculateTotals: () => {
    const { ggrReportData } = get();
    
    if (ggrReportData.length === 0) {
      set({ totals: null });
      return null;
    }
    
    const calculatedTotals = ggrReportData.reduce((acc, row) => ({
      betAmount: acc.betAmount + (Number(row.betAmount) || 0),
      winAmount: acc.winAmount + (Number(row.winAmount) || 0),
      ggr: acc.ggr + (Number(row.ggr) || 0),
      pagcorShare: acc.pagcorShare + (Number(row.pagcorShare) || 0),
      auditFee: acc.auditFee + (Number(row.auditFee) || 0),
    }), {
      betAmount: 0,
      winAmount: 0,
      ggr: 0,
      pagcorShare: 0,
      auditFee: 0,
    });
    
    set({ totals: calculatedTotals });
    return calculatedTotals;
  },
  
  // Fetch function
  fetchGgrReport: async (params: GetMethodBaseQueryParams = {}) => {
    const { isCurrentlyFetching, currentSearchQuery } = get();
    
    if (isCurrentlyFetching) {
      return {
        rows: [],
        totalRows: 0,
      };
    }

    set({ isLoading: true, isCurrentlyFetching: true });

    try {
      const mergedParams: GetMethodBaseQueryParams = {
        ...(currentSearchQuery && { searchQuery: currentSearchQuery }),
        ...params,
      };

      const response = await AdminService.getTransactionGGRReport(mergedParams);

      const {
        rows = [],
        totals: apiTotals,
      } = response;

      set({
        ggrReportData: rows,
        totalRows: rows.length,
        totals: apiTotals ? {
          betAmount: Number(apiTotals.betAmount) || 0,
          winAmount: Number(apiTotals.winAmount) || 0,
          ggr: Number(apiTotals.ggr) || 0,
          pagcorShare: Number(apiTotals.pagcorShare) || 0,
          auditFee: Number(apiTotals.auditFee) || 0,
        } : null,
      });

      // If no API totals provided, calculate from data
      if (!apiTotals && rows.length > 0) {
        get().calculateTotals();
      }

      return {
        rows,
        totalRows: rows.length,
      };
    } catch (error) {
      console.error('[GGR Report Store] Fetch failed', error);

      const errorResult = {
        rows: [],
        totalRows: 0,
      };

      set({
        ggrReportData: [],
        totalRows: 0,
        totals: null,
      });

      return errorResult;
    } finally {
      set({ isLoading: false, isCurrentlyFetching: false });
    }
  },
}));