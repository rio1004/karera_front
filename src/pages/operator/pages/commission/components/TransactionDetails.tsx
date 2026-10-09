import type { Transaction } from "@/types/operator/representative";
import { ArrowLeft } from "lucide-react";

export const TransactionDetail = ({
  transaction,
  onBack,
}: {
  transaction: Transaction;
  onBack: () => void;
}) => (
  <main>
    <button
      onClick={onBack}
      className="mb-4 flex items-center gap-2 text-green-600 hover:text-green-700 
                 transition-colors"
    >
      <ArrowLeft size={16} />
      Back to Players
    </button>

    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-xl font-bold mb-6 text-gray-900">
        Transaction Details
      </h2>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Transaction No.
            </label>
            <p className="text-lg font-semibold">{transaction.transactionNo}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Transaction Date
            </label>
            <time className="text-lg font-semibold">
              {transaction.transactionDate}
            </time>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Game ID
          </label>
          <p className="text-lg font-semibold">{transaction.gameId}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Bet
            </label>
            <p className="text-lg font-semibold">{transaction.bet}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Bet Amount
            </label>
            <p className="text-lg font-semibold">
              ₱{transaction.betAmount.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="border-t pt-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Operator Commission ({transaction.operatorCommission}%)
              </label>
              <p className="text-lg font-semibold">
                {transaction.operatorCommission}%
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Franchise Tax ({transaction.franchiseTax}%)
              </label>
              <p className="text-lg font-semibold">
                {transaction.franchiseTax}%
              </p>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <label className="block text-sm font-medium text-green-700 mb-1">
              Net Operator Commission
            </label>
            <p className="text-2xl font-bold text-green-600">
              ₱{transaction.netOperatorCommission.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>
);
