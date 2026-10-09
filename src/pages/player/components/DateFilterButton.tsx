import type { ReactNode } from "react";

interface DateFilterButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  icon?: ReactNode;
}

export const DateFilterButton = ({ label, isActive, onClick, icon }: DateFilterButtonProps) => (
  <button
    onClick={onClick}
    className={`
      flex items-center justify-center gap-2 px-4 py-2 rounded-lg border transition-all
      ${isActive 
        ? 'bg-green-500 text-white border-green-500 shadow-sm' 
        : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:shadow-sm'
      }
    `}
  >
    {icon && <span className="w-4 h-4">{icon}</span>}
    <span className="text-sm font-medium">{label}</span>
  </button>
);