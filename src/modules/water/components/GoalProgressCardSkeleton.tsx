import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      aria-hidden
    />
  );
}

const GoalProgressCardSkeleton = () => (
  <Card className="relative overflow-hidden">
    <CardHeader className="pb-2">
      <Skeleton className="h-5 w-40" />
    </CardHeader>
    <CardContent>
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <Skeleton className="h-[160px] w-[160px] rounded-full" />
        <div className="flex flex-col gap-3">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-7 w-24" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-6 w-20" />
        </div>
      </div>
    </CardContent>
  </Card>
);

export default GoalProgressCardSkeleton;
