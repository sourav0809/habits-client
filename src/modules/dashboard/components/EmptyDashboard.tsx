import { Link } from "react-router-dom";
import { Target, Utensils, Droplets, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NAVIGATION_PATHS } from "@/constants";

const EmptyDashboard = () => (
  <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
    <Card className="w-full max-w-md border-dashed bg-gradient-to-b from-card to-muted/20">
      <CardContent className="flex flex-col items-center py-12 text-center">
        {/* Icon */}
        <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-950/50 dark:to-cyan-950/50">
          <Target className="size-10 text-blue-600 dark:text-blue-400" />
        </div>

        {/* Title */}
        <h2 className="mb-2 text-xl font-semibold text-foreground">
          Welcome to your Dashboard!
        </h2>

        {/* Description */}
        <p className="mb-8 max-w-sm text-muted-foreground">
          Start by setting your daily calorie and water goals, then begin
          tracking your intake to see your progress here.
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            asChild
            className="gap-2 bg-blue-600 text-white hover:bg-blue-700"
          >
            <Link to={NAVIGATION_PATHS.GOALS}>
              <Target className="size-4" />
              Set Your Goals
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        {/* Secondary actions */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="text-muted-foreground"
          >
            <Link to={NAVIGATION_PATHS.FOOD_LOG}>
              <Utensils className="size-4 mr-1.5" />
              Log Food
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="text-muted-foreground"
          >
            <Link to={NAVIGATION_PATHS.WATER_LOG}>
              <Droplets className="size-4 mr-1.5" />
              Log Water
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default EmptyDashboard;
