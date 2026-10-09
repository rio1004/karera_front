import { formatNumber } from "@/utils/formatNumber";
import { RecentTransactions } from "./components/RecentTransactions";
import { WaysToTransact } from "./components/WaysToTransact";
import { SendCreditsModal } from "../../components/modal/Modal";
import { useState } from "react";
import type { SendCreditsData, Transaction } from "@/types/operator/receipt";
import { useAuthStore } from "@/store/auth/useAuth";
import { useNavigate } from "react-router-dom";
import { BalanceWallet } from "./components/Balance";
import { useOperatorWalletStore } from "@/store/operator/useWalletStore";

const OperatorWallet = () => {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [isSendCreditsModalOpen, setIsSendCreditsModalOpen] = useState(false);
  const [_, setSelectedTransaction] = useState<Transaction | null>(null);
  const [totalCreditsSent] = useState("15000");
  const [totalWithdrawn] = useState("10000");

  const [transactions] = useState<Transaction[]>([
    {
      id: "1",
      userId: "user123",
      receiverId: "user456",
      type: "deposit",
      amount: "5000",
      status: "completed",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: "",
    },
    {
      id: "2",
      userId: "user123",
      receiverId: "user123",
      type: "sendMoney",
      amount: "3000",
      status: "completed",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: "",
    },
  ]);
  const [balanceUpdatedAt] = useState("December 1, 2024");

  const { totalBalance } = useOperatorWalletStore();

  const user = useAuthStore();
  const navigate = useNavigate();
  const userID = user?.user?.id || "user123";

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  const handleSendCredits = (data: SendCreditsData) => {
    console.log("Send credits data:", data);
    setIsSendCreditsModalOpen(false);
  };

  const returnPositiveOrNegative = (transaction: Transaction) => {
    if (transaction.type === "deposit") {
      return "+";
    } else if (transaction.type === "sendMoney") {
      if (transaction.receiverId === userID) {
        return "+";
      } else {
        return "-";
      }
    } else {
      return "-";
    }
  };

  const handleTransactionClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
  };

  return (
    <div className="bg-white min-h-screen absolute top-0 left-0 right-0">
      <BalanceWallet
        isBalanceVisible={isBalanceVisible}
        walletBalance={totalBalance.toString()}
        totalCreditsSent={totalCreditsSent}
        totalWithdrawn={totalWithdrawn}
        balanceUpdatedAt={balanceUpdatedAt}
        onToggleVisibility={toggleBalanceVisibility}
        formatNumber={formatNumber}
      />

      <div className="bg-white px-4 pt-4 mt-4">
        <WaysToTransact
          onSendCredits={() => navigate("/operator/wallet/send-credits")}
          onRequestCredits={() => navigate("/operator/wallet/request-credits")}
          onWithdraw={() => navigate("/operator/wallet/withdraw-money")}
          onTransfer={() => navigate("/operator/wallet/transfer-money")}
        />
        <RecentTransactions
          transactions={transactions}
          userID={userID}
          onTransactionClick={handleTransactionClick}
          returnPositiveOrNegative={returnPositiveOrNegative}
          formatNumber={formatNumber}
          walletBalance={parseFloat("100.00")}
        />
      </div>

      <SendCreditsModal
        isOpen={isSendCreditsModalOpen}
        onClose={() => setIsSendCreditsModalOpen(false)}
        onSubmit={handleSendCredits}
      />
    </div>
  );
};

export default OperatorWallet;
