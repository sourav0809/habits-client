import { cn } from "@/lib/utils";

interface AuthDividerProps {
  className?: string;
}

export function AuthDivider({ className }: AuthDividerProps) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-border to-border rounded-full" />
      <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent via-border to-border rounded-full" />
    </div>
  );
}
