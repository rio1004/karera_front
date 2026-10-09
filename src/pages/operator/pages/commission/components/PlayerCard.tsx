import { Badge } from "@/components/ui/badge";
import type { Player } from "@/types/operator/representative";
import { ChevronRight } from "lucide-react";

export const PlayerCard = ({
  player,
  showAmount,
  onPlayerClick,
}: {
  player: Player;
  showAmount: boolean;
  onPlayerClick: (player: Player) => void;
}) => (
  <div
    onClick={() => onPlayerClick(player)}
    className="bg-white border border-gray-200 rounded-lg p-4 mb-3 
               hover:shadow-md transition-shadow cursor-pointer"
  >
    <div className="flex items-center justify-between mb-3">
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900">{player.name}</h3>
        <p className="text-sm text-gray-600 flex items-center gap-1">
          {player.username}
          <span
            className="w-2 h-2 bg-blue-500 rounded-full"
            aria-hidden="true"
          />
        </p>
        <p className="text-sm text-gray-500">{player.phone}</p>
      </div>
      <div className="text-right flex items-center gap-2">
        <div className="text-lg font-bold text-green-600">
          ₱ {showAmount ? player.amount.toFixed(2) : "***.**"}
        </div>
        <ChevronRight className="text-gray-400" size={20} />
      </div>
    </div>

    <div className="flex items-center justify-between">
      <time className="text-xs text-gray-500">{player.timestamp}</time>
      <Badge>{player.status}</Badge>
    </div>
  </div>
);
