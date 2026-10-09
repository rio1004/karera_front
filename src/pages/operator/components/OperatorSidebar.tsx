import { useOperatorWalletStore } from "@/store/operator/useWalletStore";
import { useAuthStore } from "@/store/auth/useAuth";
import { useWalletOp } from "@/hooks/operator/useOperatorWallet";
import { usePlayerStore } from "@/store/player/usePlayerStore";
import { useNavigate } from "react-router-dom";
import { CircleMinus, CirclePlus } from "lucide-react";
import { UI_COLORS } from "@/constant/colors";
import SideBarBase from "@/components/SideBar/SideBar";

const OperatorSideBar = () => {
  const { showSidebar, setShowSideBar } = usePlayerStore();
  const { totalBalance } = useOperatorWalletStore();
  const { getOperatorWalletBalannce } = useWalletOp();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const handleNavigate = (val: "send-credits" | "withdraw") => {
    navigate("wallet");
  };

  const actions = [
    {
      label: "Send Credits",
      icon: <CirclePlus size={25} />,
      color: UI_COLORS.LINEAR.yellow,
      onClick: () => handleNavigate("send-credits"),
    },
    {
      label: "Withdraw",
      icon: <CircleMinus size={25} />,
      color: UI_COLORS.LINEAR.blue,
      onClick: () => handleNavigate("withdraw"),
    },
  ];

  const navItems = [
    {
      icon: "/icons/qr-icon.png",
      text: "QR Codes",
      to: "/operator/referral-codes/",
    },
    {
      icon: "/sideBarAssets/lock.png",
      text: "Change Wallet PIN",
      to: "/operator/wallet/pin/change",
    },
    {
      icon: "/sideBarAssets/password.png",
      text: "Sign in Password",
      to: "/operator/sign-in-password",
    },
  ];

  return (
    <SideBarBase
      showSidebar={showSidebar}
      setShowSideBar={setShowSideBar}
      walletTitle="Wallet Balance"
      balance={totalBalance}
      onRefresh={getOperatorWalletBalannce}
      actions={actions}
      navItems={navItems}
    />
  );
};

export default OperatorSideBar;
