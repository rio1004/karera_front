import { useEffect } from "react";
import { ReportTable } from "@/components/ReportTable";
import { useTransactionStore } from "@/store/admin/useTransaction";
import { DateRangePicker } from "@/components/DateRangePicker";
import dayjs from "dayjs";
import { useDateFilter } from "@/store/admin/useDateFilter";

export const TransactionReportTable = () => {
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
  } = useTransactionStore();

  const { setDateRange } = useDateFilter();

  useEffect(() => {
    setDateRange(null, null);
    fetchTransactions();
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
    { header: "Game Round No", key: "gameRound" },
    { header: "Transaction Status", key: "status" },
    { header: "Transaction Type", key: "type" },
    {
      header: "Transaction Amount",
      key: "transactionAmount",
      render: (r: any) => Number(r.transactionAmount).toFixed(4),
      align: "right" as const,
    },
    { header: "Bet Ball", key: "choice" },
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
    { header: "Player Receiver", key: "playerReceiver" },
    { header: "Operator Representative", key: "opRepId" },
    { header: "Operator Representative Role", key: "operator" },
    { header: "Operator Representative Type", key: "operatorType" },
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
