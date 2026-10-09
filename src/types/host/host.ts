export interface Profile {
  id: string | number;
  name: string;
  image: string;
  badge: string;
  location: string;
  birthday: string;
  zodiac: string;
  talent: string;
  likes: number | string;
}

export type Room = {
  id: string;
  gameId: string;
  studioNo?: string;
  status?: string;
  hostId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type Studio = {
  id: string;
  studioNo: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type Host = {
  id: string;
  name: string;
  location: string;
  birthDate: string;
  zodiac: string;
  talent: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type LikeHost = {
  id: string;
  userId: string;
  hostId: string;
  createdAt: string;
  like?: string;
};

export interface CreateRoomResponse {
  room: Room;
}

export interface LikedHostResponse {
  like: LikeHost;
}

export interface FetchParams {
  limit?: number;
  offset?: number;
  status?: string;
}

export type RoomStore = {
  rooms: Room[];
  studios: Studio[];
  hosts: Host[];
  likedHosts: LikeHost[];
  isLoading: boolean;
  error: string | null;
  limit: number;
  offset: number;

  currentRoomId: string | null;

  setCurrentRoomId: (roomId: string) => void;
  getCurrentRoom: () => Room | null;
  clearCurrentRoomId: () => void;

  fetchRooms: (params?: FetchParams) => Promise<void>;
  fetchHosts: (params?: FetchParams) => Promise<void>;
  fetchStudios: (params?: FetchParams) => Promise<void>;
  endRoom: (
    id: string,
    gameId: string,
    hostId: string,
    status: string
  ) => Promise<any>;

  createRoom: (
    gameId: string,
    hostId: string,
    studioNo: string
  ) => Promise<CreateRoomResponse>;
  likeHost: (userId: string, hostId: string) => Promise<LikedHostResponse>;
  clearError: () => void;
};
