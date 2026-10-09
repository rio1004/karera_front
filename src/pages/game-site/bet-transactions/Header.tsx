import Image from "@/components/Gamesites/Image";
import Text from "@/components/Gamesites/Text";
import { UI_COLORS } from "@/constant/colors";
import { useBetTransactions } from "@/store/game-site/useBetTransaction";

const Header = () => {
  const { setShowSidebar } = useBetTransactions();
  return (
    <div
      style={{ background: UI_COLORS.LINEAR.red }}
      className="flex justify-between px-[30px] py-[10px] h-[12vh]"
    >
      <div className="flex items-center gap-5">
        <Image path="/icons/profile.png" />
        <Text type="h4" text="Sarah Montes" weight="medium" />
      </div>
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => setShowSidebar(true)}
      >
        <Image path="/icons/burger.png" />
      </div>
    </div>
  );
};

export default Header;
