import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type {
  Transaction,
  TransactionReceiptProps,
} from "@/types/operator/receipt";
import { formatNumber } from "@/utils/formatNumber";
import { useAuthStore } from "@/store/auth/useAuth";
import { usePlayerTransactionStore } from "@/store/player/useTransaction";
import { TransactionReceipt } from "@/pages/operator/components/Receipt";
import Image from "@/components/Image";
import { ICONS, OPERATOR_ICON } from "@/constant/image";
import Text from "@/components/Text";

const TransactionReceiptPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = useAuthStore((state) => state.user);
  const userID = user?.id;

  const { transaction, walletBalance, transactionId } = location.state || {};
  const {
    selectedTransactionDetail,
    loadingTransaction,
    transactionError,
    getTransactionById,
  } = usePlayerTransactionStore();

  useEffect(() => {
    if (transactionId && !selectedTransactionDetail) {
      getTransactionById(transactionId);
    }
  }, [transactionId, selectedTransactionDetail, getTransactionById]);

  const returnPositiveOrNegative = (transaction: Transaction) => {
    if (transaction.type === "deposit") {
      return "+";
    } else if (transaction.type === "sendMoney") {
      return transaction.receiverId === userID ? "+" : "-";
    } else {
      return "-";
    }
  };

  const generateReceiptData = (transaction: Transaction) => {
    const isPositive = returnPositiveOrNegative(transaction) === "+";
    const amountColor: "green" | "red" | "orange" | "blue" = isPositive
      ? "green"
      : "red";
    const prefix = returnPositiveOrNegative(transaction);

    const getTransactionIcon = () => {
      switch (transaction.type) {
        case "deposit":
          return <Image path={ICONS.depositReceipt.src} />;
        case "withdraw":
          return <Image path={ICONS.withdrawReceipt.src} />;
        case "sendMoney":
          return <Image path={OPERATOR_ICON.sendMoney.src} />;
        case "bet":
          return <Image path={ICONS.bet.src} />;
        case "gift":
          return <Image path={ICONS.sendGift.src} />;
        default:
          return <Image path={OPERATOR_ICON.withdrawMoney.src} />;
      }
    };

    const getLabel = () => {
      switch (transaction.type) {
        case "deposit":
          return "Deposit Amount";
        case "withdraw":
          return "Withdrawal Amount";
        case "sendMoney":
          return transaction.receiverId === userID
            ? "Received Credits"
            : "Send Credits Amount";
        case "bet":
          return "Bet";
        case "gift":
          return "Send Gift";
        default:
          return "Transaction Amount";
      }
    };

    const getTransactionTypeLabel = () => {
      switch (transaction.type) {
        case "deposit":
          return "Load Credits";
        case "withdraw":
          return "Withdraw";
        case "sendMoney":
          return transaction.receiverId === userID
            ? "Receive Credits"
            : "Send Credits";
        case "bet":
          return "Game Bet";
        default:
          return "Transaction";
      }
    };
    const transactionData = selectedTransactionDetail
      ? {
          ...(transaction.type === "bet" &&
            selectedTransactionDetail.bet &&
            selectedTransactionDetail.game &&
            selectedTransactionDetail.gameSession && {
              gameId: selectedTransactionDetail.game.id.toString(),
              gameName: selectedTransactionDetail.game.name,
              gameRound: selectedTransactionDetail.gameSession.round,
              betChoice: selectedTransactionDetail.bet.choice,
              betOdds: selectedTransactionDetail.bet.odds,
              winAmount: selectedTransactionDetail.bet.winAmount,
            }),
          paymentMethod:
            transaction.type === "withdraw" ? "Bank or e-Wallet" : "N/A",
          accountNo: userID?.toString().slice(-8) || "N/A",
          transactionType: getTransactionTypeLabel(),
          transactionNo: selectedTransactionDetail.transaction.id.toString(),
          dateAndTime: new Date(
            selectedTransactionDetail.transaction.updatedAt ||
              selectedTransactionDetail.transaction.updatedAt
          ).toLocaleString(),
          status:
            selectedTransactionDetail.transaction.status === "in progress"
              ? "In Progress"
              : "Completed",
          amount: `₱${formatNumber(
            selectedTransactionDetail.transaction.amount
          )}`,
          previousBalance: selectedTransactionDetail.bet?.meta?.previousBalance
            ? `₱${formatNumber(
                selectedTransactionDetail.bet.meta.previousBalance
              )}`
            : `₱${formatNumber(walletBalance || 0)}`,
          ...(transaction.type === "deposit" && {
            loadAmount: `+₱${formatNumber(
              selectedTransactionDetail.transaction.amount
            )}`,
          }),
          ...(transaction.type === "withdraw" && {
            withdrawalAmount: `-₱${formatNumber(
              selectedTransactionDetail.transaction.amount
            )}`,
          }),
          ...(transaction.type === "sendMoney" && {
            sendCreditsAmount: `${prefix}₱${formatNumber(
              selectedTransactionDetail.transaction.amount
            )}`,
          }),
          ...(transaction.type === "bet" && {
            betAmount: `-₱${formatNumber(
              selectedTransactionDetail.transaction.amount
            )}`,
          }),
          ...(transaction.type === "gift" && {
            giftAmount: `+₱${formatNumber(
              selectedTransactionDetail.transaction.amount
            )}`,
          }),
          updatedBalance: selectedTransactionDetail.bet?.meta?.updatedBalance
            ? `₱${formatNumber(
                selectedTransactionDetail.bet.meta.updatedBalance
              )}`
            : `₱${formatNumber(walletBalance || 0)}`,
          bankOrEwallet: "N/A",
        }
      : {
          ...(transaction.type === "bet" && {
            gameId: transaction.gameId?.toString() || "N/A",
          }),
          paymentMethod:
            transaction.type === "withdraw" ? "Bank or e-Wallet" : "N/A",
          accountNo: userID?.toString().slice(-8) || "N/A",
          transactionType: getTransactionTypeLabel(),
          transactionNo: transaction.id?.toString() || "N/A",
          dateAndTime: new Date(transaction.createdAt).toLocaleString(),
          status:
            transaction.status === "in progress" ? "In Progress" : "Completed",
          amount: `₱${formatNumber(parseFloat(transaction.amount.toString()))}`,
          previousBalance: `₱${formatNumber(walletBalance || 0)}`,
          ...(transaction.type === "deposit" && {
            loadAmount: `+₱${formatNumber(
              parseFloat(transaction.amount.toString())
            )}`,
          }),
          ...(transaction.type === "withdraw" && {
            withdrawalAmount: `-₱${formatNumber(
              parseFloat(transaction.amount.toString())
            )}`,
          }),
          ...(transaction.type === "sendMoney" && {
            sendCreditsAmount: `${prefix}₱${formatNumber(
              parseFloat(transaction.amount.toString())
            )}`,
          }),
          ...(transaction.type === "bet" && {
            betAmount: `-₱${formatNumber(
              parseFloat(transaction.amount.toString())
            )}`,
          }),
          ...(transaction.type === "gift" && {
            giftAmount: `+₱${formatNumber(
              parseFloat(transaction.amount.toString())
            )}`,
          }),
          updatedBalance: `₱${formatNumber(walletBalance || 0)}`,
        };

    return {
      icon: getTransactionIcon(),
      label: getLabel(),
      amount: `₱${formatNumber(
        selectedTransactionDetail?.transaction.amount || transaction.amount || 0
      )}`,
      amountColor,
      amountPrefix: prefix,
      transactionData,
    } as TransactionReceiptProps;
  };

  const handleDownloadReceipt = () => {
    console.log("Download receipt clicked");
  };

  if (transactionId && loadingTransaction) {
    return (
      <div className="absolute left-0 right-0 top-36 w-full">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <Text text="Loading transaction details..." type="p1" />
          </div>
        </div>
      </div>
    );
  }

  if (transactionId && transactionError) {
    return (
      <div className="absolute left-0 right-0 top-36 w-full">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="bg-red-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <span className="text-red-600 text-2xl">⚠</span>
            </div>
            <Text text={transactionError || "An error occurred"} type="p1" />
            <button
              onClick={() => navigate(-1)}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentTransaction =
    selectedTransactionDetail?.transaction || transaction;

  if (!currentTransaction) {
    return (
      <div className="absolute left-0 right-0 top-36 w-full">
        <div className="min-h-screen flex items-center justify-center">
          <div>Transaction not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute left-0 right-0 top-36 w-full">
      <TransactionReceipt
        {...generateReceiptData(currentTransaction)}
        onDownloadReceipt={handleDownloadReceipt}
        onClose={() => navigate("/operator/wallet")}
      />
    </div>
  );
};

export default TransactionReceiptPage;
