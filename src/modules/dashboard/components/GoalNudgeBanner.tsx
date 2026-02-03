import { Link } from "react-router-dom";
import { Target, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAVIGATION_PATHS } from "@/constants";

export function GoalNudgeBanner() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 via-blue-50 to-cyan-50 p-4 dark:border-blue-900/50 dark:from-blue-950/40 dark:via-blue-950/30 dark:to-cyan-950/30 sm:p-6">
      {/* Decorative elements */}
      <div className="absolute -right-8 -top-8 size-32 rounded-full bg-blue-200/30 blur-2xl dark:bg-blue-500/10" />
      <div className="absolute -bottom-4 -left-4 size-24 rounded-full bg-cyan-200/30 blur-2xl dark:bg-cyan-500/10" />
      
      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3 sm:items-center">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/50">
            <Target className="size-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">
              Set Your Daily Goals
            </h3>
            <p className="text-sm text-muted-foreground">
              Define your calorie and water targets to unlock full tracking features.
            </p>
          </div>
        </div>
        <Button
          asChild
          className="w-full gap-2 bg-blue-600 text-white shadow-lg shadow-blue-500/25 hover:bg-blue-700 sm:w-auto"
        >
          <Link to={NAVIGATION_PATHS.GOALS}>
            Set Goals
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
