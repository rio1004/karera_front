import { Gift, Home, Wallet2 } from "lucide-react";

export const BottomNavigation = () => {
  const navItems = [
    { id: "lobby", label: "Lobby", icon: Home, isActive: true },
    { id: "wallet", label: "Wallet", icon: Wallet2 },
    { id: "gift", label: "Promotion", icon: Gift },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-red-500 text-white z-50 shadow-lg">
      <div className="flex justify-around items-center py-3">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              className="flex flex-col items-center space-y-1 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
