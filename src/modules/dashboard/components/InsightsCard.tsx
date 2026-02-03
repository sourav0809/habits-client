import { Zap, Trophy, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatMl } from "../utils";
import type { HydrationInsightsResponse } from "@/modules/water/types";

interface WaterInsightsCardProps {
  insights: HydrationInsightsResponse | null;
  isLoading?: boolean;
}

export function WaterInsightsCard({ insights, isLoading }: WaterInsightsCardProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium">Water Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="text-center">
                <div className="mx-auto mb-2 h-10 w-10 rounded-lg bg-muted animate-pulse" />
                <div className="mx-auto mb-1 h-6 w-12 rounded bg-muted animate-pulse" />
                <div className="mx-auto h-4 w-16 rounded bg-muted animate-pulse" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const stats = [
    {
      icon: Zap,
      value: insights?.dayStreak ?? 0,
      label: "Day Streak",
      iconBg: "bg-amber-100 dark:bg-amber-950/50",
      iconColor: "text-amber-600 dark:text-amber-400",
    },
    {
      icon: Trophy,
      value: insights?.goalsMet ?? 0,
      label: "Goals Met",
      iconBg: "bg-emerald-100 dark:bg-emerald-950/50",
      iconColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      icon: TrendingUp,
      value: insights?.bestDayMl ? formatMl(insights.bestDayMl) : "-",
      label: "Best Day",
      iconBg: "bg-blue-100 dark:bg-blue-950/50",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium">Water Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className={`mx-auto mb-2 flex size-10 items-center justify-center rounded-lg ${stat.iconBg}`}
              >
                <stat.icon className={`size-5 ${stat.iconColor}`} />
              </div>
              <p className="text-xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
        
        {insights?.dailyAvgMl != null && insights.dailyAvgMl > 0 && (
          <div className="mt-4 rounded-lg bg-muted/50 p-3 text-center">
            <p className="text-sm text-muted-foreground">
              Daily Average:{" "}
              <span className="font-medium text-foreground">
                {formatMl(insights.dailyAvgMl)}
              </span>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
