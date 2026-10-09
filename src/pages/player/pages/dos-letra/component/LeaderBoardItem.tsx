import { UI_COLORS } from "@/constant/colors";
import { DAILY_LEADERBOARDS, type PLAYER_DAILY_LEADERBOARDS } from "@/constant/fakeleaderboard copy";
import { formatToPeso } from "@/utils/utils.helper";

interface Props {
  player: PLAYER_DAILY_LEADERBOARDS;
}

const RANK_ICONS = ["👑", "🥈", "🥉", "🏅"] as const;
const RANK_LABELS = [
  "First place crown",
  "Second place silver medal", 
  "Third place bronze medal",
  "Participation medal"
] as const;

export const LeaderboardItems = ({ player }: Props) => {
  const { rank, player: name, winnings } = player;
  const iconIndex = Math.min(rank - 1, 3);
  const isLastItem = rank === DAILY_LEADERBOARDS.length;
  
  const getInitials = (playerName: string): string => {
    return playerName
      .split(/[\s._-]+/)
      .map(word => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  };

  return (
    <article
      className={`flex items-center justify-between px-4 py-3 ${
        !isLastItem ? "border-b border-gray-100" : ""
      }`}
      role="row"
    >
      <div className="flex items-center gap-3" role="gridcell">
        <div className="w-6 text-center">
          {rank <= 3 ? (
            <span className="text-lg" role="img" aria-label={RANK_LABELS[iconIndex]}>
              {RANK_ICONS[iconIndex]}
            </span>
          ) : (
            <span className="text-sm font-medium text-gray-600" aria-label={`Rank ${rank}`}>
              {rank}
            </span>
          )}
        </div>
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-semibold">
          {getInitials(name)}
        </div>
        <span className="text-sm font-medium text-gray-800">{name}</span>
      </div>
      <span 
        className={`text-sm font-semibold text-[${UI_COLORS.PLAIN.gold}]`}
        aria-label={`Winnings: ${formatToPeso(winnings)}`}
      >
        {formatToPeso(winnings)}
      </span>
    </article>
  );
};