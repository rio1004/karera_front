import type { Room } from "@/types/host/host";
import type { GameRoom } from "@/types/moderator/gameRoom";

export const normalizeStatus = (status?: string): GameRoom["status"] => {
  if (!status) return undefined;
  switch (status) {
    case "waiting":
    case "playing":
    case "finished":
    case "open":
    case "closed":
      return status;
    default:
      return undefined;
  }
};

export const toGameRoom = (room: Room): GameRoom => ({
  id: room.id,
  gameId: room.gameId,          
  createdAt: room.createdAt,
  studioNo: room.studioNo,      
  kareraMaster: room.hostId,    
  status: normalizeStatus(room.status),
});
