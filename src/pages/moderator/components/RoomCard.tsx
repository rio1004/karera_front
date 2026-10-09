import type { GameRoom } from "@/types/moderator/gameRoom";
import { formattedDate } from "@/utils/formattedDate";

const RoomCard = ({
  room,
  onSelect,
}: {
  room: GameRoom;
  onSelect: (room: GameRoom) => void;
}) => {
  return (
    <div
      className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
        room.isSelected
          ? "border-cyan-400 bg-cyan-50"
          : "border-gray-200 hover:border-gray-300"
      }`}
      onClick={() => onSelect(room)}
    >
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {room.kareraMaster || room.id}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm font-medium text-gray-900 truncate">
              DATE:{" "}
              <span className="text-orange-600">
                {room.date ? formattedDate(room.date) : "Unknown"}
              </span>
            </p>
          </div>

          <p className="text-sm text-gray-600 mb-1">
            GAME: <span className="font-medium">{room.game || "Unknown"}</span>
          </p>

          <p className="text-sm text-gray-600 mb-1">
            ROUND:{" "}
            <span className="font-medium text-blue-600">{room.round || "N/A"}</span>
          </p>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              KARERA MASTER:{" "}
              <span className="font-medium text-purple-600">
                {room.kareraMaster || "Unknown"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;