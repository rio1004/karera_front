import Text from "@/components/Text";
import Divider from "@/components/Divider";
import Image from "@/components/Image";
import { Button } from "@/components/ui/button";
import { useWalletStore } from "@/store/player/useWalletStore";
import { formatToPeso } from "@/utils/utils.helper";
import { useFormContext } from "react-hook-form";
import type {
  DepositIcorePayload,
} from "@/types/player/wallet";
import { WalletServices } from "@/api/services/wallet.service";
import { useAuthStore } from "@/store/auth/useAuth";

type Props = {
  amount: number;
};
const ConfirmPayment = ({ amount }: Props) => {
  const { watch, getValues } = useFormContext();
  const { setShowGenerateQR } = useWalletStore();
  const user = useAuthStore(); 
  const modeOfPayment = watch("modeOfPayment");

const handleConfirm = async () => {
  try {
    if (modeOfPayment === "icore") {
      const formValues = getValues();

      const icorePayload: DepositIcorePayload = {
        amount: amount,
        fullName: formValues.fullName || "",
        email: formValues.email || "",
        phoneNumber: formValues.phoneNumber || "",
        address: formValues.address || "",
        remark: formValues.remark || "",
      };
      const response = await WalletServices.depositIcore(icorePayload, user);
      if (response?.redirectUrl) {
        window.location.href = response.redirectUrl;
      } else {
        setShowGenerateQR(true);
      }
    } else {
      setShowGenerateQR(true);
    }
  } catch (error) {
    console.error("Deposit failed:", error);
  }
};

  return (
    <div className="flex flex-col gap-5">
      <Text
        type="h3"
        text={formatToPeso(amount)}
        color="#000"
        weight="medium"
      />
      <Divider width="100%" type="dashed" borderColor="#C4C4C4" />
      <div className="flex justify-between items-center">
        <Text text="Payment Method:" type="p1" color="#5B5B5B" />
        <Image path={`/icons/${modeOfPayment}.png `} className="h-[38px]" />
      </div>
      <div className="flex justify-between items-center">
        <Text text="Total Amount:" type="p1" color="#5B5B5B" />
        <Text
          text={formatToPeso(amount)}
          type="h6"
          color="#000"
          weight="bold"
        />
      </div>
      <Button variant={"green"} onClick={handleConfirm}>
        Confirm
      </Button>
    </div>
  );
};

export default ConfirmPayment;