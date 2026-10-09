import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

type Props = {
  setCurrentPage: Dispatch<SetStateAction<number>>;
  currentPage: number;
  totalPages: number;
};
const Pagination = ({ currentPage, setCurrentPage, totalPages }: Props) => {
  return (
    <div className="flex justify-center items-center gap-2">
      <button
        onClick={() => setCurrentPage((p: number) => Math.max(1, p - 1))}
        disabled={currentPage === 1}
        className="w-[30px] h-[30px] bg-[#c4c4c4] text-white flex items-center justify-center rounded-[5px]"
      >
        <ChevronLeft fontWeight={"Bold"} />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`w-[30px] h-[30px] font-bold rounded-[5px] ${
            page === currentPage
              ? "bg-success rounded-[5px] text-white "
              : "border-1 border-[#c4c4c4] text-[#c4c4c4]"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
        disabled={currentPage === totalPages}
        className="w-[30px] h-[30px] bg-[#c4c4c4] text-white flex items-center justify-center rounded-[5px]"
      >
        <ChevronRight fontWeight={"Bold"} />
      </button>
    </div>
  );
};

export default Pagination;
