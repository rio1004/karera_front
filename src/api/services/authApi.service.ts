import type { ApiResponse, LoginPayload, RegisterPayload } from "@/types";
import { axiosInstance } from "../axiosInstance";
import { API_ENDPOINTS } from "../endpoints";

export const AuthService = {
  login: async (data: LoginPayload): Promise<ApiResponse> => {
    const res = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN, data);
    return res.data;
  },
  register: async (data: RegisterPayload): Promise<ApiResponse> => {
    const res = await axiosInstance.post(API_ENDPOINTS.AUTH.REGISTER, data);
    return res.data;
  },
  logout: async (): Promise<ApiResponse> => {
    const res = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGOUT);
    return res.data;
  },
};
