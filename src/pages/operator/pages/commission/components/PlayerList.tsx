import type { Player } from "@/types/operator/representative";
import { PlayerCard } from "./PlayerCard";
import { Pagination } from "./Pagination";
import { mockPlayers } from "@/constant/commissionData";

export const PlayersList: React.FC<{
  players: Player[];
  showAmount: boolean;
  onPlayerClick: (player: Player) => void;
}> = ({ players, showAmount, onPlayerClick }) => (
  <main>
    <div className="space-y-3">
      {players.map((player) => (
        <PlayerCard
          key={player.id}
          player={player}
          showAmount={showAmount}
          onPlayerClick={onPlayerClick}
        />
      ))}
    </div>
    
    <Pagination current={players.length} total={mockPlayers.length} />
  </main>
);