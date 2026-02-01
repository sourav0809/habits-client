import { Outlet } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";

const PublicLayout = () => {
  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8 sm:py-10">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default PublicLayout;
