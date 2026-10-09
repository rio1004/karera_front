import type { CreateRoomResponse, Room, Studio } from "@/types/host/host";
import { axiosInstance } from "../axiosInstance";
import { API_ENDPOINTS } from "../endpoints";

export interface CreateRoomPayload {
  gameId: string;
  hostId: string;
  studioNo: string;
}

export interface FetchParams {
  limit?: number;
  offset?: number;
  status?: string
}

export interface GetRoomsResponse extends FetchParams {
  rooms: Room[];
}

export interface GetStudiosResponse extends FetchParams {
  studios: Studio[];
}

export interface RoomResponse {
  id: string;
  [key: string]: any;
}

export interface RoomStatus extends FetchParams {
  gameId: string | number;
  hostId: string | number;
  status: string;
}

export const RoomService = {
  createRoom: async (data: CreateRoomPayload): Promise<CreateRoomResponse> => {
    const response = await axiosInstance.post(API_ENDPOINTS.ROOMS.CREATE, data);
    return response.data;
  },

  getRooms: async (params: FetchParams = {}): Promise<GetRoomsResponse> => {
    const { limit = 10, offset = 0 } = params;
    const response = await axiosInstance.get(API_ENDPOINTS.ROOMS.LIST, {
      params: { limit, offset,status: "open" },
    });
    return response.data;
  },

  getRoomById: async (id: string): Promise<RoomResponse> => {
    const response = await axiosInstance.get(API_ENDPOINTS.ROOMS.GET_BY_ID(id));
    return response.data;
  },

  getStudios: async (params: FetchParams = {}): Promise<GetStudiosResponse> => {
    const { limit = 10, offset = 0 } = params;
    const response = await axiosInstance.get(API_ENDPOINTS.ROOMS.STUDIO, {
      params: { limit, offset },
    });
    return response.data;
  },

  endRoom: async (id: string, gameId: string, hostId: string): Promise<any> => {
    const response = await axiosInstance.patch(
      API_ENDPOINTS.ROOMS.GET_BY_ID(id),
      { gameId, hostId, status: "closed" }
    );
    return response.data;
  },
};
