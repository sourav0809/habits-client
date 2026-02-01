import { Home, UtensilsCrossed, Droplets, Target, User, Palette } from "lucide-react";

export const SIDEBAR_ICONS = {
  Home,
  UtensilsCrossed,
  Droplets,
  Target,
  User,
  Palette,
} as const;

export type SidebarIconName = keyof typeof SIDEBAR_ICONS;

export const getSidebarIcon = (iconName: string): (typeof SIDEBAR_ICONS)[SidebarIconName] => {
  return SIDEBAR_ICONS[iconName as SidebarIconName] ?? Home;
};
