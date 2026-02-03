import { Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

  // SVG circle calculations
  const size = 160;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <Card className="relative overflow-hidden border-border/80 bg-card shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base font-medium">
          <Target className="size-4 text-blue-600" />
          Today&apos;s Goal Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          {/* Custom SVG Progress Ring */}
          <div className="relative h-[160px] w-[160px]">
            <svg
              width={size}
              height={size}
              viewBox={`0 0 ${size} ${size}`}
              className="rotate-[-90deg]"
            >
              {/* Background track */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                className="text-muted"
              />
              {/* Progress arc */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="#3b82f6"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-500 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-foreground">
                {percentage}%
              </span>
              <span className="text-sm text-muted-foreground">of goal</span>
            </div>
          </div>

          {/* Stats */}
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
