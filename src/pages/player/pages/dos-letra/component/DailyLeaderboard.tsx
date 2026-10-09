import { LeaderboardItems } from "./LeaderBoardItem";
import CustomDrawer from "@/pages/player/components/Drawer";
import Image from "@/components/Image";
import { UI_COLORS } from "@/constant/colors";
import { ICONS } from "@/constant/image";
import { DAILY_LEADERBOARDS } from "@/constant/fakeleaderboard copy";

interface DailyLeaderboardProps {
  showDrawer: boolean;
  setShowDrawer: (value: boolean) => void;
}

const DailyLeaderboard = ({
  showDrawer,
  setShowDrawer,
}: DailyLeaderboardProps) => {
  const closeDrawer = () => setShowDrawer(false);

  return (
    <CustomDrawer
      showDrawer={showDrawer}
      setShowDrawer={setShowDrawer}
      style={{ background: UI_COLORS.LINEAR.peach }}
    >
      <header className="flex items-center relative justify-center mx-auto gap-2 p-6">
        <span className="text-lg" role="img" aria-label="trophy">
          🏆
        </span>
        <h2 className={`text-[${UI_COLORS.PLAIN.gold}] text-lg`}>
          Daily Leaderboard
        </h2>
      </header>

      <Image
        path={ICONS.crown.src}
        alt="Crown decoration"
        className="absolute -top-[105px] w-[195px]"
      />

      <button
        onClick={closeDrawer}
        className="absolute right-0 top-0 w-8 h-8 flex items-center justify-center text-xl font-bold text-black hover:text-gray-700"
        aria-label="Close leaderboard"
      >
        ×
      </button>

      <section className="mx-4">
        <div
          className="bg-yellow-300 px-4 py-2 flex justify-between rounded-t-2xl items-center text-sm font-medium text-black"
          role="row"
        >
          <div className="flex items-center gap-3" role="columnheader">
            <span className={`text-[${UI_COLORS.PLAIN.gold}] w-6`}>Rank</span>
            <span className={`text-[${UI_COLORS.PLAIN.gold}] ml-8`}>
              Player
            </span>
          </div>
          <span
            className={`text-[${UI_COLORS.PLAIN.gold}]`}
            role="columnheader"
          >
            Winnings
          </span>
        </div>

        <main
          className="bg-white rounded-b-xl max-h-80 overflow-y-auto mb-4"
          role="table"
          aria-label="Daily leaderboard rankings"
        >
          {DAILY_LEADERBOARDS?.map((player) => (
            <LeaderboardItems key={player.player} player={player} />
          ))}
        </main>
      </section>
    </CustomDrawer>
  );
};

export default DailyLeaderboard;
