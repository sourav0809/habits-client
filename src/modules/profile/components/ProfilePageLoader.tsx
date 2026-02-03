import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function ProfilePageLoader() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="space-y-2">
        <div className="h-8 w-32 animate-pulse rounded-md bg-muted" />
        <div className="h-5 w-64 animate-pulse rounded-md bg-muted" />
      </div>

      {/* Avatar card skeleton */}
      <Card className="border-border/80 bg-card shadow-sm">
        <CardContent className="flex flex-col items-center gap-4 p-6 sm:flex-row sm:gap-6">
          <div className="h-24 w-24 animate-pulse rounded-full bg-muted sm:h-28 sm:w-28" />
          <div className="space-y-2 text-center sm:text-left">
            <div className="h-7 w-40 animate-pulse rounded-md bg-muted" />
            <div className="h-4 w-24 animate-pulse rounded-md bg-muted" />
          </div>
        </CardContent>
      </Card>

      {/* Info cards skeleton */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="border-border/80 bg-card shadow-sm">
          <CardHeader className="flex flex-row items-center gap-4 p-4 sm:p-5">
            <div className="h-10 w-10 animate-pulse rounded-lg bg-muted" />
            <div className="space-y-2">
              <div className="h-3 w-16 animate-pulse rounded bg-muted" />
              <div className="h-5 w-32 animate-pulse rounded bg-muted" />
            </div>
          </CardHeader>
        </Card>
        <Card className="border-border/80 bg-card shadow-sm">
          <CardHeader className="flex flex-row items-center gap-4 p-4 sm:p-5">
            <div className="h-10 w-10 animate-pulse rounded-lg bg-muted" />
            <div className="space-y-2">
              <div className="h-3 w-16 animate-pulse rounded bg-muted" />
              <div className="h-5 w-32 animate-pulse rounded bg-muted" />
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
