import { cn } from "@/lib/utils";

const APP_NAME = "Habit Tracker";

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
        isMobile && "flex-row"
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("shrink-0 text-foreground", className)}
        aria-hidden
      >
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
      </svg>
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
