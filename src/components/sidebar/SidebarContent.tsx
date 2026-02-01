import { SIDEBAR_NAV_ITEMS } from "./constants";
import { cn } from "@/lib/utils";
import SidebarNavItem from "./SidebarNavItem";
import SidebarProfilePopover from "./SidebarProfilePopover";
import { HabitTrackerLogo } from "./HabitTrackerLogo";

interface SidebarContentProps {
  isMobile: boolean;
  onNavigate: () => void;
}

export default function SidebarContent({
  isMobile,
  onNavigate,
}: SidebarContentProps) {
  return (
    <div
      className={cn(
        "flex flex-col p-4",
        !isMobile && "min-h-0 flex-1 justify-between py-8",
        isMobile && "pt-0"
      )}
    >
      <div>
        {/* Logo */}
        <div
          className={cn(
            "flex items-center justify-center",
            !isMobile && "mb-12 h-24",
            isMobile && "mb-7"
          )}
        >
          <HabitTrackerLogo
            className={!isMobile ? "h-10 w-10" : "h-8 w-8"}
            showLabel
            isMobile={isMobile}
          />
        </div>

        {/* Nav items */}
        <div className={cn("space-y-2", !isMobile && "mt-5")}>
          {SIDEBAR_NAV_ITEMS.map((item) => (
            <SidebarNavItem
              key={item.id}
              id={item.id}
              path={item.path}
              label={item.label}
              icon={item.icon}
              isMobile={isMobile}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </div>

      {/* Desktop: profile at bottom */}
      {!isMobile && (
        <div className="mt-2">
          <SidebarProfilePopover onNavigate={onNavigate} />
        </div>
      )}
    </div>
  );
}
