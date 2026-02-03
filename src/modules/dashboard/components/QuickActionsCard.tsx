import { Link } from "react-router-dom";
import { Utensils, Droplets, Target, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NAVIGATION_PATHS } from "@/constants";

const quickActions = [
  {
    label: "Add Food",
    description: "Log your meals",
    icon: Utensils,
    href: NAVIGATION_PATHS.FOOD_LOG,
    iconBg: "bg-blue-100 dark:bg-blue-950/50",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    label: "Add Water",
    description: "Track hydration",
    icon: Droplets,
    href: NAVIGATION_PATHS.WATER_LOG,
    iconBg: "bg-cyan-100 dark:bg-cyan-950/50",
    iconColor: "text-cyan-600 dark:text-cyan-400",
  },
  {
    label: "View Goals",
    description: "Check your targets",
    icon: Target,
    href: NAVIGATION_PATHS.GOALS,
    iconBg: "bg-emerald-100 dark:bg-emerald-950/50",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
];

const QuickActionsCard = () => (
  <Card>
    <CardHeader className="pb-3">
      <CardTitle className="text-base font-medium">Quick Actions</CardTitle>
    </CardHeader>
    <CardContent className="grid gap-2">
      {quickActions.map((action) => (
        <Link
          key={action.label}
          to={action.href}
          className="group flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-3 transition-all hover:bg-muted/70"
        >
          <div
            className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${action.iconBg}`}
          >
            <action.icon className={`size-5 ${action.iconColor}`} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-foreground">{action.label}</p>
            <p className="text-sm text-muted-foreground">
              {action.description}
            </p>
          </div>
          <ChevronRight className="size-5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
        </Link>
      ))}
    </CardContent>
  </Card>
);

export default QuickActionsCard;
