import { usePlayerStore } from "@/store/player/usePlayerStore";
import { useWalletStore } from "@/store/player/useWalletStore";
import { useDosLetraStore } from "@/store/player/useDosLetraStore";
import { useWallet } from "@/hooks/player/useWallet";
import { CircleMinus, CirclePlus } from "lucide-react";
import { UI_COLORS } from "@/constant/colors";
import { ICONS } from "@/constant/image";
import { useLocation, useNavigate } from "react-router-dom";
import SideBarBase from "@/components/SideBar/SideBar";

const PlayerSideBar = () => {
  const { showSidebar, setShowSideBar } = usePlayerStore();
  const { hasActivePin, setWalletTab, walletBalance } = useWalletStore();
  const { getWalletBalance } = useWallet();
  const { setShowBadgeDrawer } = useDosLetraStore();
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigate = (val: "deposit" | "withdraw") => {
    navigate("wallet");
    setWalletTab(val);
  };

  const actions = [
    {
      label: "Deposit",
      icon: <CirclePlus size={25} />,
      color: UI_COLORS.LINEAR.yellow,
      onClick: () => handleNavigate("deposit"),
    },
    {
      label: "Withdraw",
      icon: <CircleMinus size={25} />,
      color: UI_COLORS.LINEAR.light_blue,
      onClick: () => handleNavigate("withdraw"),
    },
  ];

  const navItems = location.pathname.includes("dos-letra")
    ? [
        {
          icon: ICONS.side_karera.src,
          text: "Earn Karera Badges",
          submit: () => setShowBadgeDrawer(true),
        },
        {
          icon: ICONS.transaction.src,
          text: "Transaction History",
          to: "/player/game-mechanics",
        },
        {
          icon: ICONS.game_rules.src,
          text: "Game Rules",
          to: "/player/customer-support",
        },
        {
          icon: ICONS.csr.src,
          text: "Customer Support",
          to: "/player/edit-profile",
        },
      ]
    : [
        {
          icon: "/sideBarAssets/profile_2.png",
          text: "Profile",
          to: "/player/edit-profile",
        },
        {
          icon: "/sideBarAssets/card.png",
          text: "eKYC Setting",
          to: "/player/ekyc-settings/",
        },
        {
          icon: "/sideBarAssets/lock.png",
          text: hasActivePin ? "Change Wallet PIN" : "Create Wallet PIN",
          to: hasActivePin
            ? "/player/wallet/pin/change"
            : "/player/wallet/pin/create",
        },
        {
          icon: "/sideBarAssets/password.png",
          text: "Change Password",
          to: "/player/change-password",
        },
      ];

  return (
    <SideBarBase
      showSidebar={showSidebar}
      setShowSideBar={setShowSideBar}
      walletTitle="My Balance"
      balance={walletBalance}
      onRefresh={getWalletBalance}
      actions={actions}
      navItems={navItems}
    />
  );
};

export default PlayerSideBar;
