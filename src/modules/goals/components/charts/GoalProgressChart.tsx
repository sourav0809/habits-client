import { useMemo } from "react";
import { Flame, Droplets } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
} from "recharts";
import { formatChartDay, formatChartLabel } from "@/utils/time.utils";
import { formatMl, getDummyWeekData } from "../../utils";
import type { Goal } from "../../types";
import type {
  CaloriesProgressResponse,
  WaterProgressResponse,
} from "../../types";
import type { DailyGoalDummy } from "../../utils";

const CHART_TITLE_KCAL = "Calorie Progress (1 week)";
const CHART_TITLE_WATER = "Water Progress (1 week)";

type ChartType = "kcal" | "water";

export interface GoalProgressChartProps {
  type: ChartType;
  goal: Goal;
  /** From analytics API; when provided, used instead of dummy data */
  caloriesProgress?: CaloriesProgressResponse | null;
  /** From analytics API; when provided, used instead of dummy data */
  waterProgress?: WaterProgressResponse | null;
}

export function GoalProgressChart({
  type,
  goal,
  caloriesProgress,
  waterProgress,
}: GoalProgressChartProps) {
  const chartData = useMemo(() => {
    if (type === "kcal" && caloriesProgress?.dataPoints?.length) {
      return caloriesProgress.dataPoints.map((d) => ({
        label: formatChartDay(d.period),
        fullDate: formatChartLabel(d.period),
        actual: d.averageCalories,
        goal: goal.targetCalories,
      }));
    }
    if (type === "water" && waterProgress?.dataPoints?.length) {
      return waterProgress.dataPoints.map((d) => ({
        label: formatChartDay(d.period),
        fullDate: formatChartLabel(d.period),
        actual: d.averageWaterMl,
        goal: goal.targetWaterMl,
      }));
    }
    const data = getDummyWeekData({
      dailyKcal: goal.targetCalories,
      dailyWater: goal.targetWaterMl,
    });
    return data.map((d: DailyGoalDummy) => ({
      label: formatChartDay(d.dateObj),
      fullDate: formatChartLabel(d.dateObj),
      actual: type === "kcal" ? d.kcalActual : d.waterActual,
      goal: type === "kcal" ? d.kcalGoal : d.waterGoal,
    }));
  }, [
    type,
    goal.targetCalories,
    goal.targetWaterMl,
    caloriesProgress?.dataPoints,
    waterProgress?.dataPoints,
  ]);

  const colors = {
    kcal: { primary: "#3b82f6" },
    water: { primary: "#06b6d4" },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base font-medium">
          {type === "kcal" ? (
            <Flame className="size-4 text-blue-600" />
          ) : (
            <Droplets className="size-4 text-cyan-600" />
          )}
          {type === "kcal" ? CHART_TITLE_KCAL : CHART_TITLE_WATER}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0 pt-0">
        <div className="h-[260px] w-full px-2 sm:px-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-muted"
                vertical={false}
              />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                className="text-muted-foreground"
              />
              <YAxis
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                className="text-muted-foreground"
                tickFormatter={(v: number) =>
                  type === "kcal" ? `${v}` : `${v / 1000}L`
                }
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "var(--radius)",
                  border: "1px solid hsl(var(--border))",
                  background: "hsl(var(--card))",
                }}
                formatter={(value: number | undefined, name?: string) => [
                  type === "kcal" ? `${value ?? 0} kcal` : formatMl(value ?? 0),
                  name === "actual" ? "Actual" : "Goal",
                ]}
                labelFormatter={(
                  _: unknown,
                  payload: readonly { payload?: { fullDate?: string } }[]
                ) => payload?.[0]?.payload?.fullDate ?? ""}
              />
              <Bar
                dataKey="actual"
                fill={colors[type].primary}
                radius={[4, 4, 0, 0]}
                maxBarSize={40}
              />
              <Line
                type="monotone"
                dataKey="goal"
                stroke="#f59e0b"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div
              className="size-3 rounded"
              style={{ backgroundColor: colors[type].primary }}
            />
            <span className="text-muted-foreground">Actual</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-0.5 w-4 border-t-2 border-dashed border-amber-500" />
            <span className="text-muted-foreground">Goal</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
