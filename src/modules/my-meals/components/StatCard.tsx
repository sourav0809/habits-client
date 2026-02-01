import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface StatCardProps {
  title: string;
  value: number | string;
  unit: string;
  icon: React.ReactNode;
  iconBgClass: string;
}

export function StatCard({
  title,
  value,
  unit,
  icon,
  iconBgClass,
}: StatCardProps) {
  return (
    <Card className="relative overflow-hidden border-border/80 bg-card shadow-sm">
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
      </CardContent>
    </Card>
  );
}
