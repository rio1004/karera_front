import { useState, type CSSProperties } from "react";

import { CalendarDays } from "lucide-react";

import dayjs from "dayjs";
import { cn } from "../utils/cn";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";

const inputStyle: CSSProperties = {
  height: "56px",
  borderColor: "#C4C4C4",
};

type DatePickerProps = {
  label: string;
};

export function DatePicker({ label }: DatePickerProps) {
  const [date, setDate] = useState<Date | undefined>(dayjs().toDate());
  const [open, setOpen] = useState(false);

  const isFloating = open || !!date;

  return (
    <div className="flex flex-col gap-3">
      <div className="relative w-full">
        <span
          className={cn(
            "absolute left-3 text-muted-foreground transition-all pointer-events-none",
            isFloating ? "top-2 text-[11px]" : "top-[14px] text-base"
          )}
        >
          {label}
        </span>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date"
              className={cn(
                "w-full justify-between font-normal px-3 pt-5 pb-2 text-left rounded-md border text-sm shadow-xs"
              )}
              style={inputStyle}
            >
              <span className={cn(!date && "text-muted-foreground")}>
                {date ? date.toLocaleDateString() : "Select date"}
              </span>
              <CalendarDays
                strokeWidth={2}
                size={23}
                className="ml-auto h-[23px] w-[23px] opacity-50 self-start"
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              onSelect={(selectedDate) => {
                setDate(selectedDate);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
