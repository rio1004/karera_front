import type { NetworkConfig, NetworkItem } from "@/types/operator/network";
import { NetworkCard } from "./NetworkCard";
import { SearchBar } from "@/pages/operator/components/SearchBar";

export const CollapsedView = ({
  items,
}: {
  items: NetworkItem[];
  config: NetworkConfig;
}) => {
  return (
    <div className="space-y-4">
      <SearchBar />
      <div className="space-y-2">
        {items.map((item) => (
          <NetworkCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
