import { CircularProgress } from "./CircularProgress";
import { StatsContent } from "./StatsContent";

export const MainStatsGrid = ({ onToggleView }: { onToggleView: () => void }) => {
  return (
    <div className="grid grid-cols-12 gap-4 mb-6">
      <div className="col-span-5">
        <CircularProgress percentage={100} />
      </div>
      <StatsContent onToggleView={onToggleView} />
    </div>
  );
};