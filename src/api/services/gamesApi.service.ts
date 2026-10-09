import { axiosInstance } from "../axiosInstance";
import { API_ENDPOINTS } from "../endpoints";

export const GameServices = {
  getGames: async (limit = 10, offset = 0): Promise<any[]> => {
    const res = await axiosInstance.get(
      `${API_ENDPOINTS.GAME.GET_GAMES}?limit=${limit}&offset=${offset}`
    );
    return res.data.data;
  },

  createGameSession: async (gameId: string | null): Promise<any> => {
    const res = await axiosInstance.post(API_ENDPOINTS.GAME.SESSION, {
      gameId,
    });
    return res.data;
  },

  updateGameStatusById: async (
    id: number | string,
    status: string
  ): Promise<any> => {
    const res = await axiosInstance.patch(
      API_ENDPOINTS.GAME.PATCH_GAME_STATUS(id),
      { status } 
    );

    console.log("API Response status:", res.status);
    console.log("API Response data:", res.data);

    return res.data;
  },
};
