import { useState } from "react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { NAVIGATION_PATHS, LOCAL_STORAGE_KEYS } from "@/constants";
import { removeItemFromLocalStorage } from "@/utils";
import { toast } from "sonner";
import { LogoutConfirmDialog } from "./LogoutConfirmDialog";

interface SidebarFooterProps {
  isMobile: boolean;
  onNavigate: () => void;
}

export default function SidebarFooter({
  isMobile,
  onNavigate,
}: SidebarFooterProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const performLogout = () => {
    queryClient.clear();
    removeItemFromLocalStorage(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
    setLogoutDialogOpen(false);
    onNavigate();
    navigate(NAVIGATION_PATHS.LOGIN, { replace: true });
    toast.success("Logged out successfully");
  };

  if (!isMobile) {
    return null;
  }

  return (
    <>
      <div className="space-y-2 p-4">
        <div
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setLogoutDialogOpen(true)}
          className="flex cursor-pointer items-center rounded-xl p-3 text-muted-foreground transition-all hover:bg-red-50 hover:text-red-600"
          onClick={() => setLogoutDialogOpen(true)}
        >
          <LogOut className="h-5 w-5 shrink-0 text-red-500" />
          <span className="ml-3">Logout</span>
        </div>
      </div>

      <LogoutConfirmDialog
        open={logoutDialogOpen}
        onOpenChange={setLogoutDialogOpen}
        onConfirm={performLogout}
      />
    </>
  );
}
