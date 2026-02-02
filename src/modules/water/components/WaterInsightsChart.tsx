import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatMl } from "../utils";

/**
 * Hydration insights (streak, goals met, best day, daily avg).
 * API does not provide these aggregates – this component uses dummy/placeholder
 * data. Replace with real computed values when backend supports them.
 */
const DUMMY_INSIGHTS = {
  dayStreak: 3,
  goalsMet: 5,
  dailyAvg: 2200,
  bestDay: 2800,
};

export function WaterInsightsChart() {
  const { dayStreak, goalsMet, dailyAvg, bestDay } = DUMMY_INSIGHTS;

  return (
    <Card className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <CardHeader>
        <CardTitle className="text-base font-medium">
          Hydration Insights
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Placeholder data – will be replaced when API supports aggregates.
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
              {formatMl(dailyAvg)}
            </div>
            <p className="text-xs text-muted-foreground">Daily Avg</p>
          </div>
          <div className="space-y-1 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {formatMl(bestDay)}
            </div>
            <p className="text-xs text-muted-foreground">Best Day</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
