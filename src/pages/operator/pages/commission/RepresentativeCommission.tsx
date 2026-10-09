import { useCommission } from "@/hooks/operator/useCommission";
import { CommissionHeader } from "./components/CommissionHeader";
import { SearchBar } from "../../components/SearchBar";
import { useState } from "react";
import { networkData } from "@/constant/operator/commission";
import Pagination from "../../components/Pagination";
import { NetworkCard } from "../networks/components/NetworkCard";
import { useOperatorStore } from "@/store/operator/useOperatorStore";
const ITEMS_PER_PAGE = 4;

const RepresentativeCommission = () => {
  const { commissionData } = useCommission();
  const { expandCommission } = useOperatorStore();
  const player = networkData.filter((item) => item.type == "player");
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(player.length / ITEMS_PER_PAGE);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = player.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen left-0 flex flex-col">
      <CommissionHeader commissionData={commissionData} />
      <div
        className={`${
          expandCommission ? "mt-10" : "mt-4"
        } px-4 h-full  space-y-4`}
      >
        <SearchBar />
        <div className="flex flex-col gap-4">
          {currentData.map((item, index) => (
            <NetworkCard key={index} item={item} />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={networkData.length}
          itemsPerPage={ITEMS_PER_PAGE}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      </div>
    </div>
  );
};

export default RepresentativeCommission;
