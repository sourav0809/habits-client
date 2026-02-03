import { Flame, Droplets } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatMl, formatKcal, calculateProgressCapped } from "../utils";

interface GoalProgressCardProps {
  caloriesConsumed: number;
  caloriesGoal: number;
  waterConsumedMl: number;
  waterGoalMl: number;
}

interface CircularProgressProps {
  percent: number;
  color: string;
  trackColor?: string;
  size?: number;
  strokeWidth?: number;
}

function CircularProgress({
  percent,
  color,
  trackColor = "hsl(var(--muted))",
  size = 120,
  strokeWidth = 10,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(100, percent) / 100) * circumference;
  const center = size / 2;

  return (
    <svg width={size} height={size} className="rotate-[-90deg]">
      {/* Background track circle - always visible */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke={trackColor}
        strokeWidth={strokeWidth}
        opacity={0.3}
      />
      {/* Progress circle */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        className="transition-all duration-700 ease-out"
        style={{
          filter: percent > 0 ? `drop-shadow(0 0 6px ${color}40)` : "none",
        }}
      />
    </svg>
  );
}

const GoalProgressCard = ({
  caloriesConsumed,
  caloriesGoal,
  waterConsumedMl,
  waterGoalMl,
}: GoalProgressCardProps) => {
  const caloriesPercent = calculateProgressCapped(
    caloriesConsumed,
    caloriesGoal
  );
  const waterPercent = calculateProgressCapped(waterConsumedMl, waterGoalMl);

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-medium">
          Today's Goal Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-8">
        <div className="grid grid-cols-2 gap-8">
          {/* Calories Progress */}
          <div className="flex flex-col items-center">
            <div className="relative flex items-center justify-center">
              <CircularProgress
                percent={caloriesPercent}
                color="#3b82f6"
                trackColor="#3b82f6"
                size={120}
                strokeWidth={10}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center rotate-0">
                <Flame className="size-6 text-blue-500" />
                <span className="mt-1 text-2xl font-bold text-foreground">
                  {caloriesPercent}%
                </span>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm font-semibold text-foreground">Calories</p>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {formatKcal(caloriesConsumed)} / {formatKcal(caloriesGoal)} kcal
              </p>
            </div>
          </div>

          {/* Water Progress */}
          <div className="flex flex-col items-center">
            <div className="relative flex items-center justify-center">
              <CircularProgress
                percent={waterPercent}
                color="#06b6d4"
                trackColor="#06b6d4"
                size={120}
                strokeWidth={10}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center rotate-0">
                <Droplets className="size-6 text-cyan-500" />
                <span className="mt-1 text-2xl font-bold text-foreground">
                  {waterPercent}%
                </span>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm font-semibold text-foreground">Water</p>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {formatMl(waterConsumedMl)} / {formatMl(waterGoalMl)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalProgressCard;
