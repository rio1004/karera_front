import { useNavigate, useLocation } from "react-router-dom";
import type { BottomNavProps } from "@/types";

export const BottomNav = ({
  icon,
  label,
  to,
  isWallet,
  onClick,
}: BottomNavProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = location.pathname === to;

  const handleNav = () => {
    if (to) {
      navigate(to);
      return;
    }
    onClick?.();
  };

  return (
    <div
      onClick={handleNav}
      className="flex flex-col items-center relative cursor-pointer"
    >
      {isWallet ? (
        <div className="bg-yellow-400 p-1 rounded-full -mt-10 mb-1">
          <div className="bg-red-900 p-3 rounded-full">
            <img src={icon} alt={label} className="h-[42px]" />
          </div>
        </div>
      ) : (
        <img src={icon} alt={label} className=" h-[22px] mb-1" />
      )}
      <span
        className={`${
          isActive
            ? "bg-yellow-500 px-2 py-0.5 font-bold rounded-sm text-red-500"
            : ""
        } rounded-lg text-xs`}
      >
        {label}
      </span>
    </div>
  );
};
