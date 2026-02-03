import { useLocation, useNavigate } from "react-router-dom";
import { getSidebarIcon } from "./constants/sidebarIcons.const";
import type { SidebarIconName } from "./constants/sidebarIcons.const";

interface SidebarNavItemProps {
  id: string;
  path: string;
  label: string;
  icon: SidebarIconName;
  isMobile: boolean;
  onNavigate: () => void;
}

const SidebarNavItem = ({
  path,
  label,
  icon,
  isMobile,
  onNavigate,
}: SidebarNavItemProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const IconComponent = getSidebarIcon(icon);
  const isActive = location.pathname === path;

  const handleClick = () => {
    navigate(path);
    onNavigate();
  };

  return (
    <div
      className={`flex cursor-pointer items-center rounded-xl p-3 transition-all ${
        isActive
          ? "bg-muted text-primary"
          : "text-muted-foreground hover:bg-muted"
      }`}
      onClick={handleClick}
    >
      <IconComponent
        className={`h-5 w-5 shrink-0 ${isActive ? "text-blue-600" : ""}`}
      />
      <span
        className={`${
          isMobile
            ? "ml-3"
            : "whitespace-nowrap font-medium opacity-0 transition-all duration-300 group-hover:translate-x-3 group-hover:opacity-100"
        }`}
      >
        {label}
      </span>
    </div>
  );
};

export default SidebarNavItem;
