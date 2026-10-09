import type {
  TransactionReport,
  TransactionGGRReportResponse,
} from "@/store/types/admin/reportsTypes";
import { axiosInstance } from "../axiosInstance";
import { API_ENDPOINTS } from "../endpoints";
import type { GetMethodBaseQueryParams } from "@/types";
import { buildParams } from "@/utils/buildParams";

import axios from "axios";

export const AdminService = {
  getTransactions: async (params: GetMethodBaseQueryParams) => {
    const res = await axiosInstance.get<{
      transactions: TransactionReport[];
      totalRows: number;
      limit: number;
      offset: number;
    }>(API_ENDPOINTS.ADMIN.TRANSACTIONS, {
      params: buildParams(params),
    });
    return res.data;
  },

  getArchiveTransactions: async (params: GetMethodBaseQueryParams) => {
    const res = await axios.get<{
      transactions: TransactionReport[];
      total: number;
      limit: number;
      offset: number;
    }>(`/archive/transactions`, {
      params: buildParams(params),
    });
    return res.data;
  },

  getTransactionGGRReport: async (params: GetMethodBaseQueryParams) => {
    const res = await axiosInstance.get<TransactionGGRReportResponse>(
      API_ENDPOINTS.ADMIN.REPORT,
      {
        params: buildParams(params),
      }
    );
    return res.data;
  },

  //   updateUser: async (id: string, type: USER_TYPE) => {
  //     const res = await axiosInstance.patch<{ user: User }>(
  //       `${API_ENDPOINTS.USERS.UPDATE}/${id}`,
  //       { type }
  //     );
  //     return res.data;
  //   },
};
