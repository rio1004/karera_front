import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPrev: () => void;
  onNext: () => void;
};

const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPrev,
  onNext,
}: PaginationProps) => {
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex justify-between items-center mt-4 pb-5">
      <p className="text-[#5B5B5B]">
        Showing {start} - {end} of {totalItems}
      </p>

      <div className="flex items-center gap-4 text-white">
        <button
          onClick={onPrev}
          disabled={currentPage === 1}
          className="px-2 items-center justify-center py-1 border rounded disabled:opacity-50 flex bg-[#D9D9D9]"
        >
          <ChevronLeft className="leading-none -ml-2" />
          <p>Back</p>
        </button>
        <button
          onClick={onNext}
          disabled={currentPage === totalPages}
          className="px-2 py-1 border rounded disabled:opacity-50 flex bg-[#D9D9D9]"
        >
          <p>Next</p>
          <ChevronRight className="-mr-2" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
