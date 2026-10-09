import { DosLetraService } from "@/api/services/dosLetraAPI.service";
import { ICONS } from "@/constant/image";
import CustomDrawer from "@/pages/player/components/Drawer";
import { useDosLetraStore } from "@/store/player/useDosLetraStore";
import type { LeaderboardEntry } from "@/types/player/dosLetra";
import { formatToPeso } from "@/utils/utils.helper";
import { useState, useEffect } from "react";

const LeaderboardRow = ({ entry }: { entry: LeaderboardEntry }) => {
  const getRankDisplay = () => {
    if (entry.rank === 1)
      return <img src={ICONS.goldCrown.src} alt="gold" className="h-[31px]" />;
    if (entry.rank === 2)
      return (
        <img src={ICONS.silverCrown.src} alt="silver" className="h-[31px]" />
      );
    if (entry.rank === 3)
      return (
        <img src={ICONS.bronzeCrown.src} alt="bronze" className="h-[31px]" />
      );
    return entry.rank;
  };

  const rowBg =
    entry.rank === 1
      ? "bg-[#FFE4005E]"
      : entry.rank === 2
      ? "bg-[#99999980]"
      : entry.rank === 3
      ? "bg-[#C74C2A40]"
      : "";

  const winningsColor =
    entry.rank === 1
      ? "text-[#EFB513]"
      : entry.rank === 2
      ? "text-[#5B5B5B]"
      : entry.rank === 3
      ? "text-[#C86C38]"
      : "text-[#7F631A]";

  const isBold = entry.rank <= 3 ? "font-semibold" : "";

  return (
    <tr className={`${rowBg} border-b border-white`}>
      <td className="py-2 text-center font-semibold flex justify-center">
        {getRankDisplay()}
      </td>
      <td className="py-2  text-center">
        <div className={`flex items-center gap-1 text-[#303030] ${isBold}`}>
          <img src={ICONS.profile.src} alt="profile" className="h-5" />
          <p>{entry.userName}</p>
        </div>
      </td>
      <td className={`py-2 text-center font-semibold ${winningsColor}`}>
        {formatToPeso(Number(entry.winAmount))}
      </td>
    </tr>
  );
};

const LeaderBoardDrawer = () => {
  const { showLeaderBoard, setShowLeaderBoard } = useDosLetraStore();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const fetchLeaderboards = async () => {
      const res = await DosLetraService.getLeaderboard();
      setLeaderboard(res.leaderboard);
    };

    fetchLeaderboards();
  }, []);

  return (
    <div className="flex justify-center">
      <CustomDrawer
        setShowDrawer={setShowLeaderBoard}
        showDrawer={showLeaderBoard}
        style={{
          background: "url('/DosLetra/gameHistoryBackground.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        hasClose
      >
        <div className="p-5 pt-10 relative">
          <div className="absolute top-[-58px] h-[95px] left-0 w-full flex justify-center ">
            <img src={ICONS.leaderCrown.src} alt="crown" className="h-full" />
          </div>

          <div className="flex items-center justify-center mb-2">
            <img src="/icons/trophy.png" alt="trophy" className="h-[50px]" />
            <p className="font-medium text-[#7F631A] text-[21px]">
              Daily Leaderboard
            </p>
          </div>

          <div className="relative shadow-md rounded-t-[25px] overflow-auto h-[80vh] bg-white">
            <table
              className={`table-fixed w-full ${
                leaderboard.length <= 0 ? "h-full" : ""
              } text-left`}
            >
              <thead className="bg-[#FFE400] text-[#7F631A] sticky top-0 z-10">
                <tr>
                  <td className="py-2 text-center p-4 w-[70px]">Rank</td>
                  <td className="py-2 text-center p-4">Player</td>
                  <td className="py-2 text-center p-4">Winnings</td>
                </tr>
              </thead>
              <tbody className="bg-white text-[#6b7280]">
                {leaderboard.length > 0 ? (
                  leaderboard.map((entry) => (
                    <LeaderboardRow key={entry.rank} entry={entry} />
                  ))
                ) : (
                  <tr className="h-full ">
                    <td
                      colSpan={3}
                      className="h-full text-center text-gray-500 align-middle"
                    >
                      <div className="flex flex-col gap-5 items-center justify-center h-full">
                        <p>No Winners yet!</p>
                        <p>Bet now and grab your chance to win big!</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </CustomDrawer>
    </div>
  );
};

export default LeaderBoardDrawer;
