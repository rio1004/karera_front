import Divider from "@/components/Divider";
import Text from "@/components/Text";
import { CalendarDays, FileDown, ListFilter } from "lucide-react";
import { BiSolidFilePdf } from "react-icons/bi";
import { useState } from "react";
import FilterDrawer from "./FIlterDrawer";
import DateFilter from "./DateFilter";
import { RiFileExcel2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const FilterDownload = () => {
  const [activeDropdown, setActiveDropdown] = useState<
    "download" | "filter" | null
  >(null);
  const [showFilterDrawer, setShowFilterDrawer] = useState<boolean>(false);
  const [showDateFilter, setShowDateFilter] = useState<boolean>(false);
  const toggleDropdown = (type: "download" | "filter") => {
    setActiveDropdown((prev) => (prev === type ? null : type));
  };

  const navigate = useNavigate();

  const goToTransactionReq = () => {
    navigate("/operator/wallet/transactions/request-transaction");
  };

  return (
    <div className="flex justify-between items-center">
      <FilterDrawer
        show={showFilterDrawer}
        onClose={() => setShowFilterDrawer(false)}
      />
      <DateFilter
        onClose={() => setShowDateFilter(false)}
        show={showDateFilter}
      />
      <div className="flex gap-2">
        <div className="relative">
          <button
            className="p-2 bg-[#ffe400] rounded-lg shadow-sm hover:bg-yellow-600 transition-colors"
            onClick={() => toggleDropdown("download")}
          >
            <FileDown strokeWidth={2.25} color="#ffe400" fill="#7f631a" />
          </button>

          {activeDropdown === "download" && (
            <div className="absolute gap-2 w-[140px] left-[-120px] bottom-[-85px] rounded-[15px] justify-center items-center shadow-[0px_0px_7px_-4px_rgba(0,0,0,0.74)] px-4 py-3 bg-white flex flex-col">
              <div
                className="flex items-center justify-start gap-2 w-full"
                onClick={goToTransactionReq}
              >
                <BiSolidFilePdf color="#e31e24" size={18} />
                <Text text="Download PDF" type="p2" />
              </div>
              <Divider width="100%" />
              <div className="flex items-center justify-start gap-2 w-full">
                <RiFileExcel2Fill size={18} color="#2e7d32" />
                <Text text="Download Excel" type="p2" />
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            className="p-2 bg-[#00A24A] rounded-lg shadow-sm hover:bg-green-600 transition-colors"
            onClick={() => toggleDropdown("filter")}
          >
            <ListFilter strokeWidth={2.25} color="#fff" />
          </button>

          {activeDropdown === "filter" && (
            <div className="absolute gap-2 w-[135px] left-[-120px] bottom-[-85px] rounded-[15px] justify-center items-center shadow-[0px_0px_7px_-4px_rgba(0,0,0,0.74)] px-4 py-3 bg-white flex flex-col">
              <div
                className="flex items-center gap-2"
                onClick={() => setShowFilterDrawer(true)}
              >
                <ListFilter color="black" size={18} />
                <Text text="Sort & Filter" type="p2" />
              </div>
              <Divider width="100%" />
              <div
                className="flex items-center gap-2"
                onClick={() => setShowDateFilter(true)}
              >
                <CalendarDays size={18} />
                <Text text="Date Range" type="p2" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterDownload;
