import { OPERATOR_ICON } from "@/constant/image";
import { TransactionItem } from "./TransactionItem";
import { useNavigate } from "react-router-dom";
import type { RecentTransactionsProps } from "@/types/operator/receipt";
import HeaderTitle from "@/pages/operator/components/HeaderTitle";

export const RecentTransactions = ({
  transactions,
  userID,
  returnPositiveOrNegative,
  formatNumber,
  walletBalance,
  maxItems = 10,
  showViewAll = true,
}: RecentTransactionsProps) => {
  const navigate = useNavigate();

  const handleViewAll = () => {
    navigate("/operator/wallet/transactions");
  };

  const displayedTransactions = transactions.slice(0, maxItems);

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <HeaderTitle
          icon={OPERATOR_ICON.receipt.src}
          label="Recent Transactions"
        />
        {showViewAll && transactions.length > 0 && (
          <button onClick={handleViewAll}>View All</button>
        )}
      </div>

      <div className="space-y-4">
        {displayedTransactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            userID={userID}
            returnPositiveOrNegative={returnPositiveOrNegative}
            formatNumber={formatNumber}
            walletBalance={walletBalance}
          />
        ))}
      </div>

      {transactions.length > maxItems && (
        <div>+{transactions.length - maxItems} more transactions</div>
      )}
    </div>
  );
};
