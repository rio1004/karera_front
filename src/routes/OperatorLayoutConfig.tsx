import OperatorCommission from "@/pages/operator/pages/commission/OperatorCommission";
import OperatorTransactions from "@/pages/operator/pages/wallet/OperatorTransactions";
import OperatorWallet from "@/pages/operator/pages/wallet/OperatorWallet";
import TransactionRequest from "@/pages/operator/pages/wallet/TransactionRequest";

type SettingsType = {
  path: string;
  title: string;
  icon: React.ReactNode;
  bgColor?: string;
  color?: string;
  element: React.ReactNode;
};

export const OperatorLayoutConfig: SettingsType[] = [
  {
    path: "/commission",
    title: "commission",
    icon: (
      <img
        src="/sideBarAssets/card.png"
        alt="Home"
        className="w-[24px] h-[24px]"
      />
    ),
    element: <OperatorCommission />,
  },
  {
    path: "/wallet",
    title: "wallet",
    icon: (
      <img
        src="/sideBarAssets/card.png"
        alt="Home"
        className="w-[24px] h-[24px]"
      />
    ),
    element: <OperatorWallet />,
  },
  {
    path: "/wallet/transactions",
    title: "Wallet Transaction",
    icon: (
      <img
        src="/sideBarAssets/card.png"
        alt="Home"
        className="w-[24px] h-[24px]"
      />
    ),
    element: <OperatorTransactions />,
  },
  {
    path: "/wallet/transactions/request-transaction",
    title: "request-transactions",
    icon: (
      <img
        src="/sideBarAssets/card.png"
        alt="Home"
        className="w-[24px] h-[24px]"
      />
    ),
    element: <TransactionRequest />,
  },
];
