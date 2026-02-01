import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { NAVIGATION_PATHS, LOCAL_STORAGE_KEYS } from "@/constants";
import { removeItemFromLocalStorage } from "@/utils";

interface SidebarFooterProps {
  isMobile: boolean;
  onNavigate: () => void;
}

export default function SidebarFooter({ isMobile, onNavigate }: SidebarFooterProps) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    removeItemFromLocalStorage(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
    onNavigate();
    navigate(NAVIGATION_PATHS.LOGIN, { replace: true });
  };

  if (!isMobile) {
    return null;
  }

  return (
    <div className="space-y-2 p-4">
      <div
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handleLogoutClick()}
        className="flex cursor-pointer items-center rounded-xl p-3 text-muted-foreground transition-all hover:bg-red-50 hover:text-red-600"
        onClick={handleLogoutClick}
      >
        <LogOut className="h-5 w-5 flex-shrink-0 text-red-500" />
        <span className="ml-3">Logout</span>
      </div>
    </div>
  );
}
