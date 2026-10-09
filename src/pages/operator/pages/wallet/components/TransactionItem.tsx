import { useNavigate } from "react-router-dom";
import type { Transaction } from "@/types/operator/receipt";
import { Badge } from "@/components/ui/badge";
import { usePlayerTransactionStore } from "@/store/player/useTransaction";

type TransactionItemProps = {
  transaction: Transaction;
  userID: string;
  formatNumber: (value: string | number) => string;
  walletBalance: number;
  type?: "player" | "operator";
};

export const TransactionItem = ({
  transaction,
  userID,
  formatNumber,
  walletBalance,
  type = "operator",
}: TransactionItemProps) => {
  const navigate = useNavigate();

  const { getTransactionById } = usePlayerTransactionStore();
  const handleTransactionClick = async () => {
    await getTransactionById(transaction?.id?.toString());
    
    const route =
      type === "player"
        ? "/player/wallet/transaction-receipt"
        : "/operator/wallet/transaction-receipt";

    navigate(route, {
      state: {
        transaction: transaction,
        walletBalance: walletBalance,
        transactionId: transaction?.id?.toString()
      },
    });
  };

  const getTransactionInfo = (transaction: Transaction) => {
    const transactionType = transaction?.type?.toLowerCase();
    if (transactionType === "bet") {
      const gameIdMap: { [key: string]: { name: string; color: string } } = {
        "1": { name: "Dos Letra", color: "bg-blue-500" },
      };

      const gameIdStr = transaction?.gameId?.toString() ?? "";
      const badge = gameIdMap[gameIdStr] || {
        name: "Game",
        color: "bg-gray-500",
      };
      
      return {
        isGame: true,
        displayName: "Bet",
        badge,
      };
    }

    const displayNames: { [key: string]: string } = {
      deposit: "Deposit",
      withdraw: "Withdraw",
      sendmoney: "Send Money",
      deduct: "Deduct Credits",
      winnings: "Winnings",
      losebet: "Lose Bet",
    };

    return {
      isGame: false,
      displayName: displayNames[transactionType] || transaction.type,
      badge: null,
    };
  };

  const transactionInfo = getTransactionInfo(transaction);

  return (
    <div
      key={transaction.id}
      className="bg-white rounded-lg border border-gray-200 p-3 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={() => handleTransactionClick()}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span
            className="font-semibold text-gray-800"
            data-id={transaction.id}
          >
            {transactionInfo.displayName}
          </span>
          {transactionInfo.isGame && transactionInfo.badge && (
            <Badge
              variant="secondary"
              className="bg-blue-500 rounded-full text-white dark:bg-blue-600"
            >
              <span className="text-xs px-2 flex">
                {transactionInfo.badge.name}
              </span>
            </Badge>
          )}
        </div>
        <span
          className={`font-bold ${
            transaction.type === "deposit" ||
            (transaction.type === "sendMoney" &&
              transaction.receiverId === userID)
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          ₱ {formatNumber(transaction.amount)}
        </span>
      </div>

      <div className="flex justify-between items-center text-xs mt-1">
        <span className="text-gray-500">
          {new Date(
            transaction.createdAt || transaction.updatedAt
          ).toLocaleDateString()}{" "}
          &nbsp;
          {new Date(
            transaction.createdAt || transaction.updatedAt
          ).toLocaleTimeString()}
        </span>
        <span
          className={`font-medium ${
            transaction.status === "in progress"
              ? "text-yellow-500"
              : "text-green-600"
          }`}
        >
          {transaction.status === "in progress" ? "In Progress" : "Completed"}
        </span>
      </div>
    </div>
  );
};