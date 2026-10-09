import { Plus } from "lucide-react";

export const AchievementBanner = () => {
  return (
    <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 mb-6">
      <div className="grid grid-cols-12 items-center">
        <div className="col-span-12">
          <div className="flex items-center gap-2 text-green-600 mb-1">
            <Plus className="w-4 h-4 font-bold" />
            <span className="font-semibold text-gray-800">
              1 Representative
            </span>
          </div>
          <p className="text-xs text-gray-500">As of April 2025</p>
        </div>
      </div>
    </div>
  );
};