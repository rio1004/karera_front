import { UI_COLORS } from "@/constant/colors";
import { ICONS } from "@/constant/image";
import { BottomNav } from "@/pages/player/components/BottomNav";
import { usePlayerStore } from "@/store/player/usePlayerStore";

const Footer = () => {
  const { setShowRightSidebar } = usePlayerStore();
  return (
    <footer
      className="fixed bottom-0 left-0 right-0 flex justify-around items-center py-3 text-white text-sm"
      style={{ background: UI_COLORS.LINEAR.red }}
    >
      <BottomNav icon={ICONS.home.src} label="Home" to="/player" />
      <BottomNav icon={ICONS.flag.src} label="Games" to="/player/games" />
      <BottomNav
        icon={ICONS.wallet.src}
        label="Wallet"
        to="/player/wallet"
        isWallet
      />
      <BottomNav icon={ICONS.promos.src} label="Promos" to="/player/promos" />
      <BottomNav
        icon={ICONS.more.src}
        label="More"
        onClick={() => setShowRightSidebar(true)}
      />
    </footer>
  );
};

export default Footer;
