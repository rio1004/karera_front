import { useWallet } from "@/hooks/player/useWallet";
import DepositForm from "./Deposit";
import WithdrawForm from "./Withdraw";
import { useEffect } from "react";

type Props = {
  type: "Withdraw" | "Deposit";
};

const DepositWithdraw = ({ type }: Props) => {
  const { getWalletBalance } = useWallet();
  useEffect(() => {
    getWalletBalance();
  }, []);
  return type === "Deposit" ? <DepositForm /> : <WithdrawForm />;
};

export default DepositWithdraw;
