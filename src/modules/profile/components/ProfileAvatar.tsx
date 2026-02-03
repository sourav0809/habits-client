import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export interface ProfileAvatarProps {
  name: string;
  imageUrl?: string;
  className?: string;
}

export function ProfileAvatar({ name, imageUrl, className }: ProfileAvatarProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Avatar
      className={cn(
        "h-24 w-24 border-4 border-blue-100 dark:border-blue-950/50 sm:h-28 sm:w-28",
        className
      )}
    >
      <AvatarImage src={imageUrl} alt={name} />
      <AvatarFallback className="bg-blue-100 text-2xl font-bold text-blue-600 dark:bg-blue-950/50 dark:text-blue-400 sm:text-3xl">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}
