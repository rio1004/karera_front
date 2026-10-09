import type { NavItem } from "@/constant/playerNavItem";

interface NavItemProps {
  item: NavItem;
  isCollapsed: boolean;
}

export const MenuItems = ({ item, isCollapsed }: NavItemProps) => {
  const IconComponent = item.icon;
  
  return (
    <div className={`
      flex items-center mx-2 mb-1 rounded-lg cursor-pointer
      transition-all duration-200 group relative
      ${item.isActive 
        ? 'bg-blue-600 text-white shadow-lg' 
        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
      }
      ${isCollapsed ? 'px-3 py-3 justify-center' : 'px-4 py-3'}
      hover:transform hover:translate-x-1
    `}>
      <div className="relative flex items-center">
        <IconComponent className="w-5 h-5 flex-shrink-0" />
        {item.hasNotification && (
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
        )}
      </div>
      
      <span className={`
        ml-3 text-sm font-medium transition-opacity duration-300
        ${isCollapsed ? 'opacity-0 pointer-events-none absolute' : 'opacity-100'}
      `}>
        {item.label}
      </span>

      {/* Tooltip for collapsed state */}
      {isCollapsed && (
        <div className="
          absolute left-full ml-2 px-2 py-1 bg-gray-100 text-black text-xs
          rounded opacity-0 pointer-events-none group-hover:opacity-100
          transition-opacity duration-200 whitespace-nowrap z-50
        ">
          {item.label}
        </div>
      )}
    </div>
  );
};