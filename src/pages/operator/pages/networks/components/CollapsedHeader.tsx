import type { NetworkConfig } from "@/types/operator/network";
import { Eye, EyeOff } from "lucide-react";

export const CollapsedHeader = ({
  onToggleView,
  isVisible,
  config
}: {
  onToggleView: () => void;
  isVisible: boolean;
  config: NetworkConfig;
}) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-semibold text-gray-900">
        {config.totalLabel}
      </h2>
      <div
        className="p-1 bg-gray-100 rounded cursor-pointer hover:bg-gray-200"
        onClick={onToggleView}
      >
        {isVisible ? (
          <Eye className="w-5 h-5 text-gray-600" />
        ) : (
          <EyeOff className="w-5 h-5 text-gray-600" />
        )}
      </div>
    </div>
  );
};