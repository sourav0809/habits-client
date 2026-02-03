import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useHydrationInsights } from "../hooks";
import { formatMl } from "../utils";

export interface WaterInsightsChartProps {
  startDate: string;
  endDate: string;
}

const WaterInsightsChart = ({
  startDate,
  endDate,
}: WaterInsightsChartProps) => {
  const { data, isPending, isError, error } = useHydrationInsights(
    startDate,
    endDate
  );

  if (isPending) {
    return (
      <Card className="border-border/80 bg-gradient-to-br from-slate-50 to-slate-100 shadow-sm dark:from-slate-900 dark:to-slate-800">
        <CardHeader>
          <div className="h-5 w-36 animate-pulse rounded bg-muted" />
          <div className="mt-1 h-3 w-48 animate-pulse rounded bg-muted" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center space-y-2">
                <div className="h-8 w-16 animate-pulse rounded-lg bg-muted" />
                <div className="h-3 w-12 animate-pulse rounded bg-muted" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="border-destructive/30 bg-destructive/5">
        <CardHeader>
          <CardTitle className="text-base font-medium">
            Hydration Insights
          </CardTitle>
          <p className="text-xs text-destructive">
            {error?.message ?? "Failed to load hydration insights."}
          </p>
        </CardHeader>
      </Card>
    );
  }

  const { dayStreak, goalsMet, dailyAvgMl, bestDayMl } = data ?? {
    dayStreak: 0,
    goalsMet: 0,
    dailyAvgMl: 0,
    bestDayMl: 0,
  };

  return (
    <Card className="border-border/80 bg-gradient-to-br from-slate-50 to-slate-100 shadow-sm dark:from-slate-900 dark:to-slate-800">
      <CardHeader>
        <CardTitle className="text-base font-medium">
          Hydration Insights
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          For the selected date range.
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="space-y-1 text-center">
            <div className="text-2xl font-bold text-amber-500">
              🔥 {dayStreak}
            </div>
            <p className="text-xs text-muted-foreground">Day Streak</p>
          </div>
          <div className="space-y-1 text-center">
            <div className="text-2xl font-bold text-emerald-500">
              {goalsMet}
            </div>
            <p className="text-xs text-muted-foreground">Goals Met</p>
          </div>
          <div className="space-y-1 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {formatMl(dailyAvgMl)}
            </div>
            <p className="text-xs text-muted-foreground">Daily Avg</p>
          </div>
          <div className="space-y-1 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {formatMl(bestDayMl)}
            </div>
            <p className="text-xs text-muted-foreground">Best Day</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WaterInsightsChart;
