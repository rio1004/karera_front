import Text from "@/components/Text";
import Image from "@/components/Image";
import { useWalletStore } from "@/store/player/useWalletStore";
import { formatToPeso } from "@/utils/utils.helper";
import { useWallet } from "@/hooks/player/useWallet";

const Balance = () => {
  const { walletBalance } = useWalletStore();
  const { getWalletBalance } = useWallet();

  return (
    <div
      className="bg-[#00A24A] flex flex-col items-center justify-center"
      onClick={getWalletBalance}
    >
      <Text type="p1" text="My Balance" color="white" />
      <div className="flex justify-center items-center gap-4 pb-5">
        <Text type="h3" text={formatToPeso(walletBalance)} color="white" />
        <Image path="/icons/refresh.png" />
      </div>
    </div>
  );
};

export default Balance;
