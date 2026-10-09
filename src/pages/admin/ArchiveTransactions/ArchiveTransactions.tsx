import { useEffect } from "react";
import { ReportTable } from "@/components/ReportTable";
import { useTransactionStore } from "@/store/admin/useTransaction";
import { DateRangePicker } from "@/components/DateRangePicker";
import dayjs from "dayjs";
import { useDateFilter } from "@/store/admin/useDateFilter";
import { useArchiveTransactionStore } from "@/store/admin/useArchiveTransaction";

export const ArchiveTransactionTable = () => {
  const {
    transactionsData,
    transactionCurrentPage,
    transactionRowsPerPage,
    setTransactionsData,
    setTransactionCurrentPage,
    setTransactionRowsPerPage,
    fetchTransactions,
    totalRows,
    isLoading,
    setCurrentSearchQuery,
    currentSearchQuery,
  } = useArchiveTransactionStore();

  const { setDateRange } = useDateFilter();

  useEffect(() => {
    setDateRange(null, null);
    try {
      const res = fetchTransactions();
      console.log(res);
    } catch (error) {}
  }, []);

  const columns = [
    { header: "Transaction ID", key: "id" },
    { header: "Game", key: "gameName" },
    { header: "Site", key: "site" },
    { header: "Date Only", key: "dateOnly" },
    {
      header: "Date Created",
      key: "createdAt",
      render: (r: any) => new Date(r.createdAt).toLocaleString(),
    },
    { header: "Game Round No", key: "gameRoundNo" },
    { header: "Transaction Status", key: "transactionStatus" },
    { header: "Transaction Type", key: "transactionType" },
    {
      header: "Transaction Amount",
      key: "amount",
      render: (r: any) => Number(r.transactionAmount).toFixed(4) || 0.0,
      align: "right" as const,
    },
    { header: "Bet Ball", key: "betBall" },
    {
      header: "Odds",
      key: "odds",
      render: (r: any) => r.odds,
      align: "right" as const,
    },
    {
      header: "Service Fee",
      key: "serviceFee",
      render: (r: any) => Number(r.serviceFee).toFixed(4),
      align: "right" as const,
    },
    { header: "Player Name", key: "playerName" },
    { header: "Player Receiver", key: "playerNameTo" },
    { header: "Operator Representative", key: "opRepName" },
    { header: "Operator Representative Role", key: "opRepRole" },
    { header: "Operator Representative Type", key: "opRepType" },
  ];

  return (
    <>
      <ReportTable
        title="Transaction Reports"
        data={transactionsData}
        currentPage={transactionCurrentPage}
        rowsPerPage={transactionRowsPerPage}
        setData={setTransactionsData}
        setCurrentPage={setTransactionCurrentPage}
        setRowsPerPage={setTransactionRowsPerPage}
        columns={columns}
        exportFileName="transaction_reports"
        fetchData={fetchTransactions}
        totalRows={totalRows}
        currentSearchQuery={currentSearchQuery}
        setCurrentSearchQuery={setCurrentSearchQuery}
        loading={isLoading}
        filterSlot={
          <DateRangePicker
            label="Filter by date"
            key="transaction-date-picker"
            target="transaction"
            startDate={null}
            endDate={null}
            onChange={({ start, end }) => {
              fetchTransactions({
                startDate: start ? dayjs(start).format("YYYYMMDD") : undefined,
                endDate: end ? dayjs(end).format("YYYYMMDD") : undefined,
              });
              setTransactionCurrentPage(1);
            }}
          />
        }
      />
    </>
  );
};
