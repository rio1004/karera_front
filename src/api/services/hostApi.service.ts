import type { GetMethodBaseQueryParams } from "@/types";
import { axiosInstance } from "../axiosInstance";
import { API_ENDPOINTS } from "../endpoints";
import type { ApiHost } from "@/store/moderator/useHostStore";
import type { Host, LikedHostResponse } from "@/types/host/host";

type GetHostsResponse = {
  hosts: Host[];
  limit?: number;
  offset?: number;
};

export interface LikedHostPayload {
  userId: string;
  hostId: string;
}

export type LikeHostApiResponse = {
  id: string;
  userId: string;
  hostId: string;
  createdAt: string;
  like?: string;
};

export type SelectHostPayload = {
  gameId: string;
  hostId: string;
  status?: string
};

export const HostService = {
  getHosts: async (
    params: GetMethodBaseQueryParams
  ): Promise<GetHostsResponse> => {
    const res = await axiosInstance.get<GetHostsResponse>(
      API_ENDPOINTS.HOSTS.LIST,
      { params }
    );
    return res.data;
  },

  getHostById: async (id: string): Promise<{ host: ApiHost }> => {
    const res = await axiosInstance.get<{ host: ApiHost }>(
      API_ENDPOINTS.HOSTS.HOSTS_BY_ID(id)
    );
    return res.data;
  },

  likedHost: async (data: LikedHostPayload): Promise<LikedHostResponse> => {
    const res = await axiosInstance.post<LikedHostResponse>(
      API_ENDPOINTS.HOSTS.LIKED,
      data
    );
    return res.data;
  },

  updateHost: async (
   id: string, gameId: string, hostId: string
  ): Promise<any> => {
    const res = await axiosInstance.patch(
      API_ENDPOINTS.ROOMS.GET_BY_ID(id),
       { gameId, hostId, status: "open" }
    );
    return res.data;
  },
};
