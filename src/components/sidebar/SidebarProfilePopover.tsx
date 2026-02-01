import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { NAVIGATION_PATHS, LOCAL_STORAGE_KEYS } from "@/constants";
import { useMe } from "@/modules/auth/hooks";
import { cn } from "@/lib/utils";
import { removeItemFromLocalStorage } from "@/utils";

interface SidebarProfilePopoverProps {
  onNavigate: () => void;
}

export default function SidebarProfilePopover({ onNavigate }: SidebarProfilePopoverProps) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { data } = useMe();
  const user = data?.user;

  const displayName = user?.name ?? "Account";
  const displayEmail = user?.email ?? "";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleProfileClick = () => {
    navigate(NAVIGATION_PATHS.PROFILE);
    setOpen(false);
    onNavigate();
  };

  const handleLogoutClick = () => {
    removeItemFromLocalStorage(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
    setOpen(false);
    onNavigate();
    navigate(NAVIGATION_PATHS.LOGIN, { replace: true });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex w-full cursor-pointer items-center rounded-xl p-3 text-left transition-all",
            "text-muted-foreground hover:bg-muted"
          )}
          aria-label="Profile menu"
        >
          <User className="h-5 w-5 flex-shrink-0" />
          <span className="whitespace-nowrap font-medium opacity-0 transition-all duration-300 group-hover:translate-x-3 group-hover:opacity-100">
            Profile
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        side="right"
        sideOffset={8}
        className="w-64 rounded-lg border bg-popover p-0 shadow-md"
      >
        <div className="p-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 shrink-0">
              <AvatarImage src={undefined} alt={displayName} />
              <AvatarFallback className="bg-muted text-xs font-medium">{initials}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">{displayName}</p>
              {displayEmail ? (
                <p className="truncate text-xs text-muted-foreground">{displayEmail}</p>
              ) : null}
            </div>
          </div>
        </div>
        <Separator />
        <button
          type="button"
          onClick={handleProfileClick}
          className="flex w-full cursor-pointer items-center gap-2 px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-muted"
        >
          <User className="h-4 w-4 shrink-0 text-muted-foreground" />
          <span>Profile</span>
        </button>
        <Separator />
        <button
          type="button"
          onClick={handleLogoutClick}
          className="flex w-full cursor-pointer items-center gap-2 px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-muted"
        >
          <LogOut className="h-4 w-4 shrink-0 text-muted-foreground" />
          <span>Logout</span>
        </button>
      </PopoverContent>
    </Popover>
  );
}
