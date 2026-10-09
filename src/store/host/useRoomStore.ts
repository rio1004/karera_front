import { HostService } from "@/api/services/hostApi.service";
import { RoomService } from "@/api/services/roomApi.service";
import type {
  RoomStore,
  CreateRoomResponse,
  FetchParams,
  LikedHostResponse,
  Room,
} from "@/types/host/host";
import { normalizeStatus } from "@/utils/normalizeStatus";
import { create } from "zustand";

const DEFAULT_PAGINATION = { limit: 10, offset: 0 };

const createErrorHandler =
  (action: string) =>
  (err: unknown): string => {
    const errorMessage =
      err instanceof Error ? err.message : `Failed to ${action}`;
    console.error(`Error ${action}:`, err);
    return errorMessage;
  };

const setLoadingState = (
  set: any,
  isLoading: boolean,
  error: string | null = null
) => {
  set({ isLoading, error });
};

export const useRoomStore = create<RoomStore>((set, get) => ({
  rooms: [],
  hosts: [],
  studios: [],
  likedHosts: [],
  isLoading: false,
  error: null,
  limit: DEFAULT_PAGINATION.limit,
  offset: DEFAULT_PAGINATION.offset,
  currentRoomId: null, 

  setCurrentRoomId: (roomId: string) => {
    set({ currentRoomId: roomId });
  },

  getCurrentRoom: () => {
    const { rooms, currentRoomId } = get();
    return rooms.find(room => room.id === currentRoomId) || null;
  },

  fetchRooms: async (params?: FetchParams) => {
    setLoadingState(set, true);
    try {
      const { limit = 10, offset = 0 } = params || {};
      const response = await RoomService.getRooms({ 
        limit, 
        offset, 
        status: "open" 
      });

      const normalizedRooms = response.rooms.map((room: Room) => ({
        ...room,
        status: normalizeStatus(room.status),
      }));

      set({
        rooms: normalizedRooms,
        limit: response.limit || limit,
        offset: response.offset || offset,
        isLoading: false,
        error: null,
      });

      const { currentRoomId } = get();
      if (currentRoomId) {
        const currentRoom = normalizedRooms.find(room => room.id === currentRoomId);
        if (!currentRoom || currentRoom.status === 'closed') {
          set({ currentRoomId: null });
        }
      }
    } catch (err) {
      const error = createErrorHandler("fetch rooms")(err);
      set({ error, isLoading: false });
    }
  },

  fetchHosts: async (params?: FetchParams) => {
    setLoadingState(set, true);
    try {
      const { limit = 10, offset = 0 } = params || {};
      const response = await HostService.getHosts({ limit, offset });

      set({
        hosts: response.hosts,
        limit: response.limit || limit,
        offset: response.offset || offset,
        isLoading: false,
        error: null,
      });
    } catch (err) {
      const error = createErrorHandler("fetch hosts")(err);
      set({ error, isLoading: false });
    }
  },

  fetchStudios: async (params?: FetchParams) => {
    setLoadingState(set, true);
    try {
      const { limit = 10, offset = 0 } = params || {};
      const response = await RoomService.getStudios({ limit, offset });

      set({
        studios: response.studios,
        limit: response.limit || limit,
        offset: response.offset || offset,
        isLoading: false,
        error: null,
      });
    } catch (err) {
      const error = createErrorHandler("fetch studios")(err);
      set({ error, isLoading: false });
    }
  },

  createRoom: async (
    gameId: string,
    hostId: string,
    studioNo: string
  ): Promise<CreateRoomResponse> => {
    setLoadingState(set, true);
    try {
      const response = await RoomService.createRoom({
        gameId,
        hostId,
        studioNo,
      });

      set((state) => ({
        rooms: [...state.rooms, response.room],
        currentRoomId: response.room.id, 
        isLoading: false,
        error: null,
      }));
      return response;
    } catch (err) {
      const error = createErrorHandler("create room")(err);
      set({ error, isLoading: false });
      throw err;
    }
  },

  endRoom: async (
    id: string,
    gameId: string,
    hostId: string,
  ) => {
    setLoadingState(set, true);
    try {
      const { currentRoomId } = get();
      const roomIdToEnd = currentRoomId || id;
      const response = await RoomService.endRoom(roomIdToEnd, gameId, hostId);

      set((state) => ({
        rooms: state.rooms.map((room) =>
           room.id === roomIdToEnd ? { ...room, status: "closed" } : room
        ),
        currentRoomId: null, 
        isLoading: false,
        error: null,
      }));

      return response;
    } catch (err) {
      const error = createErrorHandler("end room")(err);
      set({ error, isLoading: false });
      throw err;
    }
  },

  likeHost: async (
    userId: string,
    hostId: string
  ): Promise<LikedHostResponse> => {
    setLoadingState(set, true);
    try {
      const response = await HostService.likedHost({
        userId,
        hostId,
      });
      if (response.like) {
        set((state) => ({
          likedHosts: [...(state.likedHosts || []), response.like],
          isLoading: false,
          error: null,
        }));
      } else {
        set({ isLoading: false, error: null });
      }

      return response;
    } catch (err) {
      const error = createErrorHandler("like host")(err);
      set({ error, isLoading: false });
      throw err;
    }
  },

  clearError: () => set({ error: null }),
  
  // Clear current room ID (useful for cleanup)
  clearCurrentRoomId: () => set({ currentRoomId: null }),
}));