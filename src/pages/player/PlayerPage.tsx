import { ICONS, PROMOTION_BANNERS } from "@/constant/image";
import Headline from "./components/Headline";
import { UI_COLORS } from "@/constant/colors";
import BottomSection from "./components/BottomSection";
import WinningSection from "./components/WinningSection";
import CarouselSection from "./components/CarouselSection";
import GameSection from "./components/GameSection";
import TermsAndCondDrawer from "./components/TermsAndCondDrawer";
import PlayerSideBar from "./components/PlayerSideBar";
import TermsPopup from "./components/TermsPopup";
import PrivacyPopup from "./components/PrivacyPopup";
import ResponsibleGaming from "./components/ResponsibleGaming";

const PlayerPage = () => {
  return (
    <>
      <PlayerSideBar />
      <TermsAndCondDrawer />
      <TermsPopup />
      <PrivacyPopup />
      <ResponsibleGaming />
      <div className="p-[15px] gap-[11px] flex flex-col pb-[78px]">
        <CarouselSection />
        <Headline
          bgColor={UI_COLORS.LINEAR.yellow}
          text="Live Betting Games"
          icon={ICONS.fire.src}
          type="header"
        />
        <GameSection />
        <Headline
          bgColor={UI_COLORS.LINEAR.red}
          text="2025-04-03 08:10:45 okkokey67 has won ₱4,550.00 in Dos Letra"
          icon={ICONS.announcement.src}
          textColor="white"
          type="announcement"
        />
        <div className=" border rounded-2xl shadow hover:shadow-lg relative overflow-hidden bg-white cursor-pointer">
          <img
            src={ICONS.livestream.src}
            alt={ICONS.livestream.alt}
            className="overflow-hidden w-full"
          />
          <div className="flex -mt-[40px]">
            <button className="flex-1 bg-[#FFC600] text-gray-600 rounded-bl-lg p-1.5">
              Zodiac Race
            </button>
            <button className="flex-1 rounded-br-lg bg-white">
              Dos Letra Karera
            </button>
          </div>
        </div>
        <WinningSection />
        <Headline
          bgColor={UI_COLORS.LINEAR.yellow}
          text="Promotions"
          icon={ICONS.promosGif.src}
          type="header"
        />
        <section>
          <div className="flex flex-col gap-4">
            <img
              src={PROMOTION_BANNERS.banner1.src}
              alt={PROMOTION_BANNERS.banner1.alt}
              className="rounded-2xl"
            />
            <img
              src={PROMOTION_BANNERS.banner2.src}
              alt={PROMOTION_BANNERS.banner2.alt}
              className="rounded-2xl"
            />
          </div>
        </section>
        <BottomSection />
      </div>
    </>
  );
};

export default PlayerPage;
