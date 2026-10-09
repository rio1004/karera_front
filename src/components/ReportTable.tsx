import { useEffect, useState, useCallback, useMemo } from "react";
import _ from "lodash";
import { exportToExcel } from "@/utils/excelExport";
import type { ReportTableProps } from "@/types/admin.types";
import type { GetMethodBaseQueryParams } from "@/types";
import { PaginationControls } from "./PaginationControls";
import { DataTable } from "./DataTable";
import { ActionButtons } from "./ActionButton";
import { HeaderInfo } from "./HeaderInfo";

interface ApiResponse<T> {
  data: T[];
  totalRows: number;
  limit?: number;
  offset?: number;
}

interface ReportTablePropsWithAPI<T extends Record<string, unknown>>
  extends Omit<ReportTableProps<T>, "sampleData"> {
  fetchData?: (params: GetMethodBaseQueryParams) => Promise<ApiResponse<T>>;
  totalRows: number;
  loading?: boolean;
  currentSearchQuery?: string;
  setCurrentSearchQuery?: (query: string) => void;
  subtitle?: string; // Added for subtitle support
}

const DEBOUNCE_DELAY = 500;
const EXPORT_LIMIT = 50000;
const MAX_VISIBLE_PAGES = 5;

export function ReportTable<T extends Record<string, unknown>>({
  title,
  data,
  currentPage,
  rowsPerPage,
  setData,
  setCurrentPage,
  setRowsPerPage,
  columns,
  exportFileName,
  fetchData,
  totalRows,
  loading = false,
  currentSearchQuery,
  setCurrentSearchQuery,
  filterSlot,
}: ReportTablePropsWithAPI<T>) {
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [searchColumn, setSearchColumn] = useState("all");
  const [localLoading, setLocalLoading] = useState(false);

  const isLoading = loading || localLoading;
  const searchQuery = currentSearchQuery ?? localSearchQuery;
  const setSearchQuery = setCurrentSearchQuery ?? setLocalSearchQuery;

  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const searchPlaceholder = useMemo(() => {
    const firstFourColumns = columns.slice(0, 4).map((col) => col.header);
    const hasMoreColumns = columns.length > 4;
    return `Search ${firstFourColumns.join(", ")}${
      hasMoreColumns ? ", ..." : ""
    }`;
  }, [columns]);

  // Debounced search handler
  const debouncedSetSearch = useMemo(
    () =>
      _.debounce((value: string) => {
        setDebouncedSearch(value);
        if (setCurrentSearchQuery && value !== currentSearchQuery) {
          setCurrentSearchQuery(value);
        }
      }, DEBOUNCE_DELAY),
    [setCurrentSearchQuery, currentSearchQuery]
  );

  useEffect(() => {
    debouncedSetSearch(searchQuery);
    return () => debouncedSetSearch.cancel();
  }, [searchQuery, debouncedSetSearch]);

  useEffect(() => {
    if (currentPage > 1) {
      setCurrentPage(1);
    }
  }, [debouncedSearch, setCurrentPage]);

  const extractDataFromResponse = (response: ApiResponse<T>): T[] => {
    return response.data ?? [];
  };

  const loadData = useCallback(async () => {
    if (!fetchData) return;

    try {
      setLocalLoading(true);
      const params: GetMethodBaseQueryParams = {
        limit: rowsPerPage,
        offset: (currentPage - 1) * rowsPerPage,
        searchQuery: debouncedSearch?.trim() || "",
      };

      const result = await fetchData(params);
      let newData: T[] = extractDataFromResponse(result);

      if (debouncedSearch) {
        newData = newData.filter((row: any) => {
          if (searchColumn === "all") {
            return Object.values(row).some((val) =>
              String(val).toLowerCase().includes(debouncedSearch.toLowerCase())
            );
          } else {
            const colValue = row[searchColumn];
            return (
              colValue &&
              String(colValue)
                .toLowerCase()
                .includes(debouncedSearch.toLowerCase())
            );
          }
        });
      }

      setData(newData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    } finally {
      setLocalLoading(false);
    }
  }, [currentPage, rowsPerPage, debouncedSearch, setData, searchColumn]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1);
  };

  const handleSearchClear = () => {
    setSearchQuery("");
    debouncedSetSearch.cancel();
    setDebouncedSearch("");
    setCurrentSearchQuery?.("");
  };

  const handleExportCurrent = () => {
    const searchSuffix = debouncedSearch?.trim() ? "_filtered" : "";
    const fileName = `${exportFileName}${searchSuffix}_page_${currentPage}`;
    exportToExcel(data, fileName, columns);
  };

  const handleExportAll = async (): Promise<void> => {
    if (!fetchData) {
      exportToExcel(data, `${exportFileName}_all`, columns);
      return;
    }

    try {
      const allData = await fetchAllData();
      const filteredData = applySearchFilter(allData);
      const fileName = generateExportFileName();

      exportToExcel(filteredData, fileName, columns);
    } catch (error) {
      console.error("Error exporting all data:", error);
      throw error;
    }
  };

  const fetchAllData = async (): Promise<T[]> => {
    const allData: T[] = [];
    const batchSize = EXPORT_LIMIT;
    let offset = 0;

    while (offset < totalRows) {
      const batch = await fetchDataBatch(batchSize, offset);

      if (batch.length === 0) break;

      allData.push(...batch);
      offset += batchSize;
      if (batch.length < batchSize) break;
    }

    return allData;
  };

  const fetchDataBatch = async (
    limit: number,
    offset: number
  ): Promise<T[]> => {
    const params: GetMethodBaseQueryParams = {
      limit,
      offset,
      searchQuery: "",
    };

    const response = await fetchData!(params);
    return extractDataFromResponse(response);
  };

  const applySearchFilter = (data: T[]): T[] => {
    const searchTerm = debouncedSearch?.trim();
    if (!searchTerm) return data;

    return data.filter((row: any) => {
      if (searchColumn === "all") {
        return Object.values(row).some((val) =>
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      const columnValue = row[searchColumn];
      return (
        columnValue &&
        String(columnValue).toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  };

  const generateExportFileName = (): string => {
    const searchSuffix = debouncedSearch?.trim() ? "_filtered" : "";
    return `${exportFileName}${searchSuffix}_all`;
  };

  const getDisplayRange = () => {
    if (totalRows === 0) return { start: 0, end: 0 };
    const start = (currentPage - 1) * rowsPerPage + 1;
    const end = Math.min(currentPage * rowsPerPage, totalRows);
    return { start, end };
  };

  const generatePaginationRange = () => {
    let startPage = Math.max(
      1,
      currentPage - Math.floor(MAX_VISIBLE_PAGES / 2)
    );
    const endPage = Math.min(totalPages, startPage + MAX_VISIBLE_PAGES - 1);

    if (endPage - startPage < MAX_VISIBLE_PAGES - 1) {
      startPage = Math.max(1, endPage - MAX_VISIBLE_PAGES + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  const { start, end } = getDisplayRange();

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-2">
          <HeaderInfo
            title={title}
            totalRows={totalRows}
            start={start}
            end={end}
            searchQuery={debouncedSearch}
          />
          {filterSlot && <div>{filterSlot}</div>}
        </div>

        <ActionButtons
          searchQuery={searchQuery}
          searchPlaceholder={searchPlaceholder}
          onSearchChange={setSearchQuery}
          onSearchClear={handleSearchClear}
          onExportCurrent={handleExportCurrent}
          onExportAll={handleExportAll}
          hasData={data?.length > 0}
          totalRows={totalRows}
          columns={columns}
          searchColumn={searchColumn}
          onSearchColumnChange={setSearchColumn}
        />
      </div>

      <DataTable
        columns={columns}
        data={data}
        loading={isLoading}
        searchQuery={debouncedSearch}
      />

      {totalPages > 1 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          rowsPerPage={rowsPerPage}
          loading={isLoading}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          paginationRange={generatePaginationRange()}
        />
      )}
    </div>
  );
}
