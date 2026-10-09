import ConfirmPayment from "./Deposit/ConfirmPayment";
import GenerateQR from "./Deposit/GenerateQR";
import { useWalletStore } from "@/store/player/useWalletStore";
import Text from "@/components/Text";
import CustomDrawer from "../../../components/Drawer";
import ConfirmWithdraw from "./Withdraw/ConfirmWithdraw";

type Props = {
  amount: number;
  type: "Withdraw" | "Deposit";
};

const WalletDrawer = ({ amount, type }: Props) => {
  const { showDrawer, setShowDrawer, showGenerateQR, showConfirmWithdraw } =
    useWalletStore();

  return (
    <CustomDrawer setShowDrawer={setShowDrawer} showDrawer={showDrawer}>
      {" "}
      <div className="p-5 flex flex-col gap-5 overflow-y-auto max-h-[90vh]">
        <div className="flex items-center justify-center gap-3">
          <img src="/icons/deposit.png" alt="" className="w-[31px] h-[31px]" />
          <Text type="h6" text={type} color="#000" align="end" />
        </div>
        {type === "Deposit" &&
          (showGenerateQR ? (
            <GenerateQR amount={amount} />
          ) : (
            <ConfirmPayment amount={amount} />
          ))}
        {type == "Withdraw" && showConfirmWithdraw && <ConfirmWithdraw />}
      </div>
    </CustomDrawer>
  );
};

export default WalletDrawer;
