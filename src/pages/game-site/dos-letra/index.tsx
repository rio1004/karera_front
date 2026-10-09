import Header from "./components/Header";
import BetBox from "./components/BetBox";
import BetList from "./components/BetList";
import Payment from "./components/Payment";
import { useMainStore } from "@/store/game-site/useMainStore";
import Sidebar from "./components/Sidebar";

const GameSiteDosLetra = () => {
  const { showPayment, showSidebar, setShowSidebar } = useMainStore();
  return (
    <>
      <div>
        <Header />
        <div className="flex justify-center items-start w-full p-5 gap-10">
          <BetBox />
          <div className="flex flex-col gap-3">
            <BetList />
            {showPayment && <Payment />}
          </div>
        </div>
        <Sidebar
          isOpen={showSidebar}
          onClose={() => setShowSidebar(false)}
          username="GSBBBetting"
          userId="04593962"
        />
      </div>
    </>
  );
};

export default GameSiteDosLetra;
