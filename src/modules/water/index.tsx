import { useState, useCallback } from "react";
import type { DateRange } from "react-day-picker";
import { Droplets, GlassWater, Plus, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWaterPageData } from "./hooks";
import {
  WaterHeader,
  StatCard,
  WaterDateRangeSection,
  AddWaterDialog,
  WaterLogTable,
  WaterLogsPagination,
  WaterGoalCardSection,
  DailyIntakeChart,
  WaterInsightsChart,
  WaterPageLoader,
} from "./components";
import { getTodayISO, toDate, toISO, formatMl } from "./utils";
import { WATER_LOGS_PAGE_LIMIT } from "./constants";

export default function WaterModule() {
  const today = getTodayISO();
  const todayDate = toDate(today);

  const [dateRange, setDateRange] = useState<DateRange | undefined>(() => ({
    from: todayDate,
    to: todayDate,
  }));
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [page, setPage] = useState(1);

  const dateFrom = dateRange?.from ? toISO(dateRange.from) : today;
  const dateTo = dateRange?.to ? toISO(dateRange.to) : dateFrom;

  const handleDateRangeChange = useCallback((range: DateRange | undefined) => {
    setDateRange(range);
    setPage(1);
  }, []);

  const {
    logs,
    stats,
    chartData,
    pagination,
    goal,
    todayWaterMl,
    goalCardLoading,
    isPending,
    isError,
    error,
  } = useWaterPageData(dateFrom, dateTo, page, WATER_LOGS_PAGE_LIMIT);

  if (isPending) {
    return <WaterPageLoader />;
  }

  if (isError) {
    return (
      <div className="space-y-6">
        <WaterHeader />
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          {error?.message ?? "Failed to load water intake. Please try again."}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <WaterHeader />

      <WaterDateRangeSection
        dateRange={dateRange}
        onDateRangeChange={handleDateRangeChange}
        calendarOpen={calendarOpen}
        onCalendarOpenChange={setCalendarOpen}
        addButton={
          <AddWaterDialog
            open={addDialogOpen}
            onOpenChange={setAddDialogOpen}
            trigger={
              <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 sm:w-auto">
                <Plus className="size-4" />
                Add water
              </Button>
            }
          />
        }
      />

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Intake"
          value={formatMl(stats.totalMl)}
          unit=""
          icon={<Droplets className="size-5 text-blue-600" />}
          iconBgClass="bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400"
        />
        <StatCard
          title="Logs"
          value={stats.logCount}
          unit={stats.logCount === 1 ? "entry" : "entries"}
          icon={<GlassWater className="size-5 text-blue-600" />}
          iconBgClass="bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400"
        />
        <StatCard
          title="Avg per Log"
          value={formatMl(stats.avgPerLog)}
          unit=""
          icon={<TrendingUp className="size-5 text-emerald-600" />}
          iconBgClass="bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400"
        />
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <WaterGoalCardSection
          goal={goal}
          todayWaterMl={todayWaterMl}
          goalCardLoading={goalCardLoading}
        />
        <WaterInsightsChart startDate={dateFrom} endDate={dateTo} />
      </div>

      <section>
        <DailyIntakeChart data={chartData} />
      </section>

      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Water intake
        </h2>
        <WaterLogsPagination
          pagination={pagination}
          onPageChange={setPage}
          disabled={isPending}
        />
        <div className="mt-4">
          <WaterLogTable logs={logs} />
        </div>
      </section>
    </div>
  );
}
