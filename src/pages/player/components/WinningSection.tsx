import { UI_COLORS } from "@/constant/colors";
import { LEADERBOARD } from "@/constant/fakeleaderboard";
import { LOGIN_ASSETS } from "@/constant/image";

const WinningSection = () => {
  return (
    <section
      className="p-4 rounded-xl shadow-md text-white"
      style={{ background: `url(${LOGIN_ASSETS.redBg.src})` }}
    >
      <div className="flex items-center mb-3">
        <h2 className="text-lg font-bold">Latest</h2>
        <span className="ml-2 bg-yellow-400 text-black text-sm px-3 py-0.5 rounded-full font-semibold">
          Winnings
        </span>
      </div>
      <div className="rounded-2xl bg-white">
        <div
          className="rounded-t-2xl text-white font-semibold grid grid-cols-3 text-center"
          style={{ background: UI_COLORS.LINEAR.yellow }}
        >
          <div className="py-2">Player</div>
          <div className="py-2">Game</div>
          <div className="py-2">Winnings</div>
        </div>
        {LEADERBOARD.slice(0, 10).map((entry, index) => (
          <div
            key={index}
            className=" text-black grid grid-cols-3 text-center place-content-center text-sm"
          >
            <div className="py-2">{entry.player}</div>
            <div className="py-2">{entry.game}</div>
            <div className="py-2">₱{entry.winnings.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WinningSection;
