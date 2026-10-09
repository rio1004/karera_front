import { Sidebar } from "@/components/SideNav";
import { useScreenSize } from "../../hooks/useScreenSize";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

function MainLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const screenSize = useScreenSize();

  useEffect(() => {
    const isMediumDevice = screenSize.width >= 769 && screenSize.width <= 992;
    if (isMediumDevice && !isCollapsed) {
      setIsCollapsed(true);
    }
  }, [screenSize.width, isCollapsed]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex">
      <Sidebar isCollapsed={isCollapsed} onToggle={toggleSidebar} />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
