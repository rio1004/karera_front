import type { Role } from "@/constant/roles";
import { axiosInstance } from "../axiosInstance";
import { API_ENDPOINTS } from "../endpoints";
import type { User } from "@/store/types/auth/UserTypes";
import type { GetMethodBaseQueryParams } from "@/types";
import { buildParams } from "@/utils/buildParams";
import type {
  GetTransactionPlayerParams,
  TransactionResponse,
} from "@/types/operator/transaction";

export const UserService = {
  getUsers: async (params: GetMethodBaseQueryParams = {}) => {
    const res = await axiosInstance.get<{
      users: User[];
      totalRows: number;
      limit: number;
      offset: number;
    }>(API_ENDPOINTS.USERS.LIST, {
      params: buildParams(params),
    });

    return res.data;
  },

  updateUser: async (id: string, type: Role) => {
    const res = await axiosInstance.patch<{ user: User }>(
      `${API_ENDPOINTS.USERS.UPDATE}/${id}`,
      { type }
    );
    return res.data;
  },

  confirmResetPassword: async (
    newPassword: string,
    confirmNewPassword: string,
    otp: string,
    userName: string
  ) => {
    const payload = {
      otp,
      userName,
      newPassword,
      confirmNewPassword,
    };
    const { data } = await axiosInstance.post(
      API_ENDPOINTS.USERS.CONFIRM_PASSWORD,
      payload
    );
    return data;
  },

  getUserById: async (id: string) => {
    const res = await axiosInstance.get(API_ENDPOINTS.USERS.GET_BY_ID(id));
    return res.data;
  },

  ResetPassword: async (userNameOrEmail: string) => {
    const payload = {
      userNameOrEmail,
    };
    const { data } = await axiosInstance.post(
      API_ENDPOINTS.USERS.CONFIRM_PASSWORD,
      payload
    );
    return data;
  },

  GetTransactionPlayer: async (
    params: GetTransactionPlayerParams
  ): Promise<TransactionResponse> => {
    const res = await axiosInstance.get(API_ENDPOINTS.PLAYER.TRANSACTION, {
      params,
    });
    return res.data;
  },

  GetTransactionById: async (id: string) => {
    const res = await axiosInstance.get(API_ENDPOINTS.PLAYER.GET_BY_ID(id));
    return res.data;
  },
};
