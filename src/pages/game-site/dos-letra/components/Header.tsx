import Image from "@/components/Gamesites/Image";
import Text from "@/components/Gamesites/Text";
import { UI_COLORS } from "@/constant/colors";
import { useMainStore } from "@/store/game-site/useMainStore";
 

const Header = () => {
  const { setShowSidebar } = useMainStore();
  return (
    <div
      style={{ background: UI_COLORS.LINEAR.blue }}
      className="flex justify-between px-[30px] py-[10px]"
    >
      <div className="flex flex-col items-start">
        <Text type="p1" text="Available Wallet Balance" />
        <div className="flex">
          <Text type="h4" text="₱1,564,238.00" weight="medium" />
          <Image path="/icons/refresh.png" />
        </div>
      </div>
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => setShowSidebar(true)}
      >
        <Text text="Dos Letra" type="h5" />
        <Image path="/icons/burger.png" />
      </div>
    </div>
  );
};

export default Header;
