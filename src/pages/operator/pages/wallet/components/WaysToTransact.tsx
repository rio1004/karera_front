import { UI_COLORS } from "@/constant/colors";
import { OPERATOR_ICON } from "@/constant/image";
import { WalletCard } from "./WalletCard";
import HeaderTitle from "@/pages/operator/components/HeaderTitle";

export const WaysToTransact = ({
  onSendCredits,
  onWithdraw,
  onTransfer,
  onRequestCredits,
}: {
  onSendCredits: () => void;
  onWithdraw: () => void;
  onTransfer: () => void;
  onRequestCredits: () => void;
}) => (
  <>
    <HeaderTitle
      icon={OPERATOR_ICON.transactionPhp.src}
      label="Ways to Transact"
    />
    <div className="space-y-3 grid grid-cols-2 gap-4 mb-6">
      <WalletCard
        title="Send Credits"
        icon={OPERATOR_ICON.sendMoney.src}
        iconAlt="Send Credits"
        background={UI_COLORS.LINEAR.yellow}
        onClick={onSendCredits}
        color="#000000"
      />

      <WalletCard
        title="Transfer Money"
        icon={OPERATOR_ICON.transfer.src}
        iconAlt="Withdraw"
        background={UI_COLORS.LINEAR.light_blue}
        onClick={onTransfer}
        color="#FFFFFF"
      />

      <WalletCard
        title="Request Credit"
        icon={OPERATOR_ICON.cashin.src}
        iconAlt="Send Credits"
        background={UI_COLORS.LINEAR.green}
        onClick={onRequestCredits}
        color="#FFFFFF"
      />

      <WalletCard
        title="Withdraw"
        icon={OPERATOR_ICON.cashout.src}
        iconAlt="Withdraw"
        background={UI_COLORS.LINEAR.red}
        onClick={onWithdraw}
        color="#FFFFFF"
      />
    </div>
  </>
);
