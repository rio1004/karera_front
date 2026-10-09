import { GameServices } from "@/api/services/gamesApi.service";
import { create } from "zustand";

export type Game = {
  id: string;
  name: string;
  choices: string[];
  status: string;
  commission?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

type GameRoomStore = {
  games: Game[];
  total: number;
  isLoading: boolean;
  fetchGames: () => Promise<void>;
  setGameData: (games: Game[]) => void;
  updateGameStatusById: (id: number, status: string) => Promise<any>;
};

export const useGameRoomStore = create<GameRoomStore>((set, get) => ({
  games: [],
  total: 0,
  isLoading: false,
  fetchGames: async () => {
    set({ isLoading: true });
    try {
      const response = await GameServices.getGames();
      const games = Array.isArray(response) && response;
      const total = response.total || 0;

      set({ games, total });
    } catch (err) {
      console.error(err);
    } finally {
      set({ isLoading: false });
    }
  },
  setGameData: (games: Game[]) => set({ games }),

  updateGameStatusById: async (id: number, status: string): Promise<any> => {
    try {
      const { games } = get();
      const currentGame = games.find((game) => game.id === id.toString());

      if (!currentGame) {
        throw new Error("Game not found");
      }

      const response = await GameServices.updateGameStatusById(id, status);

      const updatedGames = games.map((game) => {
        if (game.id === id.toString()) {
          return {
            ...game,
            ...response,
            updatedAt: response.updatedAt || new Date().toISOString(),
          };
        }
        return game;
      });

      set({ games: updatedGames });
      return response;
    } catch (error) {
      console.error("Failed to update game status:", error);
      throw error;
    }
  },
}));
