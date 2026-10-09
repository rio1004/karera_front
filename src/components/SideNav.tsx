import { Menu } from "lucide-react";
import { MenuItems } from "./NavItem";
import { PLAYER_NAVIGATION_ITEMS } from "@/constant/playerNavItem";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const Sidebar = ({ isCollapsed, onToggle }: SidebarProps) => {
  return (
    <div
      className={`
      bg-white/95 backdrop-blur-sm border-r border-gray-200 
      h-screen transition-all duration-300 ease-in-out 
      ${isCollapsed ? "w-16" : "w-60"}
      shadow-lg relative z-50
    `}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 h-16">
        {/* Toggle button - always visible */}
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200 text-gray-600 hover:text-blue-600 flex-shrink-0"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Logo - only visible when expanded */}
        <div
          className={`
          font-bold text-xl text-red-500 transition-opacity duration-300 flex-1 text-center
          ${isCollapsed ? "opacity-0 pointer-events-none" : "opacity-100"}
        `}
        >
          Karera.Live
        </div>

        {/* Spacer to center logo when expanded */}
        <div className={`w-9 ${isCollapsed ? "hidden" : "block"}`}></div>
      </div>

      {/* Navigation */}
      <nav className="py-4 px-2">
        {PLAYER_NAVIGATION_ITEMS.map((item) => (
          <MenuItems key={item.id} item={item} isCollapsed={isCollapsed} />
        ))}
      </nav>
    </div>
  );
};
