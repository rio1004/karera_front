import Divider from "@/components/Divider";
import Image from "@/components/Image";
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";
import type { TransactionPayload, WithdrawIcorePayload } from "@/types/player/wallet";
import { useWallet } from "@/hooks/player/useWallet";
import Text from "@/components/Text";
import { formatToPeso } from "@/utils/utils.helper";
import { useAuthStore } from "@/store/auth/useAuth";

const ConfirmWithdraw = () => {
  const { watch } = useFormContext();
  const { withdraw, isLoading, withdraw_icore_payments } = useWallet();
  const creditAmount = watch("withdrawAmount");
  const phoneNo = watch("phoneNo");
  const modeOfPayment = watch("modeOfPayment");


  const {user} = useAuthStore()

  const handleWithdraw = () => {
  const payload: WithdrawIcorePayload = {
    amount: creditAmount,
    bankId: modeOfPayment,
    fullName: user?.userName || "",
    email: user?.email || "",
    phoneNumber: phoneNo || "", 
    address: "",  
    remark: "",  
    accountNumber: phoneNo || "", 
  };
  
  withdraw_icore_payments(payload); 
};
  return (
    <div className="flex flex-col gap-5">
      <Text
        type="h3"
        text={formatToPeso(creditAmount)}
        color="#000"
        weight="medium"
      />
      <Divider width="100%" type="dashed" borderColor="#C4C4C4" />
      <div className="flex justify-between items-center">
        <Text text="Payment Method:" type="p1" color="#5B5B5B" />
        <Image path={`/icons/${modeOfPayment}.png`} className="h-[38px]" />
      </div>
      <div className="flex justify-between items-center">
        <Text text="Account Number:" type="p1" color="#5B5B5B" />
        <Text text={phoneNo} type="h6" color="#000" weight="bold" />
      </div>
      <div className="flex justify-between items-center">
        <Text text="Service Fee:" type="p1" color="#5B5B5B" />
        <Text text={formatToPeso(0)} type="h6" color="#000" weight="bold" />
      </div>
      <Divider width="100%" type="dashed" borderColor="#C4C4C4" />
      <div className="flex justify-between items-center">
        <Text text="Total Withdrawal Amount:" type="p1" color="#5B5B5B" />
        <Text
          text={formatToPeso(creditAmount)}
          type="h6"
          color="#000"
          weight="bold"
        />
      </div>

      <Button variant={"green"} onClick={handleWithdraw} disabled={isLoading}>
        Confirm
      </Button>
    </div>
  );
};

export default ConfirmWithdraw;
