import SendReqCredits from "@/pages/operator/pages/wallet/send-request-credits/SendReqCredits";
import { TransferMoneyStep1 } from "@/pages/operator/pages/wallet/transfer-money/step-1/Step1";
import { TransferMoneyStep2 } from "@/pages/operator/pages/wallet/transfer-money/step-2/Step2";
import { TransferMoneyContainer } from "@/pages/operator/pages/wallet/transfer-money/TransferMoney";
import { WithdrawMoneyStep1 } from "@/pages/operator/pages/wallet/withdraw/step-1/Step1";
import { WithdrawMoneyStep2 } from "@/pages/operator/pages/wallet/withdraw/step-2/Step2";
import { WithdrawMoneyContainer } from "@/pages/operator/pages/wallet/withdraw/WithdrawMoney";

type SettingsType = {
  path: string;
  title: string;
  element: React.ReactNode;
};

export const OperatorWalletLayoutConfig: SettingsType[] = [
  {
    path: "/operator/wallet/send-credits",
    title: "Send Credits",
    element: <SendReqCredits />,
  },
  {
    path: "/operator/wallet/request-credits",
    title: "Request Credits",
    element: <SendReqCredits />,
  },
  {
    path: "/operator/wallet/transfer-money/",
    title: "Transfer Money",
    element: <TransferMoneyContainer />,
  },
  {
    path: "/operator/wallet/transfer-money/step-1",
    title: "Transfer Money",
    element: <TransferMoneyStep1 />,
  },
  {
    path: "/operator/wallet/transfer-money/step-2",
    title: "Transfer Money",
    element: <TransferMoneyStep2 />,
  },
  {
    path: "/operator/wallet/withdraw-money",
    title: "Withdraw Money",
    element: <WithdrawMoneyContainer />,
  },
  {
    path: "/operator/wallet/withdraw-money/step-1",
    title: "Withdraw Money",
    element: <WithdrawMoneyStep1 />,
  },
  {
    path: "/operator/wallet/withdraw-money/step-2",
    title: "Withdraw Money",
    element: <WithdrawMoneyStep2 />,
  },
];
