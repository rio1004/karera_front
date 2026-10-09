import Image from "@/components/Image";
import Text from "@/components/Text";
import { OPERATOR_ICON } from "@/constant/image";
import { useWalletOp } from "@/hooks/operator/useOperatorWallet";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const BalanceWallet = ({
  isBalanceVisible,
  walletBalance,
  balanceUpdatedAt,
  onToggleVisibility,
  formatNumber,
}: {
  isBalanceVisible: boolean;
  walletBalance: string;
  totalCreditsSent: string;
  totalWithdrawn: string;
  balanceUpdatedAt: string;
  onToggleVisibility: () => void;
  formatNumber: (value: string) => string;
}) => {
  const { getOperatorWalletBalannce } = useWalletOp();

  const navigate = useNavigate();

  if (isBalanceVisible) {
    return (
      <section
        className="rounded-b-[30px] pt-6 px-4 pb-8 text-white flex flex-col items-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${OPERATOR_ICON.walletBG.src})`,
        }}
      >
        <div className="flex justify-between w-full">
          <button onClick={() => navigate(-1)} className="p-1">
            <ChevronLeft />
          </button>
          <Text type="h8" text="Wallet" color="#FFFF" />
          <Image
            path={OPERATOR_ICON.walletMoney.src}
            className="w-[24px] h-[24px]"
          />
        </div>
        <h2 className="text-sm mb-2 opacity-90">Overall Balance</h2>
        <div className="flex items-center gap-3">
          <div className="text-3xl font-bold">
            ₱ {formatNumber(walletBalance)}
          </div>
          <button
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            onClick={() => getOperatorWalletBalannce()}
          >
            <img
              src={OPERATOR_ICON.refreshYellow.src}
              className="w-4 h-4"
              alt="Toggle visibility"
            />
          </button>
        </div>
        <p className="text-xs opacity-75 mt-3">
          Updated as of {balanceUpdatedAt}
        </p>
      </section>
    );
  }

  return (
    <div className="pt-16 px-4 pb-4">
      <div className="bg-[#00A24A] rounded-2xl flex items-center justify-between px-4 py-4">
        <span className="text-lg font-semibold text-white">
          Total Wallet Balance
        </span>
        <button
          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
          onClick={onToggleVisibility}
        >
          <img
            src="/icons/eye_icon_closed.svg"
            className="w-4 h-4"
            alt="Toggle visibility"
          />
        </button>
      </div>
    </div>
  );
};
