import { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";

import Tab from "@/pages/operator/components/Tab";
import { DateFilterButton } from "@/pages/player/components/DateFilterButton";
import { usePlayerTransactionStore } from "@/store/player/useTransaction";
import { TransactionItem } from "@/pages/operator/pages/wallet/components/TransactionItem";
import { DateRangePicker } from "@/pages/player/components/DateRangeFIlter";
import Pagination from "../../messages/components/Pagination";
import Text from "@/components/Text";

import type { Transaction } from "@/types/operator/receipt";

type Props = {
  type?: "player" | "operator";
  userID?: string;
  walletBalance?: number;
};

const ITEMS_PER_PAGE = 5; // 5 items per page as shown in your UI

export const TransactionHistory = ({
  userID = "",
  walletBalance = 0,
}: Props) => {
  const [activeTab, setActiveTab] = useState("all");
  const [activeDateFilter, setActiveDateFilter] = useState("");
  const [customDateRange, setCustomDateRange] = useState({
    start: "",
    end: "",
  });
  const [currentPage, setCurrentPage] = useState(1);

  const { 
    transactions, 
    loading, 
    count, 
    fetchTransactions, 
    setFilters, 
    clearSelectedTransaction 
  } = usePlayerTransactionStore();

  const transactionTypes = [
    { label: "All", value: "all" },
    { label: "Deposit", value: "deposit" },
    { label: "Withdraw", value: "withdraw" },
    { label: "Game", value: "game" },
  ];

  const dateFilters = [
    { label: "Last 30 days", value: "last30" },
    { label: "Last 7 days", value: "last7" },
  ];

  // Calculate pagination info
  const startItem = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endItem = Math.min(currentPage * ITEMS_PER_PAGE, count);

  // Clear selected transaction when component mounts
  useEffect(() => {
    clearSelectedTransaction();
  }, [clearSelectedTransaction]);

  useEffect(() => {
    const filters: Record<string, any> = {
      limit: ITEMS_PER_PAGE,
      offset: (currentPage - 1) * ITEMS_PER_PAGE,
    };

    if (activeTab !== "all") {
      filters.type = activeTab;
    }

    console.log("tabact", activeTab);

    const now = new Date();
    if (activeDateFilter === "last7") {
      const start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      filters.startDate = start.toISOString().split("T")[0];
      filters.endDate = now.toISOString().split("T")[0];
    } else if (activeDateFilter === "last30") {
      const start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      filters.startDate = start.toISOString().split("T")[0];
      filters.endDate = now.toISOString().split("T")[0];
    } else if (
      activeDateFilter === "custom" &&
      customDateRange.start &&
      customDateRange.end
    ) {
      filters.startDate = customDateRange.start;
      filters.endDate = customDateRange.end;
    }

    setFilters(filters);
    fetchTransactions();
  }, [
    activeTab,
    activeDateFilter,
    customDateRange,
    currentPage,
    setFilters,
    fetchTransactions,
  ]);

  const switchTab = (tab: string) => {
    setActiveTab(tab);
  };

  const handleDateFilterChange = (filter: string) => {
    setActiveDateFilter(filter);
    setCustomDateRange({ start: "", end: "" });
    setCurrentPage(1);
  };

  const handleCustomDateApply = (start: string, end: string) => {
    setCustomDateRange({ start, end });
    setActiveDateFilter("custom");
    setCurrentPage(1);
  };

  const formatNumber = (value: string | number) =>
    parseFloat(value.toString()).toLocaleString();

  if (loading) {
    return (
      <div className="space-y-6 p-6 min-h-screen">
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
          <Text text="Loading transactions..." type="h5" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 min-h-screen">
      <Tab
        tabs={transactionTypes}
        onSwitch={(tab: string) => switchTab(tab)}
        defaultTab="all"
        activeTab={activeTab}
        spacing="between"
      />

      <div className="flex justify-between items-center gap-3">
        <div className="flex gap-2">
          {dateFilters.map(({ label, value }) => (
            <DateFilterButton
              key={value}
              label={label}
              isActive={activeDateFilter === value}
              onClick={() => handleDateFilterChange(value)}
            />
          ))}
        </div>

        <DateRangePicker
          onApply={handleCustomDateApply}
          icon={<CalendarDays color="#448033" />}
        />
      </div>

      <div className="space-y-4">
        {transactions.length === 0 ? (
          <div className="text-center py-10">
            <Text text="NO TRANSACTIONS" type="h5" />
          </div>
        ) : (
          <>
            {transactions.map((transaction) => (
              <TransactionItem
                key={transaction.id}
                type="player"
                transaction={transaction as unknown as Transaction}
                userID={userID}
                formatNumber={formatNumber}
                walletBalance={walletBalance}
              />
            ))}

            <div className="flex flex-col justify-between min-h-24 items-center mt-6">
              <div className="text-sm text-end justify-end w-full text-gray-600">
                Showing {startItem}-{endItem} of {count} entries
              </div>

              {count > 1 && (
                <Pagination
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPages={Math.ceil(count / ITEMS_PER_PAGE)}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};