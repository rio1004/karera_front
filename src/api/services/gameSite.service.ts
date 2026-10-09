import type { GameSiteList } from "@/types";
import { axiosInstance } from "../axiosInstance";
import { API_ENDPOINTS } from "../endpoints";

export const GameSiteServices = {
  getGameSites: async (): Promise<GameSiteList> => {
    const res = await axiosInstance.get(API_ENDPOINTS.GAME_SITE.GET_SITES);
    return res.data;
  },
};
