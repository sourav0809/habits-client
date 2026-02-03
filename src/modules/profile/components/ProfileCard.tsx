import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface ProfileCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  className?: string;
}

const ProfileCard = ({ label, value, icon, className }: ProfileCardProps) => (
  <Card
    className={cn(
      "border-border/80 bg-card shadow-sm transition-all hover:shadow-md",
      className
    )}
  >
    <CardContent className="flex items-center gap-4 p-4 sm:p-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400 sm:h-11 sm:w-11">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
        <p className="truncate text-sm font-semibold text-foreground sm:text-base">
          {value}
        </p>
      </div>
    </CardContent>
  </Card>
);

export default ProfileCard;
