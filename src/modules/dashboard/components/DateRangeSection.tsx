import { useState, useCallback } from "react";
import type { DateRange } from "react-day-picker";
import { Calendar, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { formatDateLabel, getCurrentDateAsDate } from "@/utils/time.utils";

interface DateRangeSectionProps {
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
}

const QUICK_PRESETS = [
  { label: "Last 7 days", days: 7 },
  { label: "Last 30 days", days: 30 },
  { label: "Last 3 months", days: 90 },
  { label: "Last 6 months", days: 180 },
  { label: "Last 1 year", days: 365 },
];

export function DateRangeSection({
  dateRange,
  onDateRangeChange,
}: DateRangeSectionProps) {
  const [calendarOpen, setCalendarOpen] = useState(false);

  const handleSelect = useCallback(
    (range: DateRange | undefined) => {
      onDateRangeChange(range);
      // Close popover when both dates are selected
      if (range?.from && range?.to) {
        setCalendarOpen(false);
      }
    },
    [onDateRangeChange]
  );

  const handlePresetClick = useCallback(
    (days: number) => {
      const today = getCurrentDateAsDate();
      const from = new Date(today);
      from.setDate(from.getDate() - days);
      onDateRangeChange({ from, to: today });
      setCalendarOpen(false);
    },
    [onDateRangeChange]
  );

  const formatRangeLabel = () => {
    if (!dateRange?.from) return "Select date range";
    if (!dateRange.to || dateRange.from.getTime() === dateRange.to.getTime()) {
      return formatDateLabel(dateRange.from.toISOString());
    }
    return `${formatDateLabel(dateRange.from.toISOString())} - ${formatDateLabel(dateRange.to.toISOString())}`;
  };

  return (
    <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between gap-2 sm:w-auto sm:min-w-[280px]"
        >
          <Calendar className="size-4 text-muted-foreground" />
          <span className="truncate">{formatRangeLabel()}</span>
          <ChevronDown className="size-4 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start" side="bottom" sideOffset={8}>
        <div className="flex flex-col sm:flex-row">
          {/* Quick presets sidebar */}
          <div className="flex flex-row flex-wrap gap-1 border-b p-3 sm:w-40 sm:flex-col sm:border-b-0 sm:border-r">
            <p className="mb-1 hidden text-xs font-medium text-muted-foreground sm:block">
              Quick Select
            </p>
            {QUICK_PRESETS.map((preset) => (
              <Button
                key={preset.days}
                variant="ghost"
                size="sm"
                className="justify-start text-sm"
                onClick={() => handlePresetClick(preset.days)}
              >
                {preset.label}
              </Button>
            ))}
          </div>
          
          {/* Calendar */}
          <div className="p-3">
            <CalendarComponent
              mode="range"
              selected={dateRange}
              onSelect={handleSelect}
              numberOfMonths={2}
              disabled={{ after: getCurrentDateAsDate() }}
              initialFocus
            />
            
            {/* Selected range display */}
            {dateRange?.from && (
              <div className="mt-3 flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2">
                <Calendar className="size-4 text-muted-foreground" />
                <span className="text-sm font-medium">
                  {formatRangeLabel()}
                </span>
              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
