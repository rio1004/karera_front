import { OPERATOR_ICON } from "@/constant/image";
import { formatNumber } from "@/utils/formatNumber";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Tab from "../../components/Tab";
import { TRANSACTIONS_OPERATOR } from "@/constant/operatorTransac";
import FilterDownload from "../../components/FilterDownload/FilterDownload";
import Text from "@/components/Text";

const transactionTabs = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Load",
    value: "load",
  },
  {
    label: "Send Credits",
    value: "send Credits",
  },
  {
    label: "Deduct Credits",
    value: "deduct Credits",
  },
];

const OperatorTransactions = () => {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [walletBalance] = useState(0);
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  const filteredTransactions = useMemo(() => {
    if (activeTab === "all") {
      return TRANSACTIONS_OPERATOR;
    }
    return TRANSACTIONS_OPERATOR.filter((transaction) => {
      const transactionType = transaction.transaction_type?.toLowerCase();
      const activeTabLower = activeTab.toLowerCase();
      if (activeTabLower === "load") {
        return transactionType === "load";
      } else if (activeTabLower === "send credits") {
        return transactionType === "send credits";
      } else if (activeTabLower === "deduct credits") {
        return transactionType === "deduct credits";
      }
      return false;
    });
  }, [activeTab]);

  const switchTab = (tab: string) => {
    setActiveTab(tab);
  };

  const handleTransactionClick = (transaction: any) => {
    navigate(`/operator/wallet/transaction-receipt`, {
      state: {
        transaction: transaction,
        walletBalance: walletBalance,
      },
    });
  };

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0">
      {isBalanceVisible ? (
        <section className="bg-[#00A24A] rounded-b-[30px] p-4 text-white flex flex-col items-center">
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold">
              ₱ {formatNumber(walletBalance)}
            </div>
            <button
              className="w-8 h-8 rounded-full flex items-center justify-center"
              onClick={toggleBalanceVisibility}
            >
              <img
                id="eye_icon"
                src={OPERATOR_ICON.refreshYellow.src}
                className="w-4 h-4"
                alt="Toggle visibility"
              />
            </button>
          </div>
        </section>
      ) : (
        <div className="bg-white pl-4 pr-4 text-white flex flex-col items-center mb-[50px]">
          <div className="bg-[#00A24A] rounded-2xl flex items-center justify-center space-x-2 w-full px-4">
            <span className="text-lg p-4 font-semibold">Total Commissions</span>
            <button
              className="w-8 h-8 rounded-full flex items-center justify-center"
              onClick={toggleBalanceVisibility}
            >
              <img
                id="eye_icon_closed"
                src="/icons/eye_icon_closed.svg"
                className="w-4 h-4"
                alt="Toggle visibility"
              />
            </button>
          </div>
        </div>
      )}

      <div className="px-4 py-4 space-y-4 border-1 rounded-2xl border-white mt-[24px] bg-white min-h-[90vh]">
        <Tab
          tabs={transactionTabs}
          onSwitch={(tab: string) => switchTab(tab)}
          defaultTab="all"
          spacing="between"
        />
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Text
              text="Last 30 days"
              type="p2"
              color="disabled"
              className="rounded-sm border-[1px] !p-2 border-[#C4C4C4]"
            />
            <Text
              text="Last 30 days"
              type="p2"
              color="disabled"
              className="rounded-sm border-[1px] !p-2 border-[#C4C4C4]"
            />
          </div>
          <FilterDownload />
        </div>

        <section className="space-y-3 pb-[100px]">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((entry, idx) => (
              <div key={idx}>
                <div
                  className="bg-white rounded-lg border border-gray-200 p-3 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => handleTransactionClick(entry)}
                >
                  <div className="grid grid-cols-2 items-center gap-4">
                    <div>
                      <div className="mb-1">
                        <span className="font-semibold text-gray-800 block">
                          {entry.transaction_type}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {entry.date_time}
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-center text-right space-y-1">
                      <span
                        className={`font-medium ${
                          entry.status === "in progress"
                            ? "text-yellow-500"
                            : "text-green-600"
                        } text-[10px] px-2 py-1 rounded w-fit`}
                      >
                        {entry.status === "in progress"
                          ? "In Progress"
                          : "Completed"}
                      </span>
                      <div className="flex items-center space-x-1">
                        <span
                          className={`font-bold ${
                            entry.transaction_type === "Load"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {entry.transaction_type === "Load" ? "+" : "-"}₱{" "}
                          {formatNumber(entry.amount)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No transactions found for{" "}
              {activeTab === "all" ? "all types" : activeTab}.
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default OperatorTransactions;
