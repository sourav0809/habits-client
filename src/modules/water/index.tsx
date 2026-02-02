import { useMemo, useState } from "react";
import type { DateRange } from "react-day-picker";
import { Droplets, GlassWater, Plus, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWaterLogs } from "./hooks";
import {
  WaterHeader,
  StatCard,
  WaterDateRangeSection,
  AddWaterDialog,
  WaterLogTable,
  GoalProgressCard,
  DailyIntakeChart,
  WaterInsightsChart,
  WaterPageLoader,
} from "./components";
import {
  getTodayISO,
  toDate,
  toISO,
  getWaterStats,
  getWaterChartData,
  formatDateLabel,
  formatMl,
} from "./utils";
import { getDatePartFromDateTime } from "./utils";
import { DAILY_GOAL_ML } from "./constants";

export default function WaterModule() {
  const today = getTodayISO();
  const todayDate = toDate(today);

  const [dateRange, setDateRange] = useState<DateRange | undefined>(() => ({
    from: todayDate,
    to: todayDate,
  }));
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const dateFrom = dateRange?.from ? toISO(dateRange.from) : today;
  const dateTo = dateRange?.to ? toISO(dateRange.to) : dateFrom;

  const { data, isPending, isError, error } = useWaterLogs({
    startDate: dateFrom,
    endDate: dateTo,
  });

  const logs = useMemo(() => data?.logs ?? [], [data]);
  const stats = useMemo(() => getWaterStats(logs), [logs]);

  const todayLogs = useMemo(() => {
    return logs.filter((l) => getDatePartFromDateTime(l.dateAndTime) === today);
  }, [logs, today]);
  const todayTotalMl = useMemo(
    () => todayLogs.reduce((s, l) => s + l.amountMl, 0),
    [todayLogs]
  );

  const chartData = useMemo(
    () =>
      getWaterChartData(logs, dateFrom, dateTo, DAILY_GOAL_ML, formatDateLabel),
    [logs, dateFrom, dateTo]
  );

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
        onDateRangeChange={setDateRange}
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
        <GoalProgressCard currentMl={todayTotalMl} goalMl={DAILY_GOAL_ML} />
        <WaterInsightsChart />
      </div>

      <section>
        <DailyIntakeChart data={chartData} />
      </section>

      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Water intake
        </h2>
        <WaterLogTable logs={logs} />
      </section>
    </div>
  );
}
