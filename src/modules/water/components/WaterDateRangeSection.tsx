import type { DateRange } from "react-day-picker";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { formatDateLabel, toISO } from "../utils";

export interface WaterDateRangeSectionProps {
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
  calendarOpen: boolean;
  onCalendarOpenChange: (open: boolean) => void;
  addButton: React.ReactNode;
}

export function WaterDateRangeSection({
  dateRange,
  onDateRangeChange,
  calendarOpen,
  onCalendarOpenChange,
  addButton,
}: WaterDateRangeSectionProps) {
  const rangeLabel =
    dateRange?.from && dateRange?.to
      ? dateRange.from.getTime() === dateRange.to.getTime()
        ? formatDateLabel(toISO(dateRange.from))
        : `${formatDateLabel(toISO(dateRange.from))} – ${formatDateLabel(
            toISO(dateRange.to)
          )}`
      : "Pick dates";

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <Popover open={calendarOpen} onOpenChange={onCalendarOpenChange}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal sm:w-[280px]",
                !dateRange?.from && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 size-4 shrink-0" />
              {rangeLabel}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-auto p-0">
            <Calendar
              mode="range"
              defaultMonth={dateRange?.from ?? undefined}
              selected={dateRange}
              onSelect={onDateRangeChange}
              numberOfMonths={2}
              classNames={{ months: "flex flex-col sm:flex-row gap-4" }}
            />
          </PopoverContent>
        </Popover>
        {addButton}
      </div>
    </div>
  );
}
