import { useState } from "react";
import { Flame, Droplets, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGoalsPageData } from "./hooks";
import {
  GoalsHeader,
  GoalsPageLoader,
  StatCard,
  GoalNotSetCard,
  CurrentGoalsCard,
  EditGoalsDialog,
  GoalProgressChart,
  GoalTrendChart,
} from "./components";
import { formatMl } from "./utils";

export default function GoalsModule() {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const {
    goal,
    isPending,
    isError,
    error,
    todayKcal,
    todayWaterMl,
    avgKcalWeek,
    avgWaterMlWeek,
    caloriesProgress,
    waterProgress,
    goalAchievementTrend,
  } = useGoalsPageData();

  if (isPending) {
    return <GoalsPageLoader />;
  }

  if (isError) {
    return (
      <div className="space-y-6">
        <GoalsHeader onEditGoals={() => setEditDialogOpen(true)} />
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          {error?.message ?? "Failed to load goals. Please try again."}
        </div>
      </div>
    );
  }

  if (goal === null) {
    return (
      <div className="space-y-6">
        <GoalsHeader onEditGoals={() => setEditDialogOpen(true)} />
        <GoalNotSetCard
          onSetGoal={() => setEditDialogOpen(true)}
          setGoalButton={
            <Button className="bg-blue-600 text-white hover:bg-blue-700">
              Set goal
            </Button>
          }
        />
        <EditGoalsDialog
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          goal={null}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <GoalsHeader onEditGoals={() => setEditDialogOpen(true)} />

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Daily Calorie Goal"
          value={goal.targetCalories}
          unit="kcal"
          icon={<Flame className="size-5 text-blue-600" />}
          iconBgClass="bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400"
        />
        <StatCard
          title="Daily Water Goal"
          value={formatMl(goal.targetWaterMl)}
          unit=""
          icon={<Droplets className="size-5 text-cyan-600" />}
          iconBgClass="bg-cyan-100 text-cyan-600 dark:bg-cyan-950/50 dark:text-cyan-400"
        />
        <StatCard
          title="Avg calories (1 week)"
          value={avgKcalWeek}
          unit="kcal"
          icon={<TrendingUp className="size-5 text-emerald-600" />}
          iconBgClass="bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400"
        />
        <StatCard
          title="Avg water (1 week)"
          value={avgWaterMlWeek}
          unit="ml"
          icon={<Droplets className="size-5 text-cyan-600" />}
          iconBgClass="bg-cyan-100 text-cyan-600 dark:bg-cyan-950/50 dark:text-cyan-400"
        />
      </section>

      <div className="w-full">
        <CurrentGoalsCard
          goal={goal}
          todayKcalActual={todayKcal}
          todayWaterActual={todayWaterMl}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <GoalProgressChart
          type="kcal"
          goal={goal}
          caloriesProgress={caloriesProgress}
          waterProgress={waterProgress}
        />
        <GoalProgressChart
          type="water"
          goal={goal}
          caloriesProgress={caloriesProgress}
          waterProgress={waterProgress}
        />
      </div>

      <GoalTrendChart goal={goal} goalAchievementTrend={goalAchievementTrend} />

      <EditGoalsDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        goal={goal}
      />
    </div>
  );
}
