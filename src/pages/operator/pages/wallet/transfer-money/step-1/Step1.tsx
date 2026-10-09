import { useNavigate } from "react-router-dom";
import Text from "@/components/Text";
import { TransactionTypeCard } from "../../components/TransactionTypeCard";
import { useTransferMoneyStore } from "@/store/operator/useTransferMoney";
import { useOperatorWalletStore } from "@/store/operator/useWalletStore";
import { formatToPeso } from "@/utils/utils.helper";

export const TransferMoneyStep1 = () => {
  const navigate = useNavigate();
  const { transferData, updateTransferData } = useTransferMoneyStore();
  const { wallets } = useOperatorWalletStore();
  const handleCardSelect = (cardType: string) => {
    updateTransferData({
      selectedCard: cardType,
      selectedDestination: null,
      amount: null,
    });
    navigate("/operator/wallet/transfer-money/step-2");
  };

  return (
    <div className="p-6 space-y-4">
      <div>
        <Text
          text="Select a wallet to transfer from"
          type="h8"
          className="text-start flex"
        />
      </div>

      <div className="space-y-4">
        <TransactionTypeCard
          title="Commission"
          amount={wallets.commission.balance}
          variant="commission"
          width="w-full"
          height="h-[149px]"
          isSelected={transferData.selectedCard === "commission"}
          onClick={() => handleCardSelect("commission")}
        />

        <TransactionTypeCard
          title="Game Credits"
          amount={wallets.game.balance}
          variant="credits"
          width="w-full"
          height="h-[85]"
          isSelected={transferData.selectedCard === "credits"}
          onClick={() => handleCardSelect("credits")}
        />
      </div>
    </div>
  );
};
