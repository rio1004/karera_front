import Text from "@/components/Text";
import { WALLET_DESTINATIONS } from "@/constant/transferWallet";
import { TransactionTypeCard } from "./TransactionTypeCard";

interface DestinationWalletsSectionProps {
  selectedDestination: string | null;
  onDestinationSelect: (cardType: string) => void;
}

export const DestinationWalletsSection= ({
  selectedDestination,
  onDestinationSelect,
}: DestinationWalletsSectionProps) => (
  <div className="space-y-4">
    <Text 
      text="Choose a wallet to transfer to" 
      type="h8" 
      className="text-start flex mb-1" 
    />
    <div className="space-y-1.5 mb-4 h-auto">
      {WALLET_DESTINATIONS.map(destination => {
        const shouldShow = !selectedDestination || selectedDestination === destination.type;
        
        if (!shouldShow) return null;
        
        return (
          <TransactionTypeCard
            key={destination.type}
            title={destination.title}
            amount={destination.amount}
            variant={destination.variant}
            width="w-full"
            height="h-[85]"
            isSelected={selectedDestination === destination.type}
            onClick={() => onDestinationSelect(destination.type)}
          />
        );
      })}
    </div>
  </div>
);