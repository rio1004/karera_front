import type { TicketPayload, TicketResponse } from "@/types";
import { axiosInstance } from "../axiosInstance";
import { API_ENDPOINTS } from "../endpoints";
import type { LeaderboardResponse } from "@/types/player/dosLetra";

export const DosLetraService = {
  getLeaderboard: async (params?: {
    limit?: number;
    startDate?: string;
    endDate?: string;
    gameId?: number;
  }): Promise<LeaderboardResponse> => {
    const res = await axiosInstance.get(API_ENDPOINTS.DOS_LETRA.LEADERBOARDS, {
      params,
    });
    return res.data;
  },
};
