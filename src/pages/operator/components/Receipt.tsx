import Text from "@/components/Text";
import type { TransactionReceiptProps } from "@/types/operator/receipt";

const amountColorClasses = {
  green: "text-green-600",
  red: "text-red-500",
  orange: "text-orange-500",
  blue: "text-blue-600",
};

export const TransactionReceipt = ({
  icon,
  label,
  amount,
  amountColor = "green",
  amountPrefix = "",
  transactionData = {},
  onDownloadReceipt,
}: TransactionReceiptProps) => {
  const displayAmount = `${amountPrefix}${amount}`;
  const amountColorClass = amountColorClasses[amountColor];

  return (
    <div className="w-full bg-[url(./../../public/operator/receiptBG.png)] relative bg-contain bg-center bg-no-repeat bg-size-[100%_100%] min-h-[600px]">
      <div className="p-6 text-white relative -top-32 text-center">
        <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-sm text-black font-medium mb-2">{label}</h3>
        <div className={`text-2xl ${amountColorClass}`}>{displayAmount}</div>
      </div>

      <div className="mx-6 -mt-4 rounded-lg absolute top-24 left-0 right-0 text-white space-y-2">
        {/* Game-specific fields for bet transactions */}
        {transactionData.gameName && (
          <div className="flex justify-between text-sm">
            <Text text="Game Name" type="p1" color="#FFFF" />
            <span className="font-medium text-white">
              {transactionData.gameName}
            </span>
          </div>
        )}

        {transactionData.gameId && (
          <div className="flex justify-between text-sm">
            <Text text="Game ID" type="p1" color="#FFFF" />
            <span className="font-medium text-white">
              {transactionData.gameId}
            </span>
          </div>
        )}

        {transactionData.gameRound && (
          <div className="flex justify-between text-sm">
            <Text text="Game Round" type="p1" color="#FFFF" />
            <span className="font-medium text-white">
              {transactionData.gameRound}
            </span>
          </div>
        )}

        {transactionData.betChoice && (
          <div className="flex justify-between text-sm">
            <Text text="Bet Choice" type="p1" color="#FFFF" />
            <span className="font-medium text-white">
              {transactionData.betChoice}
            </span>
          </div>
        )}

        {transactionData.betOdds && (
          <div className="flex justify-between text-sm">
            <Text text="Bet Odds" type="p1" color="#FFFF" />
            <span className="font-medium text-white">
              {transactionData.betOdds}
            </span>
          </div>
        )}

        {/* Standard transaction fields */}
        {transactionData.transactionType && (
          <div className="flex justify-between text-sm">
            <Text text="Transaction Type" type="p1" color="#FFFF" />
            <span className="font-medium text-white">
              {transactionData.transactionType}
            </span>
          </div>
        )}

        {transactionData.transactionNo && (
          <div className="flex justify-between text-sm">
            <Text text="Transaction No." type="p1" color="#FFFF" />
            <span className="font-medium text-white">
              {transactionData.transactionNo}
            </span>
          </div>
        )}

        {transactionData.dateAndTime && (
          <div className="flex justify-between text-sm">
            <Text text="Date and Time" type="p1" color="#FFFF" />
            <span className="font-medium text-white">
              {transactionData.dateAndTime}
            </span>
          </div>
        )}

        {transactionData.status && (
          <div className="flex justify-between text-sm">
            <Text text="Status" type="p1" color="#FFFF" />
            <span className="font-medium text-white">
              {transactionData.status}
            </span>
          </div>
        )}

        {/* Payment method and account info for non-bet transactions */}
        {transactionData.paymentMethod && transactionData.paymentMethod !== "N/A" && (
          <div className="flex justify-between text-sm">
            <Text text="Payment Method" type="p1" color="#FFFF" />
            <span className="font-medium text-white">
              {transactionData.paymentMethod}
            </span>
          </div>
        )}

        {transactionData.accountNo && transactionData.accountNo !== "N/A" && (
          <div className="flex justify-between text-sm">
            <Text text="Account No." type="p1" color="#FFFF" />
            <span className="font-medium text-white">
              {transactionData.accountNo}
            </span>
          </div>
        )}

        {transactionData.bankOrEwallet && transactionData.bankOrEwallet !== "N/A" && (
          <div className="flex justify-between text-sm">
            <Text text="Bank or e-Wallet" type="p1" color="#FFFF" />
            <span className="font-medium text-white">
              {transactionData.bankOrEwallet}
            </span>
          </div>
        )}

        {transactionData.amount && (
          <div className="flex justify-between text-sm">
            <Text text="Amount" type="p1" color="#FFFF" />
            <span className="font-medium text-white">
              {transactionData.amount}
            </span>
          </div>
        )}

        {/* Balance Info */}
        {transactionData.previousBalance && (
          <div className="flex justify-between text-sm pt-3 border-t border-green-400">
            <Text text="Previous Balance" type="p1" color="#FFFF" />
            <span className="font-medium text-white">
              {transactionData.previousBalance}
            </span>
          </div>
        )}

        {transactionData.loadAmount && (
          <div className="flex justify-between text-sm">
            <Text text="Deposit Amount" type="p1" color="#FFFF" />
            <span className="font-medium text-white">
              {transactionData.loadAmount}
            </span>
          </div>
        )}

        {transactionData.withdrawalAmount && (
          <div className="flex justify-between text-sm">
            <Text text="Withdrawal Amount" type="p1" color="#FFFF" />
            <span className="font-medium text-white">
              {transactionData.withdrawalAmount}
            </span>
          </div>
        )}

        {transactionData.sendCreditsAmount && (
          <div className="flex justify-between text-sm">
            <Text text="Send Credits Amount" type="p1" color="#FFFF" />
            <span className="font-medium text-white">
              {transactionData.sendCreditsAmount}
            </span>
          </div>
        )}

        {transactionData.betAmount && (
          <div className="flex justify-between text-sm">
            <Text text="Bet Amount" type="p1" color="#FFFF" />
            <span className="font-medium text-white">
              {transactionData.betAmount}
            </span>
          </div>
        )}

        {transactionData.winAmount && (
          <div className="flex justify-between text-sm">
            <Text text="Win Amount" type="p1" color="#FFFF" />
            <span className="font-medium text-white">
              ₱{transactionData.winAmount}
            </span>
          </div>
        )}

        {transactionData.updatedBalance && (
          <div className="flex justify-between text-xl font-bold pt-3 mb-4">
            <Text text="Updated Balance" type="p1" color="#FFFF" />
            <span>{transactionData.updatedBalance}</span>
          </div>
        )}
      </div>

      {/* Download */}
      {onDownloadReceipt && (
        <div className="p-4 text-center">
          <button
            onClick={onDownloadReceipt}
            className="text-blue-500 hover:text-blue-700 text-sm font-medium transition-colors duration-200 bottom-12 absolute left-0 right-0"
          >
            Download Receipt
          </button>
        </div>
      )}
    </div>
  );
};