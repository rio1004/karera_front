import Image from "@/components/Gamesites/Image";
import Text from "@/components/Gamesites/Text";
import { UI_COLORS } from "@/constant/colors";
import { ChevronLeft } from "lucide-react";
import Card from "./Card";
import { useBetTransactions } from "@/store/game-site/useBetTransaction";

const CustomSidebar = () => {
  const { setShowSidebar, showSideBar } = useBetTransactions();

  return (
    <div
      className={`transition-all duration-300 border-r-2 h-[88vh] min-w-[80px] ${
        showSideBar ? "w-[25vw]" : "w-[5vw]"
      }`}
      style={{
        background: !showSideBar ? UI_COLORS.PLAIN.btnGreen : "white",
      }}
    >
      <div
        className={`flex items-center h-[70px] p-5 ${
          showSideBar ? "justify-between" : "justify-center"
        } `}
        style={{ background: UI_COLORS.PLAIN.btnGreen }}
      >
        {showSideBar && <Text type="h7" text="Bet Transactions" />}
        <button
          onClick={() => setShowSidebar(!showSideBar)}
          className="flex items-center justify-center"
        >
          <ChevronLeft
            color="white"
            className={`transition-transform duration-300 flex justify-center items-center ${
              !showSideBar ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      <div className="p-5 flex flex-col gap-5">
        {showSideBar ? (
          <>
            <Card
              bgColor={UI_COLORS.PLAIN.btnGreen}
              content="58"
              iconPath="/icons/green_coin.png"
              label="New Transactions"
            />
            <Card
              bgColor={UI_COLORS.PLAIN.btnGreen}
              content="4,289"
              iconPath="/icons/orange_coin.png"
              label="Total Transactions"
            />
            <Card
              bgColor="#E7F6F0"
              content="₱98,640"
              label="Total Bets Per Day"
              color="#0E9F68"
            />
            <Card
              bgColor={UI_COLORS.PLAIN.btnGreen}
              content="₱1,236,870"
              label="Overall Bets"
            />
          </>
        ) : (
          <div className="flex flex-col items-center gap-5">
            <Image
              path="/icons/green_coin.png"
              alt="green coin"
              className="w-10 h-10"
            />
            <Image
              path="/icons/orange_coin.png"
              alt="orange coin"
              className="w-10 h-10"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomSidebar;
