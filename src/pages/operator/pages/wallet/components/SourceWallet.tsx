import Text from "@/components/Text";
import { TransactionTypeCard } from "./TransactionTypeCard";
import { getCardTitle } from "@/constant/transferWallet";
import { useOperatorWalletStore } from "@/store/operator/useWalletStore";

interface SourceWalletSectionProps {
  selectedCard: string;
}

export const SourceWalletSection = ({
  selectedCard,
}: SourceWalletSectionProps) => {
  const { wallets } = useOperatorWalletStore();
  return (
    <div className="flex flex-col gap-2">
      <Text
        text="Select a wallet to transfer from"
        type="h8"
        className="text-start flex mb-1"
      />
      <TransactionTypeCard
        title={getCardTitle(selectedCard)}
        amount={
          selectedCard == "credits"
            ? wallets.game.balance
            : wallets.commission.balance
        }
        variant={selectedCard as "commission" | "credits" | "load"}
        width="w-full"
        height="h-[85]"
        isSelected={true}
      />
    </div>
  );
};
