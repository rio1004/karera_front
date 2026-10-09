import Divider from "@/components/Divider";
import Text from "@/components/Text";
import { Button } from "@/components/ui/button";
import { useCustomDrawer } from "@/hooks/common/useCustomDrawer";
import { RotateCcw, X } from "lucide-react";
import { useState } from "react";

type FilterDrawerType = {
  show: boolean;
  api?: string;
  onClose: () => void;
};

const FilterDrawer = ({ show, api, onClose }: FilterDrawerType) => {
  const [sortByTab, setSortByTab] = useState<string>("");
  const [filterByTab, setFilterByTab] = useState<string>("");

  const toggleSortBy = (value: string) => {
    setSortByTab((prev) => (prev === value ? "" : value));
  };

  const toggleFilterBy = (value: string) => {
    setFilterByTab((prev) => (prev === value ? "" : value));
  };

  const { DrawerComponent, closeDrawer } = useCustomDrawer({
    content: (
      <div className="p-5 flex gap-5 flex-col">
        <div className="flex justify-between">
          <RotateCcw color="#808080" strokeWidth={3} />
          <Text text="Sort & Filter" type="h7" weight="medium" />
          <X color="#808080" strokeWidth={3.5} onClick={() => closeDrawer()} />
        </div>
        <Divider width="100%" />

        <div className="flex flex-col gap-5">
          <Text type="h8" text="Sort by" align="left" weight="medium" />
          <div className="flex items-center justify-between gap-5">
            {["Ascending", "Descending"].map((option) => (
              <div className="w-full" key={option}>
                <Button
                  variant={sortByTab === option ? "flatGreen" : "disable"}
                  className={`rounded-full  text-[16px] !h-[36px] ${
                    sortByTab === option ? "" : "text-[#1a1a1a]"
                  }`}
                  onClick={() => toggleSortBy(option)}
                >
                  {option}
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <Text type="h8" text="Filter by" align="left" weight="medium" />
          <div className="flex items-center justify-between gap-5">
            {["Date", "Amount", "Type"].map((option) => (
              <div className="w-full" key={option}>
                <Button
                  variant={filterByTab === option ? "flatGreen" : "disable"}
                  className={`rounded-full text-[16px] !h-[36px] ${
                    filterByTab === option ? "" : "text-[#1a1a1a]"
                  }`}
                  onClick={() => toggleFilterBy(option)}
                >
                  {option}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    show: show,
    onClose: onClose,
  });

  return <div>{DrawerComponent}</div>;
};

export default FilterDrawer;
