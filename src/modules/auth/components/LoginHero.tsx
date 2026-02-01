import { cn } from "@/lib/utils";
import { LOGIN_HERO_FEATURES } from "../constants";

type LoginHeroProps = { className?: string };

export function LoginHero({ className }: LoginHeroProps) {
  return (
    <div
      className={cn(
        "relative flex min-h-[320px] flex-col justify-center overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 px-8 py-12 text-white sm:min-h-0 sm:flex-1 sm:px-10 sm:py-16 lg:px-14 lg:py-20",
        className
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,255,255,0.12),transparent)]" />
      <div className="relative z-10 mx-auto w-full max-w-xl space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-3xl lg:text-5xl leading-12">
            Transform Your Habits with Habits
          </h1>
          <p className="max-w-md text-base text-blue-100 sm:text-lg">
            Make data-driven decisions with our habits dashboard. Track
            calories, water, and daily routines so you stay consistent.
          </p>
        </div>
        <ul className="flex flex-wrap gap-4 sm:gap-6">
          {LOGIN_HERO_FEATURES.map(({ icon: Icon, text, iconClassName, bgClassName }) => (
            <li
              key={text}
              className="flex items-center gap-3 rounded-xl bg-white/15 px-4 py-3 backdrop-blur-sm"
            >
              <span
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                  bgClassName
                )}
              >
                <Icon className={cn("h-5 w-5", iconClassName)} aria-hidden />
              </span>
              <span className="font-semibold text-white">{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
