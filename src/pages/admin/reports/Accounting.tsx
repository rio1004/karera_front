import React, { useEffect } from 'react';
import { ReportTable } from "@/components/ReportTable";
import { DateRangePicker } from "@/components/DateRangePicker";
import { useDateFilter } from "@/store/admin/useDateFilter";
import dayjs from "dayjs";
import { useGgrReportStore } from '@/store/admin/useGGRStore';

interface Props {}

export const Accounting = (props: Props) => {
  const {
    ggrReportData,
    setGgrReportData,
    fetchGgrReport,
    totalRows,
    totals,
    isLoading,
    setCurrentSearchQuery,
    currentSearchQuery,
  } = useGgrReportStore();

  const { setDateRange } = useDateFilter();

  useEffect(() => {
    setDateRange(null, null);
    fetchGgrReport();
  }, []);

  // Define columns to match the spreadsheet format and your data structure
  const columns = [
    { 
      header: "Date", 
      key: "date",
    },
    {
      header: "Sum of Bet Amount",
      key: "betAmount",
      render: (r: any) => Number(r.betAmount || 0).toFixed(2),
      align: "right" as const,
    },
    {
      header: "Sum of Win Amount",
      key: "winAmount", 
      render: (r: any) => Number(r.winAmount || 0).toFixed(2),
      align: "right" as const,
    },
    {
      header: "GGR",
      key: "ggr",
      render: (r: any) => Number(r.ggr || 0).toFixed(2),
      align: "right" as const,
    },
    {
      header: "Month",
      key: "month",
      // Data already includes month name
    },
    {
      header: "Week", 
      key: "week",
      // Data already includes ordinal week (1st, 2nd, 3rd, etc.)
    },
    {
      header: "PAGCOR SHARE",
      key: "pagcorShare",
      render: (r: any) => Number(r.pagcorShare || 0).toFixed(2),
      align: "right" as const,
    },
    {
      header: "PAGCOR SHARE", 
      key: "pagcorShare10",
      render: (r: any) => Number((r.ggr || 0) * 0.10).toFixed(2),
      align: "right" as const,
    },
    {
      header: "AUDIT FEE",
      key: "auditFee", 
      render: (r: any) => Number(r.auditFee || 0).toFixed(2),
      align: "right" as const,
    }
  ];

  const tableData: Record<string, unknown>[] = ggrReportData.map(row => ({ ...row }));

  const createTotalsRow = () => {
    if (!totals) return null;

    return {
      date: 'Grand Total',
      betAmount: totals.betAmount.toFixed(2),
      winAmount: totals.winAmount.toFixed(2),
      ggr: totals.ggr.toFixed(2),
      month: '',
      week: '',
      pagcorShare: totals.pagcorShare.toFixed(2),
      pagcorShare10: (totals.ggr * 0.10).toFixed(2),
      auditFee: totals.auditFee.toFixed(2),
    };
  };

  const totalsRow = createTotalsRow();
  const dataWithTotals = totalsRow ? [...tableData, totalsRow] : tableData;

  // Generate date range subtitle based on data
  const getDateRangeSubtitle = () => {
    if (ggrReportData.length === 0) return '';
    
    const dates = ggrReportData.map(row => new Date(row.date)).sort((a, b) => a.getTime() - b.getTime());
    const startDate = dayjs(dates[0]).format('MMMM DD');
    const endDate = dayjs(dates[dates.length - 1]).format('MMMM DD, YYYY');
    return `${startDate} to ${endDate} | =GGR*15% | =PAGCOR SHARE × 10%`;
  };

  return (
    <div>
      <ReportTable
        title="GGR Reports - Accounting"
        subtitle={getDateRangeSubtitle()}
        data={dataWithTotals}
        setData={setGgrReportData}
        columns={columns}
        exportFileName="ggr_accounting_reports"
        fetchData={fetchGgrReport}
        totalRows={totalRows}
        currentSearchQuery={currentSearchQuery}
        setCurrentSearchQuery={setCurrentSearchQuery}
        loading={isLoading}
        filterSlot={
          <DateRangePicker
            label="Filter by date"
            key="ggr-accounting-date-picker"
            target="ggr-accounting"
            startDate={null}
            endDate={null}
            onChange={({ start, end }) => {
              fetchGgrReport({
                startDate: start ? dayjs(start).format("YYYYMMDD") : undefined,
                endDate: end ? dayjs(end).format("YYYYMMDD") : undefined,
              });
            }}
          />
        }
      />
    </div>
  );
};