import { BarChart3, Droplets, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const LOGIN_HERO_FEATURES: ReadonlyArray<{
  icon: LucideIcon;
  text: string;
  iconClassName: string;
  bgClassName: string;
}> = [
  {
    icon: BarChart3,
    text: "Real-time Analytics",
    iconClassName: "text-amber-300",
    bgClassName: "bg-amber-400/25",
  },
  {
    icon: Droplets,
    text: "Track Water & Calories",
    iconClassName: "text-sky-200",
    bgClassName: "bg-sky-400/25",
  },
  {
    icon: TrendingUp,
    text: "Growth Insights",
    iconClassName: "text-emerald-300",
    bgClassName: "bg-emerald-400/25",
  },
];
