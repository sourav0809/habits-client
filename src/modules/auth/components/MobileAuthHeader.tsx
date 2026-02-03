import { HabitTrackerLogo } from "@/components/sidebar/HabitTrackerLogo";

export function MobileAuthHeader() {
  return (
    <header className="lg:hidden">
      <HabitTrackerLogo isMobile showLabel className="mb-4" />
      <p className="text-left text-sm leading-relaxed text-muted-foreground">
        Track calories. Log water. Build lasting habits.
      </p>
    </header>
  );
}
