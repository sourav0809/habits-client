import { useState, useCallback } from "react";
import type { DateRange } from "react-day-picker";
import { Flame, Droplets, UtensilsCrossed, GlassWater } from "lucide-react";
import { useDashboardPageData } from "./hooks";
import DashboardHeader from "./components/DashboardHeader";
import DateRangeSection from "./components/DateRangeSection";
import DashboardPageLoader from "./components/DashboardPageLoader";
import StatCard from "./components/StatCard";
import GoalNudgeBanner from "./components/GoalNudgeBanner";
import QuickActionsCard from "./components/QuickActionsCard";
import GoalProgressCard from "./components/GoalProgressCard";
import CaloriesChart from "./components/CaloriesChart";
import WaterChart from "./components/WaterChart";
import WaterInsightsCard from "./components/InsightsCard";
import { formatMl, formatKcal } from "./utils";
import { getTodayISO, toDate, toISO } from "@/utils/time.utils";

const DashboardModule = () => {
  const today = getTodayISO();
  const todayDate = toDate(today);

  // Date range state (default: today)
  const [dateRange, setDateRange] = useState<DateRange | undefined>(() => ({
    from: todayDate,
    to: todayDate,
  }));

  const handleDateRangeChange = useCallback((range: DateRange | undefined) => {
    setDateRange(range);
  }, []);

  // Compute date strings for API calls
  const dateFrom = dateRange?.from ? toISO(dateRange.from) : today;
  const dateTo = dateRange?.to ? toISO(dateRange.to) : dateFrom;

  // Fetch all dashboard data
  const {
    goal,
    hasGoal,
    todaySummary,
    caloriesData,
    waterData,
    insights,
    isPending,
    isError,
    error,
    insightsLoading,
  } = useDashboardPageData({ startDate: dateFrom, endDate: dateTo });

  // Loading state
  if (isPending) {
    return <DashboardPageLoader />;
  }

  // Error state
  if (isError) {
    return (
      <div className="space-y-6">
        <DashboardHeader />
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          {error?.message ?? "Failed to load dashboard. Please try again."}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <DashboardHeader />

      {/* Goal Nudge Banner - Show only if no goal set */}
      {!hasGoal && <GoalNudgeBanner />}

      {/* Date Range Filter */}
      <DateRangeSection
        dateRange={dateRange}
        onDateRangeChange={handleDateRangeChange}
      />

      {/* Today's Summary Stats - Show only if goal is set */}
      {hasGoal && (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Calories Today"
            value={formatKcal(todaySummary.caloriesConsumed)}
            unit="kcal"
            icon={<Flame className="size-5 text-blue-600" />}
            iconBgClass="bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400"
            progress={todaySummary.caloriesPercent}
          />
          <StatCard
            title="Water Today"
            value={formatMl(todaySummary.waterConsumedMl)}
            unit=""
            icon={<Droplets className="size-5 text-cyan-600" />}
            iconBgClass="bg-cyan-100 text-cyan-600 dark:bg-cyan-950/50 dark:text-cyan-400"
            progress={todaySummary.waterPercent}
          />
          <StatCard
            title="Calorie Goal"
            value={formatKcal(todaySummary.caloriesGoal)}
            unit="kcal"
            icon={<UtensilsCrossed className="size-5 text-emerald-600" />}
            iconBgClass="bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400"
          />
          <StatCard
            title="Water Goal"
            value={formatMl(todaySummary.waterGoalMl)}
            unit=""
            icon={<GlassWater className="size-5 text-emerald-600" />}
            iconBgClass="bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400"
          />
        </section>
      )}

      {/* Goal Progress & Quick Actions */}
      <div className="grid gap-4 lg:grid-cols-2">
        {hasGoal && (
          <GoalProgressCard
            caloriesConsumed={todaySummary.caloriesConsumed}
            caloriesGoal={todaySummary.caloriesGoal}
            waterConsumedMl={todaySummary.waterConsumedMl}
            waterGoalMl={todaySummary.waterGoalMl}
          />
        )}
        <QuickActionsCard />
      </div>

      {/* Charts - Show only if goal is set */}
      {hasGoal && (
        <div className="grid gap-4 lg:grid-cols-2">
          <CaloriesChart
            data={caloriesData}
            caloriesGoal={goal!.targetCalories}
          />
          <WaterChart data={waterData} waterGoalMl={goal!.targetWaterMl} />
        </div>
      )}

      {/* Water Insights - Show only if goal is set */}
      {hasGoal && (
        <WaterInsightsCard insights={insights} isLoading={insightsLoading} />
      )}
    </div>
  );
};

export default DashboardModule;
