import type { BetItem } from "@/store/types/game-site/dosLetraTypes";
import { useMainStore } from "@/store/game-site/useMainStore";
 

type Props = {
  bet: BetItem;
};

const BetRow = ({ bet }: Props) => {
  const { removeBetList } = useMainStore();
  const ballIcon =
    bet.ball == "Letra A" ? "/dosLetraAssets/A.png" : "/dosLetraAssets/B.png";
  return (
    <div className="grid grid-cols-5 items-center px-4 py-3 text-sm border-b">
      <div>{bet.gameId}</div>
      <div className="flex items-center gap-2">
        <img src={ballIcon} className="w-6 h-6" />
        <span>{bet.ball}</span>
      </div>
      <div>{bet.type}</div>
      <div>{bet.qty}</div>
      <div className="flex justify-center items-center gap-3">
        <span>₱{bet.betAmount.toLocaleString()}</span>
        <img
          src="/dosLetraAssets/remove.png"
          className="w-6 h-6"
          onClick={() => removeBetList(bet.id)}
        />
      </div>
    </div>
  );
};

export default BetRow;
