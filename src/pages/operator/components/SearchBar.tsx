import { Search } from "lucide-react";
import FilterDownload from "./FilterDownload/FilterDownload";

export const SearchBar = ({
  onSearch,
}: {
  onSearch?: (query: string) => void;
}) => {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#2196f3]" />
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-[#EDF5FB] pl-10 pr-4 py-2 border border-[#DBEBF8] rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-[#68BCFF]"
          onChange={(e) => onSearch?.(e.target.value)}
        />
      </div>
      <FilterDownload />
    </div>
  );
};
