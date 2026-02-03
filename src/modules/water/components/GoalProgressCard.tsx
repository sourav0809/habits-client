import { Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";
import { formatMl } from "../utils";
import { DAILY_GOAL_ML } from "../constants";

export interface GoalProgressCardProps {
  currentMl: number;
  goalMl?: number;
}

const GoalProgressCard = ({
  currentMl,
  goalMl = DAILY_GOAL_ML,
}: GoalProgressCardProps) => {
  const percentage = Math.min(Math.round((currentMl / goalMl) * 100), 100);
  const remaining = Math.max(goalMl - currentMl, 0);
  const progressData = [
    { name: "Progress", value: percentage, fill: "#3b82f6" },
  ];

  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base font-medium">
          <Target className="size-4 text-blue-600" />
          Today&apos;s Goal Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="relative h-[160px] w-[160px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="70%"
                outerRadius="100%"
                barSize={12}
                data={progressData}
                startAngle={90}
                endAngle={-270 * (percentage / 100) + 90}
              >
                <RadialBar
                  background={{ fill: "hsl(var(--muted))" }}
                  dataKey="value"
                  cornerRadius={10}
                />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-foreground">
                {percentage}%
              </span>
              <span className="text-sm text-muted-foreground">of goal</span>
            </div>
          </div>
          <div className="flex flex-col gap-3 text-center sm:text-right">
            <div>
              <p className="text-sm text-muted-foreground">Consumed</p>
              <p className="text-xl font-bold text-blue-600">
                {formatMl(currentMl)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Remaining</p>
              <p className="text-lg font-semibold text-foreground">
                {formatMl(remaining)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Daily Goal</p>
              <p className="text-base font-medium text-muted-foreground">
                {formatMl(goalMl)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalProgressCard;
