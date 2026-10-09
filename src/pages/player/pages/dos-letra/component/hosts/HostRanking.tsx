import { useCallback, useEffect } from "react";
import CustomDrawer from "@/pages/player/components/Drawer";
import Image from "@/components/Image";
import { HostFooter } from "./components/HostFooter";
import HostRanking from "./components/HostRanking";
import { ProfileCarousel } from "./components/ProfileCarousel";
import { ICONS } from "@/constant/image";
import { UI_COLORS } from "@/constant/colors";
import { HeaderBadge } from "./components/HeaderBadges";

interface HostContaninerProps {
  showDrawer: boolean;
  setShowDrawer: (value: boolean) => void;
}

const HostContaniner = ({ showDrawer, setShowDrawer }: HostContaninerProps) => {
  const closeDrawer = useCallback(() => setShowDrawer(false), [setShowDrawer]);

  return (
    <>
      <CustomDrawer
        showDrawer={showDrawer}
        setShowDrawer={setShowDrawer}
        style={{ background: UI_COLORS.LINEAR.peach }}
      >
        <div className="relative p-12 h-[65vh] pt-10">
          <HeaderBadge icon="host" />
          <header className="flex items-center justify-center mx-auto  gap-2 p-6">
            <span className="text-lg" role="img" aria-label="star">
              ⭐
            </span>
            <h2
              style={{ color: UI_COLORS.PLAIN.gold }}
              className="text-lg font-semibold"
            >
              Host Ranking
            </h2>
          </header>

          <HostRanking />
          <Image
            path={ICONS.host.src}
            alt={ICONS.host.alt}
            className="absolute -top-[49px] w-[195px]"
          />
          <button
            onClick={closeDrawer}
            className="absolute right-0 top-0 w-8 h-8 flex items-center justify-center text-xl font-bold text-black hover:text-gray-700"
            aria-label="Close leaderboard"
          >
            ×
          </button>

          <Section>
            <ProfileCarousel />
          </Section>

          <Section>
            <HostFooter />
          </Section>
        </div>
      </CustomDrawer>
    </>
  );
};

const Section = ({ children }: { children: React.ReactNode }) => (
  <section className="my-6 pb-4">{children}</section>
);

export default HostContaniner;
