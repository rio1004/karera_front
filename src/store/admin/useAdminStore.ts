import { create } from "zustand";
import type { ReportState } from "../types/admin/reportsTypes";


export const useReportStore = create<ReportState>((set) => ({
  gameReportData: [],
  gameCurrentPage: 1,
  gameRowsPerPage: 20,
  setGameReportData: (data) => set({ gameReportData: data }),
  setGameCurrentPage: (page) => set({ gameCurrentPage: page }),
  setGameRowsPerPage: (rows) => set({ gameRowsPerPage: rows, gameCurrentPage: 1 }),
  
  transactionReportData: [],
  transactionCurrentPage: 1,
  transactionRowsPerPage: 20,
  setTransactionReportData: (data) => set({ transactionReportData: data }),
  setTransactionCurrentPage: (page) => set({ transactionCurrentPage: page }),
  setTransactionRowsPerPage: (rows) => set({ transactionRowsPerPage: rows, transactionCurrentPage: 1 }),
}));