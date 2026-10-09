import { axiosInstance } from "@/api/axiosInstance";
import { API_ENDPOINTS } from "@/api/endpoints";
import type { Role } from "@/constant/roles";
import type { GetMethodBaseQueryParams, User } from "@/types";
import { buildParams } from "@/utils/buildParams";

export const AdminUserService = {
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
  updateUserType: async (id: string, type: Role) => {
    const res = await axiosInstance.patch<{ user: User }>(
      `${API_ENDPOINTS.USERS.UPDATE}/${id}`,
      { type }
    );
    return res.data;
  },
  updateUserStatus: async (
    id: string,
    status: "active" | "inactive" | "ban"
  ) => {
    const res = await axiosInstance.patch<{ user: User }>(
      `${API_ENDPOINTS.USERS.UPDATE}/${id}`,
      { status }
    );
    return res.data;
  },
};
