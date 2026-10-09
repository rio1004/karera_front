import { Button } from "@/components/ui/button";

export const Pagination: React.FC<{
  current: number;
  total: number;
  onBack?: () => void;
  onNext?: () => void;
}> = ({ current, total, onBack, onNext }) => (
  <div className="flex items-center justify-between text-sm text-gray-600">
    <span>Showing {current} of {total}</span>
    <div className="flex gap-2">
      <Button variant="secondary" size="sm" onClick={onBack}>
        ← Back
      </Button>
      <Button variant="secondary" size="sm" onClick={onNext}>
        Next →
      </Button>
    </div>
  </div>
);