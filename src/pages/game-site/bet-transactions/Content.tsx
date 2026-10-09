import   { useState, useMemo } from "react";
import Text from "@/components/Gamesites/Text";
import Item from "./Item";
import { useBetTransactions } from "@/store/game-site/useBetTransaction";
import clsx from "clsx";

const generateDummyData = (count: number) => {
  return Array.from({ length: count }, (_, index) => ({
    ticket: `SBT-972025051921${(1000 + index).toString()}`,
    amount: 1500,
  }));
};

const dummyData = generateDummyData(999);
const PAGE_SIZE = 8;

const Content = () => {
  const { showSideBar } = useBetTransactions();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // 🔍 Filtered data based on search term
  const filteredData = useMemo(() => {
    return dummyData.filter((item) =>
      item.ticket.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const totalEntries = filteredData.length;
  const totalPages = Math.ceil(totalEntries / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = Math.min(startIndex + PAGE_SIZE, totalEntries);
  const currentItems = filteredData.slice(startIndex, endIndex);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };
  return (
    <div className={`p-8 ${showSideBar ? "w-[75vw]" : "w-[100%]"}`}>
      <div className="flex gap-5 items-center">
        <div className="relative w-full flex-1">
          <img
            src="/icons/search_prefix.png"
            alt="search"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 opacity-60"
          />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="SBT-SEARCH"
            className="shadow-md h-[50px] pl-[48px] pr-4 w-full rounded-md text-[24px]"
          />
        </div>
        <div className="flex flex-col gap-1">
          <div className="bg-[#5B5B5B] px-4 p-1 rounded-md">
            <Text type="p2" text="DOWNLOAD" color="white" />
          </div>
          <div className="bg-[#5B5B5B] px-4 p-1  rounded-md">
            <Text type="p2" text="SORT & FILTER" color="white" />
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-5">
        {currentItems.length === 0 ? (
          <p className="text-gray-500">No tickets found.</p>
        ) : (
          currentItems.map((item, index) => (
            <Item key={index} amount={item.amount} ticket={item.ticket} />
          ))
        )}
      </div>

      <div className="mt-8 flex justify-between items-center text-sm">
        <p className="text-gray-600">
          Showing {endIndex} of {totalEntries} entries
        </p>
        <div className="flex gap-4">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={clsx(
              "px-4 py-2 text-black rounded text-white",
              currentPage === 1 ? "bg-[#D9D9D9]" : "bg-[#0E9F68]"
            )}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={clsx(
              "px-4 py-2 text-black rounded",
              currentPage === totalPages
                ? "bg-[#D9D9D9]"
                : "bg-[#0E9F68] text-white"
            )}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Content;
