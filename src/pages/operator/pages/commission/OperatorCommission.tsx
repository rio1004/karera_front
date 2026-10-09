import { useState } from "react";
import { SearchBar } from "../../components/SearchBar";
import MainHeader from "./components/MainHeader";
import { networkData } from "@/constant/operator/commission";
import Pagination from "../../components/Pagination";
import { NetworkCard } from "../networks/components/NetworkCard";
import { useLocation } from "react-router-dom";
import Text from "@/components/Text";
import { useOperatorStore } from "@/store/operator/useOperatorStore";

const ITEMS_PER_PAGE = 7;
const OperatorCommission = () => {
  const { expandCommission } = useOperatorStore();
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filter = queryParams.get("filter");
  const totalPages = Math.ceil(networkData.length / ITEMS_PER_PAGE);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = networkData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );
  console.log(location, "LOC");
  return (
    <div>
      <MainHeader />

      <div
        className={`${
          expandCommission ? "mt-14" : "mt-4"
        } px-4 flex flex-col gap-4`}
      >
        <SearchBar />
        {filter === "monthly" && (
          <div className="flex justify-between">
            <Text text="April 2025" type="h8" color="#C4C4C4" weight="medium" />
          </div>
        )}
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

export default OperatorCommission;
