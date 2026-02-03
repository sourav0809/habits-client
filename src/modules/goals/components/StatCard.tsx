import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface StatCardProps {
  title: string;
  value: number | string;
  unit: string;
  icon: React.ReactNode;
  iconBgClass: string;
  trend?: { value: number; isPositive: boolean };
  className?: string;
}

const StatCard = ({
  title,
  value,
  unit,
  icon,
  iconBgClass,
  trend,
  className,
}: StatCardProps) => {
  return (
    <Card
      className={cn(
        "relative overflow-hidden border-border/80 bg-card shadow-sm transition-all hover:shadow-md",
        className
      )}
    >
      <CardHeader className="flex flex-row items-start justify-between gap-2 pb-1">
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
      <CardContent className="pt-0">
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
            {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}% vs last week
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
