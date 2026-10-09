import type { NetworkItem } from "@/types/operator/network";
import { StatsCard } from "./StatsCard";
import { NetworkCard } from "./NetworkCard";
import { SearchBar } from "@/pages/operator/components/SearchBar";
import Pagination from "@/pages/operator/components/Pagination";
import { useState } from "react";

const ITEMS_PER_PAGE = 5;
export const NormalView = ({ items }: { items: NetworkItem[] }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = items.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  return (
    <div className="space-y-4">
      <StatsCard />
      <SearchBar />
      <div className="space-y-2">
        {currentData.map((item) => (
          <NetworkCard key={item.id} item={item} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        itemsPerPage={4}
        onNext={handleNext}
        onPrev={handlePrev}
        totalItems={items.length}
        totalPages={totalPages}
      />
    </div>
  );
};
