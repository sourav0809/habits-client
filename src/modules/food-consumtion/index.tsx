import { useMemo, useState } from "react";
import type { DateRange } from "react-day-picker";
import { Flame, UtensilsCrossed, TrendingUp, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFoodConsumptions } from "./hooks";
import {
  FoodConsumptionHeader,
  StatCard,
  DateRangeSection,
  AddConsumptionDialog,
  ConsumptionTable,
  CaloriesChart,
  FoodConsumptionPageLoader,
} from "./components";
import {
  getTodayISO,
  toDate,
  toISO,
  getConsumptionStats,
  getConsumptionChartData,
  formatDateLabel,
} from "./utils";

export default function FoodConsumptionModule() {
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

  const { data, isPending, isError, error } = useFoodConsumptions({
    startDate: dateFrom,
    endDate: dateTo,
  });

  const consumptions = useMemo(() => data?.consumptions ?? [], [data]);

  const stats = useMemo(
    () => getConsumptionStats(consumptions),
    [consumptions]
  );

  const chartData = useMemo(
    () =>
      getConsumptionChartData(
        consumptions,
        dateFrom,
        dateTo,
        formatDateLabel
      ),
    [consumptions, dateFrom, dateTo]
  );

  if (isPending) {
    return <FoodConsumptionPageLoader />;
  }

  if (isError) {
    return (
      <div className="space-y-6">
        <FoodConsumptionHeader />
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          {error?.message ?? "Failed to load food log. Please try again."}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <FoodConsumptionHeader />

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Calories"
          value={stats.totalKcal}
          unit="kcal"
          icon={<Flame className="size-5 text-blue-600" />}
          iconBgClass="bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400"
        />
        <StatCard
          title="Meals logged"
          value={stats.mealCount}
          unit={stats.mealCount === 1 ? "meal" : "meals"}
          icon={<UtensilsCrossed className="size-5 text-blue-600" />}
          iconBgClass="bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400"
        />
        <StatCard
          title="Avg / meal"
          value={stats.avgPerMeal}
          unit="kcal"
          icon={<TrendingUp className="size-5 text-emerald-600" />}
          iconBgClass="bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400"
        />
      </section>

      <DateRangeSection
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        calendarOpen={calendarOpen}
        onCalendarOpenChange={setCalendarOpen}
        addButton={
          <AddConsumptionDialog
            open={addDialogOpen}
            onOpenChange={setAddDialogOpen}
            trigger={
              <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 sm:w-auto">
                <Plus className="size-4" />
                Add food
              </Button>
            }
          />
        }
      />

      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Food intake
        </h2>
        <ConsumptionTable consumptions={consumptions} />
      </section>

      <CaloriesChart data={chartData} />
    </div>
  );
}
