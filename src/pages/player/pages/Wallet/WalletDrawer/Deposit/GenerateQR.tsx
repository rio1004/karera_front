import Text from "@/components/Text";
import Image from "@/components/Image";
import { Button } from "@/components/ui/button";
import { useWalletStore } from "@/store/player/useWalletStore";
import { useWallet } from "@/hooks/player/useWallet";
import type { TransactionPayload } from "@/types/player/wallet";
import { formatToPeso } from "@/utils/utils.helper";
import Divider from "@/components/Divider";

const GenerateQR = ({ amount }: { amount: number }) => {
  const { setShowSupportedBank, setShowGenerateQR, setShowDrawer } =
    useWalletStore();
  const { deposit } = useWallet();

  const handleDeposit = () => {
    const modeOfPayment = "icore"; // current payment
    const payload: TransactionPayload = {
      amount,
    };
    deposit(payload, modeOfPayment);
    setShowGenerateQR(false);
    setShowDrawer(false);
  };
  return (
    <>
      <div className="flex flex-col items-center">
        <Text
          type="p1"
          text="Transaction ID 2316194931"
          color="#5B5B5B"
          className="my-5"
        />
        <Text
          type="h8"
          text="Scan this QR Code to Pay"
          weight="bold"
          color="#5B5B5B"
          className="mb-3"
        />
        <p className="text-[#5B5B5B] text-center mb-5">
          Use your{" "}
          <span
            className="text-success underline"
            onClick={() => setShowSupportedBank(true)}
          >
            Bank or e-Wallet’s
          </span>{" "}
          App to scan QR code
        </p>
        <Image path="/icons/qrcode.png" className="w-[204px] h-[204px] mb-5" />
        <Text
          text={formatToPeso(amount)}
          type="h6"
          color="#000"
          weight="bold"
          className="mb-5"
        />
        <Divider width="100%" type="dashed" borderColor="#C4C4C4" />
        <Button
          type="button"
          variant={"green"}
          className="my-5 text-[16px] w-[unset]"
          onClick={handleDeposit}
        >
          Download QRPH Code
        </Button>
        <Text
          text="This QRPh Code is valid for 5 minutes only."
          type="p1"
          color="#5B5B5B"
          weight="bold"
        />
      </div>
    </>
  );
};

export default GenerateQR;
