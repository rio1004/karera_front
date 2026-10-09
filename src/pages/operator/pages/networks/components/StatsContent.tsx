import { Eye } from "lucide-react";

export const StatsContent = ({ onToggleView }: { onToggleView: () => void }) => {
  return (
    <div className="col-span-7 grid grid-rows-3 gap-1">
      {/* Eye Icon Row */}
      <div className="flex items-start justify-end">
        <div className="p-1 bg-gray-100 rounded cursor-pointer" onClick={onToggleView}>
          <Eye className="w-5 h-5 text-gray-600" />
        </div>
      </div>

      {/* Number and Arrow Row */}
      <div className="flex items-center gap-1">
        <div className="text-green-500">
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 4l8 8h-6v8h-4v-8H4l8-8z" />
          </svg>
        </div>
        <span className="text-3xl font-bold text-gray-900">1</span>
      </div>

      {/* Label Row */}
      <div>
        <p className="text-sm text-gray-600 font-medium">
          Total Representatives
        </p>
      </div>
    </div>
  );
};