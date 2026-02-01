import { Outlet } from "react-router-dom";
import Sidebar from "@/components/sidebar";
import useIsMobile from "@/components/sidebar/hooks/useIsMobile";

export default function PrivateLayout() {
  const isMobile = useIsMobile();
  const sidebarWidth = isMobile ? 0 : 80; // w-20 = 5rem = 80px; hover expands to 256px

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main
        className="min-h-screen transition-[margin] duration-300 ease-in-out"
        style={{ marginLeft: isMobile ? 0 : sidebarWidth }}
      >
        {isMobile && <div className="h-16 shrink-0" />}
        <div className="p-4 sm:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
