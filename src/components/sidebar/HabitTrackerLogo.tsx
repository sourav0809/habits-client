import { cn } from "@/lib/utils";
import { LOGO } from "@/constants/image.const";

const APP_NAME = "Habits";

interface HabitTrackerLogoProps {
  className?: string;
  showLabel?: boolean;
  /** Desktop: label fades in on hover. Mobile: label always visible. */
  labelClassName?: string;
  isMobile?: boolean;
}

/** Habit tracker logo: checklist/checkmark style SVG. */
export function HabitTrackerLogo({
  className,
  showLabel = true,
  labelClassName,
  isMobile = false,
}: HabitTrackerLogoProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3",
        !isMobile && "flex-col",
        isMobile && "flex-row",
        className
      )}
    >
      <img
        src={LOGO}
        alt="Habit Tracker Logo"
        className={cn(
          "shrink-0 transition-[width,height] duration-300 ease-in-out",
          isMobile ? "h-10 w-10" : "h-10 w-10 group-hover:h-20 group-hover:w-20"
        )}
      />
      {showLabel && (
        <span
          className={cn(
            "font-bold text-gray-900",
            !isMobile &&
              "text-base opacity-0 transition-opacity duration-75 group-hover:opacity-100 group-hover:delay-300 group-hover:duration-300",
            isMobile && "text-base",
            labelClassName
          )}
        >
          {APP_NAME}
        </span>
      )}
    </div>
  );
}
