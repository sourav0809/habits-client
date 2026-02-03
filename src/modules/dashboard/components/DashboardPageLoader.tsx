import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function DashboardPageLoader() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header skeleton */}
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-xl bg-muted animate-pulse" />
        <div className="space-y-2">
          <div className="h-6 w-32 rounded bg-muted animate-pulse" />
          <div className="h-4 w-48 rounded bg-muted animate-pulse" />
        </div>
      </div>

      {/* Date range skeleton */}
      <div className="h-10 w-52 rounded-lg bg-muted animate-pulse" />

      {/* Stat cards skeleton */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="h-3 w-24 rounded bg-muted animate-pulse" />
                <div className="size-9 rounded-lg bg-muted animate-pulse" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-8 w-20 rounded bg-muted animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Goal progress + Quick actions skeleton */}
      <div className="grid gap-4 lg:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="h-5 w-32 rounded bg-muted animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="h-40 w-full rounded bg-muted animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts skeleton */}
      <div className="grid gap-4 lg:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="h-5 w-40 rounded bg-muted animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="h-60 w-full rounded bg-muted animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
