import { useState } from 'react';
import { X } from 'lucide-react';
import useIsMobile from './hooks/useIsMobile';
import useBodyScrollLock from './hooks/useBodyScrollLock';
import SidebarHeader from './SidebarHeader';
import SidebarContent from './SidebarContent';
import SidebarFooter from './SidebarFooter';

const Sidebar = () => {
  const isMobile = useIsMobile();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  useBodyScrollLock(isMobileSidebarOpen);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen((prev) => !prev);
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  const handleNavigate = () => {
    if (isMobile) {
      closeMobileSidebar();
    }
  };

  return (
    <>
      {/* Mobile Header */}
      {isMobile && <SidebarHeader onMenuClick={toggleMobileSidebar} />}

      {/* Mobile Sidebar Overlay */}
      {isMobile && isMobileSidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={closeMobileSidebar} />
      )}

      {/* Sidebar */}
      <div
        className={`${
          isMobile
            ? `fixed left-0 top-0 z-50 h-screen w-64 transform transition-transform duration-300 ease-in-out ${
                isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
              }`
            : 'group fixed left-0 top-0 z-40 flex h-screen w-20 flex-col justify-between overflow-hidden border-r bg-white shadow-sm transition-all duration-300 ease-in-out hover:w-64'
        } bg-white shadow-sm`}
      >
        {/* Close button for mobile */}
        {isMobile && (
          <div className="flex items-center justify-end p-4">
            <button
              onClick={closeMobileSidebar}
              className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        )}

        {/* Content */}
        <SidebarContent isMobile={isMobile} onNavigate={handleNavigate} />

        {/* Footer */}
        <SidebarFooter isMobile={isMobile} onNavigate={handleNavigate} />
      </div>
    </>
  );
};

export default Sidebar;
