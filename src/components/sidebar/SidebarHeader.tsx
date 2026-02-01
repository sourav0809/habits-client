import { Menu } from "lucide-react";
import { HabitTrackerLogo } from "./HabitTrackerLogo";

interface SidebarHeaderProps {
  onMenuClick: () => void;
}

export default function SidebarHeader({ onMenuClick }: SidebarHeaderProps) {
  return (
    <div className="fixed left-0 right-0 top-0 z-50 flex h-16 items-center justify-start gap-3 border-b bg-white px-4 shadow-sm">
      <button
        type="button"
        onClick={onMenuClick}
        className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100"
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6" />
      </button>
      <HabitTrackerLogo className="h-8 w-8" showLabel isMobile />
    </div>
  );
}
