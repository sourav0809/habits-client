import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface StatCardProps {
  title: string;
  value: number | string;
  unit: string;
  icon: React.ReactNode;
  iconBgClass: string;
  trend?: { value: number; isPositive: boolean };
  progress?: number; // 0-100
  className?: string;
}

export function StatCard({
  title,
  value,
  unit,
  icon,
  iconBgClass,
  trend,
  progress,
  className,
}: StatCardProps) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden border-border/80 bg-card shadow-sm transition-all hover:shadow-md",
        className
      )}
    >
      {/* Progress bar background */}
      {progress !== undefined && (
        <div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent transition-all duration-500"
          style={{ width: `${Math.min(100, progress)}%` }}
        />
      )}
      
      <CardHeader className="relative flex flex-row items-start justify-between gap-2 pb-1">
        <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {title}
        </CardTitle>
        <div
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-lg",
            iconBgClass
          )}
        >
          {icon}
        </div>
      </CardHeader>
      <CardContent className="relative pt-0">
        <p className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {value}
          <span className="ml-1.5 text-base font-normal text-muted-foreground sm:text-lg">
            {unit}
          </span>
        </p>
        {trend !== undefined && (
          <p
            className={cn(
              "mt-1 text-xs font-medium",
              trend.isPositive ? "text-emerald-600" : "text-orange-600"
            )}
          >
            {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}% vs yesterday
          </p>
        )}
        {progress !== undefined && (
          <p className="mt-1 text-xs font-medium text-muted-foreground">
            {progress}% of daily goal
          </p>
        )}
      </CardContent>
    </Card>
  );
}
