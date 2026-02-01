import { useMemo } from "react";
import { UtensilsCrossed, Flame, TrendingUp, BarChart3 } from "lucide-react";
import { getFoodsStats } from "./utils";
import { useMyFoods } from "./hooks";
import { AddFoodDialog } from "./components/AddFoodDialog";
import { MyMealsCharts } from "./components/MyMealsCharts";
import { MyMealsHeader } from "./components/MyMealsHeader";
import { MyMealsTable } from "./components/MyMealsTable";
import { StatCard } from "./components/StatCard";
import { MyMealsPageLoader } from "./components/MyMealsPageLoader";

export default function YourMealsModule() {
  const { data, isPending, isError, error } = useMyFoods();

  const foods = useMemo(() => data?.foods ?? [], [data]);
  const stats = useMemo(() => getFoodsStats(foods), [foods]);

  if (isPending) {
    return <MyMealsPageLoader />;
  }

  if (isError) {
    return (
      <div className="space-y-6">
        <MyMealsHeader />
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          {error?.message ?? "Failed to load your meals. Please try again."}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <MyMealsHeader />

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total meals"
          value={stats.total}
          unit={stats.total === 1 ? "meal" : "meals"}
          icon={<UtensilsCrossed className="size-5 text-blue-600" />}
          iconBgClass="bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400"
        />
        <StatCard
          title="Avg kcal/100g"
          value={stats.avgKcalPer100g}
          unit="kcal"
          icon={<Flame className="size-5 text-amber-600" />}
          iconBgClass="bg-amber-100 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400"
        />
        <StatCard
          title="Highest density"
          value={stats.highest}
          unit="kcal/100g"
          icon={<TrendingUp className="size-5 text-emerald-600" />}
          iconBgClass="bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400"
        />
        <StatCard
          title="Total default kcal"
          value={stats.totalDefaultKcal}
          unit="kcal"
          icon={<BarChart3 className="size-5 text-violet-600" />}
          iconBgClass="bg-violet-100 text-violet-600 dark:bg-violet-950/50 dark:text-violet-400"
        />
      </section>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <AddFoodDialog />
      </div>

      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Your meals
        </h2>
        <MyMealsTable foods={foods} />
      </section>

      <MyMealsCharts foods={foods} />
    </div>
  );
}
