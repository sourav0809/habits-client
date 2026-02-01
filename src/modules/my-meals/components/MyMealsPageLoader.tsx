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

export function MyMealsPageLoader() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48 sm:w-64" />
        <Skeleton className="h-4 w-full max-w-md" />
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="overflow-hidden border-border/80">
            <CardHeader className="flex flex-row items-start justify-between gap-2 pb-1">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="size-9 rounded-lg" />
            </CardHeader>
            <CardContent className="pt-0">
              <Skeleton className="h-8 w-24" />
            </CardContent>
          </Card>
        ))}
      </section>

      <div className="flex justify-start">
        <Skeleton className="h-9 w-32" />
      </div>

      <section className="space-y-4">
        <Skeleton className="h-4 w-24" />
        <Card className="overflow-hidden rounded-xl border border-gray-200 dark:border-border">
          <CardContent className="p-0">
            <div className="flex flex-col">
              <Skeleton className="h-12 w-full rounded-none" />
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton
                  key={i}
                  className="h-16 w-full rounded-none border-t border-gray-200 dark:border-border"
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-6">
        <Skeleton className="h-4 w-20" />
        <div className="grid gap-6 lg:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-5 w-40" />
              </CardHeader>
              <CardContent className="pt-0">
                <Skeleton className="h-[260px] w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
