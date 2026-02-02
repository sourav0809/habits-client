import { Target, Droplets, Flame, CheckCircle2, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, RadialBarChart, RadialBar } from "recharts";
import { formatMl } from "../utils";
import type { Goal } from "../types";

/** Today's actuals are not from goals API; pass 0 or values from other APIs when available */
export interface CurrentGoalsCardProps {
  goal: Goal;
  /** Today's calorie intake (default 0 – will come from food/water APIs later) */
  todayKcalActual?: number;
  /** Today's water intake in ml (default 0 – will come from water API later) */
  todayWaterActual?: number;
}

export function CurrentGoalsCard({
  goal,
  todayKcalActual = 0,
  todayWaterActual = 0,
}: CurrentGoalsCardProps) {
  const kcalPercentage = goal.targetCalories
    ? Math.min(Math.round((todayKcalActual / goal.targetCalories) * 100), 100)
    : 0;
  const waterPercentage = goal.targetWaterMl
    ? Math.min(Math.round((todayWaterActual / goal.targetWaterMl) * 100), 100)
    : 0;
  const kcalMet =
    goal.targetCalories > 0 &&
    todayKcalActual >= goal.targetCalories * 0.9 &&
    todayKcalActual <= goal.targetCalories * 1.1;
  const waterMet =
    goal.targetWaterMl > 0 && todayWaterActual >= goal.targetWaterMl;

  const kcalData = [
    { name: "Calories", value: kcalPercentage, fill: "#3b82f6" },
  ];
  const waterData = [
    { name: "Water", value: waterPercentage, fill: "#06b6d4" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base font-medium">
          <Target className="size-4 text-blue-600" />
          Today&apos;s Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col items-center">
            <div className="relative h-[160px] w-[160px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius="70%"
                  outerRadius="100%"
                  barSize={12}
                  data={kcalData}
                  startAngle={90}
                  endAngle={-270 * (kcalPercentage / 100) + 90}
                >
                  <RadialBar
                    background={{ fill: "hsl(var(--muted))" }}
                    dataKey="value"
                    cornerRadius={10}
                  />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Flame className="mb-1 size-5 text-blue-600" />
                <span className="text-xl font-bold text-foreground">
                  {kcalPercentage}%
                </span>
              </div>
            </div>
            <div className="mt-3 text-center">
              <p className="text-sm font-medium text-foreground">Calories</p>
              <p className="text-xs text-muted-foreground">
                {todayKcalActual} / {goal.targetCalories} kcal
              </p>
              {goal.targetCalories > 0 &&
                (kcalMet ? (
                  <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
                    <CheckCircle2 className="size-3" /> On target
                  </span>
                ) : (
                  <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-orange-600">
                    <XCircle className="size-3" />{" "}
                    {todayKcalActual < goal.targetCalories * 0.9
                      ? "Under target"
                      : "Over target"}
                  </span>
                ))}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative h-[160px] w-[160px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius="70%"
                  outerRadius="100%"
                  barSize={12}
                  data={waterData}
                  startAngle={90}
                  endAngle={-270 * (waterPercentage / 100) + 90}
                >
                  <RadialBar
                    background={{ fill: "hsl(var(--muted))" }}
                    dataKey="value"
                    cornerRadius={10}
                  />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Droplets className="mb-1 size-5 text-cyan-600" />
                <span className="text-xl font-bold text-foreground">
                  {waterPercentage}%
                </span>
              </div>
            </div>
            <div className="mt-3 text-center">
              <p className="text-sm font-medium text-foreground">Water</p>
              <p className="text-xs text-muted-foreground">
                {formatMl(todayWaterActual)} / {formatMl(goal.targetWaterMl)}
              </p>
              {goal.targetWaterMl > 0 &&
                (waterMet ? (
                  <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
                    <CheckCircle2 className="size-3" /> Goal met
                  </span>
                ) : (
                  <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-orange-600">
                    <XCircle className="size-3" />{" "}
                    {formatMl(goal.targetWaterMl - todayWaterActual)} to go
                  </span>
                ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
