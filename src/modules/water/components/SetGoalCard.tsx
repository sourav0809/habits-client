import { Target } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NAVIGATION_PATHS } from "@/constants";

const MESSAGE =
  "Set your daily water goal to track progress and stay hydrated. Your goal will appear here once you've set it.";

export function SetGoalCard() {
  return (
    <Card className="border-amber-200 bg-amber-50/50 dark:border-amber-900/50 dark:bg-amber-950/20">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base font-medium text-amber-800 dark:text-amber-200">
          <Target className="size-4 text-amber-600" />
          Today&apos;s Goal Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-amber-900/90 dark:text-amber-100/90">
          {MESSAGE}
        </p>
        <Button asChild className="bg-blue-600 text-white hover:bg-blue-700">
          <Link to={NAVIGATION_PATHS.GOALS}>Set your goal</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
