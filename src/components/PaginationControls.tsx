import { startTransition } from "react";
import { ROWS_PER_PAGE_OPTIONS } from "@/constant/options";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  rowsPerPage: number;
  loading: boolean;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  paginationRange: number[];
}

export function PaginationControls({
  currentPage,
  totalPages,
  rowsPerPage,
  loading,
  onPageChange,
  onRowsPerPageChange,
  paginationRange,
}: PaginationControlsProps) {
  
  const handlePageChange = (page: number) => {
    startTransition(() => {
      onPageChange(page);
    });
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    startTransition(() => {
      onRowsPerPageChange(newRowsPerPage);
    });
  };

  return (
    <div className="flex justify-between items-center gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Rows per page:</span>
        <Select
          value={String(rowsPerPage)}
          onValueChange={(val) => handleRowsPerPageChange(Number(val))}
          disabled={loading}
        >
          <SelectTrigger className="w-20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {ROWS_PER_PAGE_OPTIONS.map((size) => (
              <SelectItem key={size} value={String(size)}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Pagination className="flex justify-center">
        <PaginationContent className="flex items-center space-x-1">
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(currentPage - 1)}
              className={
                currentPage <= 1
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>

          {paginationRange.map((pageNum) => (
            <PaginationItem key={pageNum}>
              <PaginationLink
                onClick={() => handlePageChange(pageNum)}
                isActive={currentPage === pageNum}
                className="cursor-pointer rounded-full"
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(currentPage + 1)}
              className={
                currentPage >= totalPages
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}