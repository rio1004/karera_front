import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { GameRoom } from "@/types/moderator/gameRoom";
import RoomCard from "./RoomCard";
import { useRoomStore } from "@/store/host/useRoomStore";
import { toGameRoom } from "@/utils/normalizeStatus";

interface ExistingRoomModalProps {
  onClose: () => void;
}

const ExistingRoomModal = ({ onClose }: ExistingRoomModalProps) => {
  const { rooms, isLoading, error, fetchRooms, clearError , setCurrentRoomId } = useRoomStore();

  const [selectedRoom, setSelectedRoom] = useState<GameRoom | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  const handleRoomSelect = (room: GameRoom) => {
    setSelectedRoom(room);
  };

  const handleReEnter = () => {
    if (!selectedRoom) {
      console.warn("No room selected to re-enter.");
      return;
    }
    setCurrentRoomId(selectedRoom.id);
    navigate(`/moderator/${selectedRoom.id}`, {
      state: {
        roomId: selectedRoom.id,
        gameId: selectedRoom.gameId,
        studioNo: selectedRoom.studioNo,
        hostName: selectedRoom.kareraMaster,
      },
      replace: true, 
    });
    
    onClose();
  };

  const handleRetry = () => {
    clearError();
    fetchRooms();
  };

  const gameRooms: GameRoom[] = rooms.map(toGameRoom);

  return (
    <div className="fixed inset-0 z-50 bg-transparent bg-opacity-40 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">🔄</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                Existing Game Room
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              ✕
            </button>
          </div>
          <p className="text-gray-600 text-sm mt-2">
            Click a game room to join again.
          </p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
              <span className="ml-3 text-gray-600">Loading rooms...</span>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <div className="text-red-400 text-4xl mb-3">⚠️</div>
              <p className="text-red-600 mb-2">Failed to load rooms</p>
              <p className="text-gray-500 text-sm mb-4">{error}</p>
              <button
                onClick={handleRetry}
                className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600"
              >
                Retry
              </button>
            </div>
          ) : gameRooms.filter((room) => room.status !== "closed").length ===
            0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 text-4xl mb-3">🎮</div>
              <p className="text-gray-600">No game rooms available</p>
              <p className="text-gray-500 text-sm mt-1">
                Create a new room to get started!
              </p>
              <button
                onClick={handleRetry}
                className="mt-4 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600"
              >
                Retry
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {gameRooms
                .filter((room) => room.status !== "closed")
                .map((room, index) => (
                  <div
                    key={room.id}
                    id={`room-card-${index}`}
                    className={`rounded-xl transition-colors border-2 ${
                      selectedRoom?.id === room.id
                        ? "border-cyan-500 bg-cyan-50"
                        : "border-gray-200"
                    }`}
                  >
                    <RoomCard room={room} onSelect={handleRoomSelect} />
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          <button
            className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              selectedRoom
                ? "bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg hover:shadow-xl"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
            onClick={handleReEnter}
            disabled={!selectedRoom}
          >
            {selectedRoom ? "RE-ENTER" : "Select a room"}
          </button>

          <button
            className="w-full mt-3 text-gray-500 underline text-sm hover:text-gray-700 transition-colors"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExistingRoomModal;
