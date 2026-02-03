import { NAVIGATION_PATHS } from "@/constants";
import type { SidebarIconName } from "./sidebarIcons.const";

export interface SidebarNavItemConfig {
  id: string;
  path: string;
  label: string;
  icon: SidebarIconName;
}

export const SIDEBAR_NAV_ITEMS: SidebarNavItemConfig[] = [
  { id: "dashboard", path: NAVIGATION_PATHS.DASHBOARD, label: "Dashboard", icon: "Home" },
  { id: "food-log", path: NAVIGATION_PATHS.FOOD_LOG, label: "Food Log", icon: "UtensilsCrossed" },
  { id: "water-log", path: NAVIGATION_PATHS.WATER_LOG, label: "Water Log", icon: "Droplets" },
  { id: "goals", path: NAVIGATION_PATHS.GOALS, label: "Goals", icon: "Target" },
  { id: "your-meals", path: NAVIGATION_PATHS.YOUR_MEALS, label: "Your Meals", icon: "Utensils" },
];
