import { startTransition, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface ActionButtonsProps {
  searchQuery: string;
  searchPlaceholder: string;
  onSearchChange: (query: string) => void;
  onSearchClear: () => void;
  onExportCurrent: () => Promise<void> | void;
  onExportAll: () => Promise<void> | void;
  hasData: boolean;
  totalRows: number;
  columns: {
    header: string;
    key: string;
    render?: (item: any) => React.ReactNode;
    align?: "left" | "center" | "right";
  }[];
  searchColumn: string;
  onSearchColumnChange: (col: string) => void;
}

export function ActionButtons({
  searchQuery,
  searchPlaceholder,
  onSearchChange,
  onSearchClear,
  onExportCurrent,
  onExportAll,
  hasData,
  totalRows,
  columns,
  searchColumn,
  onSearchColumnChange,
}: ActionButtonsProps) {
  const [isExportingCurrent, setIsExportingCurrent] = useState(false);
  const [isExportingAll, setIsExportingAll] = useState(false);

  const handleSearchChange = (query: string) => {
    startTransition(() => {
      onSearchChange(query);
    });
  };

  const handleSearchClear = () => {
    startTransition(() => {
      onSearchClear();
    });
  };

  const handleSearchColumnChange = (col: string) => {
    startTransition(() => {
      onSearchColumnChange(col);
    });
  };

  const handleExportCurrent = async () => {
    if (isExportingCurrent || isExportingAll) return;

    setIsExportingCurrent(true);
    try {
      await onExportCurrent();
    } catch (error) {
      console.error("Export current failed:", error);
    } finally {
      setIsExportingCurrent(false);
    }
  };

  const handleExportAll = async () => {
    if (isExportingCurrent || isExportingAll) return;

    setIsExportingAll(true);
    try {
      await onExportAll();
    } catch (error) {
      console.error("Export all failed:", error);
    } finally {
      setIsExportingAll(false);
    }
  };

  const isAnyExporting = isExportingCurrent || isExportingAll;

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <Select
        value={searchColumn}
        onValueChange={handleSearchColumnChange}
        disabled={isAnyExporting}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select column" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Search By</SelectLabel>
            <SelectItem value="all">All Columns</SelectItem>
            {columns.map((col) => (
              <SelectItem key={col.key} value={col.key}>
                {col.header}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <div className="relative">
        <Input
          placeholder={
            searchColumn === "all"
              ? searchPlaceholder
              : `Search ${columns.find((c) => c.key === searchColumn)?.header}`
          }
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-64 pr-8"
          disabled={isAnyExporting}
        />
        {searchQuery && !isAnyExporting && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSearchClear}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 text-gray-500 hover:text-gray-700"
          >
            ×
          </Button>
        )}
      </div>

      <Button
        variant="default"
        onClick={handleExportCurrent}
        className="max-w-[130px] whitespace-nowrap font-medium"
      >
        {isExportingCurrent ? (
          <span className="flex items-center gap-2">
            <span className="animate-spin"></span>
            Exporting...
          </span>
        ) : (
          "Export Current"
        )}
      </Button>

      <Button
        variant="default"
        onClick={handleExportAll}
        className="max-w-[150px] whitespace-nowrap font-medium"
      >
        {isExportingAll ? (
          <span className="flex items-center gap-2">
            <span className="animate-spin"></span>
            Exporting...
          </span>
        ) : (
          `Export All (${totalRows})`
        )}
      </Button>
    </div>
  );
}
