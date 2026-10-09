import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import { useState, type ReactNode } from "react";

interface DateRangePickerProps {
  onApply: (startDate: string, endDate: string) => void;
  icon?: ReactNode;
}

export function DateRangePicker({ onApply, icon }: DateRangePickerProps) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [open, setOpen] = useState(false);

  const handleSelect = (range: DateRange | undefined) => {
    setDateRange(range);
    if (range?.from && range?.to) {
      onApply(format(range.from, "yyyy-MM-dd"), format(range.to, "yyyy-MM-dd"));
      setOpen(false);
    }
  };

  const getDateRangeText = () => {
    if (dateRange?.from && dateRange?.to) {
      return `${format(dateRange.from, "MMM dd")} - ${format(
        dateRange.to,
        "MMM dd"
      )}`;
    }
    if (dateRange?.from) {
      return format(dateRange.from, "MMM dd");
    }
    return "";
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        {icon || (
          <CalendarDays
            className="w-4 h-4"
            color="#448033"
            onClick={() => setOpen(!open)}
          />
        )}
        {getDateRangeText() && <span>{getDateRangeText()}</span>}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 flex m-auto flex-col items-center justify-center" align="center">
        <div className="p-3 border-b">
          <Label className="text-sm font-medium">Select Date Range</Label>
        </div>
        <Calendar
          mode="range"
          selected={dateRange}
          onSelect={handleSelect}
          captionLayout="dropdown"
          disabled={(date) => date > new Date()}
        />
        <div className="p-3 border-t flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setDateRange(undefined);
            }}
            className="flex-1"
          >
            Reset
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setOpen(false)}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
