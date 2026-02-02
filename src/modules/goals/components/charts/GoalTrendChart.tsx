import { useMemo } from "react";
import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatChartLabel } from "@/utils/time.utils";
import { getDummyMonthData } from "../../utils";
import type { Goal } from "../../types";
import type { GoalAchievementTrendResponse } from "../../types";
import type { DailyGoalDummy } from "../../utils";

const CHART_TITLE = "Goal Achievement Trend (Last 1 month)";

export interface GoalTrendChartProps {
  goal: Goal;
  /** From analytics API; when provided, used instead of dummy data */
  goalAchievementTrend?: GoalAchievementTrendResponse | null;
}

export function GoalTrendChart({
  goal,
  goalAchievementTrend,
}: GoalTrendChartProps) {
  const chartData = useMemo(() => {
    if (goalAchievementTrend?.dataPoints?.length) {
      return goalAchievementTrend.dataPoints.map((d) => ({
        label: formatChartLabel(d.period),
        kcal: d.caloriesPercent,
        water: d.waterPercent,
      }));
    }
    const data = getDummyMonthData({
      dailyKcal: goal.targetCalories,
      dailyWater: goal.targetWaterMl,
    });
    return data.map((d: DailyGoalDummy) => ({
      label: formatChartLabel(d.dateObj),
      kcal: d.kcalPercentage,
      water: d.waterPercentage,
    }));
  }, [
    goal.targetCalories,
    goal.targetWaterMl,
    goalAchievementTrend?.dataPoints,
  ]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base font-medium">
          <TrendingUp className="size-4 text-emerald-600" />
          {CHART_TITLE}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0 pt-0">
        <div className="h-[260px] w-full px-2 sm:px-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="kcalGradientGoals"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient
                  id="waterGradientGoals"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-muted"
                vertical={false}
              />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                className="text-muted-foreground"
                interval="preserveStartEnd"
              />
              <YAxis
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                className="text-muted-foreground"
                tickFormatter={(v: number) => `${v}%`}
                domain={[0, 150]}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "var(--radius)",
                  border: "1px solid hsl(var(--border))",
                  background: "hsl(var(--card))",
                }}
                formatter={(value: number | undefined, name?: string) => [
                  `${value ?? 0}%`,
                  name === "kcal" ? "Calories" : "Water",
                ]}
              />
              <Area
                type="monotone"
                dataKey="kcal"
                stroke="#3b82f6"
                strokeWidth={2}
                fill="url(#kcalGradientGoals)"
                dot={false}
              />
              <Area
                type="monotone"
                dataKey="water"
                stroke="#06b6d4"
                strokeWidth={2}
                fill="url(#waterGradientGoals)"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="size-3 rounded bg-blue-500" />
            <span className="text-muted-foreground">Calories %</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-3 rounded bg-cyan-500" />
            <span className="text-muted-foreground">Water %</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-0.5 w-6 bg-muted-foreground/50" />
            <span className="text-muted-foreground">100% Goal Line</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
