import * as React from "react";
import dayjs from "dayjs";
import { useDateFilter } from "@/store/admin/useDateFilter";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import type { DateRange } from "react-day-picker";

interface DateRangePickerProps {
  startDate?: Date | null;
  endDate?: Date | null;
  /** Optional label for the button */
  label?: string;
  /** Callback whenever the date range changes */
  onChange?: (range: { start: Date | null; end: Date | null }) => void;
  /** Optional target: "transaction" | "user" for legacy store support */
  target?: "transaction" | "user" | "custom" | "ggr-accounting";
  /** Optional callback for fetching data with date filter */
  fetchData?: (params: { startDate?: string; endDate?: string }) => Promise<any>;
}

export function DateRangePicker({
  startDate,
  endDate,
  label,
  onChange,
  target = "custom",
  fetchData,
}: DateRangePickerProps) {
  const { startDate: storeStart, endDate: storeEnd, setDateRange } =
    useDateFilter();

  const [range, setRange] = React.useState<DateRange>({
    from: startDate ?? storeStart ?? undefined,
    to: endDate ?? storeEnd ?? undefined,
  });

  const buildParams = (r: DateRange) => ({
    startDate: r.from ? dayjs(r.from).format("YYYYMMDD") : undefined,
    endDate: r.to ? dayjs(r.to).format("YYYYMMDD") : undefined,
  });

  const handleSelect = async (val: DateRange | undefined) => {
    const newRange: DateRange = { from: val?.from, to: val?.to };
    setRange(newRange);
    setDateRange(newRange.from ?? null, newRange.to ?? null);
    onChange?.({ start: newRange.from ?? null, end: newRange.to ?? null });
    if (target !== "custom" && fetchData) {
      await fetchData(buildParams(newRange));
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="default"
          className="justify-start text-left font-normal"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {range.from
            ? range.to
              ? `${dayjs(range.from).format("MMM D, YYYY")} - ${dayjs(
                  range.to
                ).format("MMM D, YYYY")}`
              : dayjs(range.from).format("MMM D, YYYY")
            : label ?? "Select Date"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="center">
        <Calendar
          mode="range"
          selected={range}
          onSelect={handleSelect}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
}
