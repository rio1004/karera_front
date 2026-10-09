export interface GameRoom {
  id: string;
  createdAt: string;
  gameId?: string | number;
  game?: string;
  round?: string;
  kareraMaster?: string;
  avatar?: string;
  isSelected?: boolean;
  playerCount?: number;
  status?: "waiting" | "playing" | "finished" | "open" | "closed"; 

  [key: string]: any;
}

export interface GameRoomState {
  rooms: GameRoom[];
  selectedRoom: GameRoom | null;
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface GameRoomActions {
  setRooms: (rooms: GameRoom[]) => void;
  selectRoom: (room: GameRoom) => void;
  setConnectionStatus: (status: boolean) => void;
  addRoom: (room: GameRoom) => void;
  updateRoom: (id: string, updates: Partial<GameRoom>) => void;
  removeRoom: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export type GameRoomStore = GameRoomState & GameRoomActions;
