import { ICONS } from '@/constant/image';
import { X } from 'lucide-react';

interface BadgePopupProps {
  isOpen: boolean;
  onClose: () => void;
  vipType: "vip" | "front_runner" | "loyalty" | "master_giver";
}

export const BadgePopup = ({
  isOpen,
  onClose,
  vipType
}: BadgePopupProps) => {
  if (!isOpen) return null;

  const badgeConfig = {
    vip: {
      icon: ICONS.vipBadge.src,
      title: "Congratulations!",
      description: "You've earned a VIP Badge and an exclusive Avatar Frame for betting over ₹500k in a month.",
      bgColor: "bg-gradient-to-br from-purple-600 to-purple-800",
      borderColor: "#fbbf24",
      iconBgColor: "bg-gradient-to-br from-purple-500 to-blue-600"
    },
    front_runner: {
      icon: ICONS.frontRunner.src,
      title: "Congratulations!",
      description: "You've earned a Front-Runner Badge for playing 300 rounds this week.",
      bgColor: "bg-gradient-to-br from-orange-500 to-red-600",
      borderColor: "#fbbf24",
      iconBgColor: "bg-gradient-to-br from-red-500 to-orange-600"
    },
    loyalty: {
      icon: ICONS.loyaltyBadge.src,
      title: "Congratulations!",
      description: "You've earned a Loyalty Badge for opening & betting daily for 7 consecutive days.",
      bgColor: "bg-gradient-to-br from-cyan-500 to-blue-600",
      borderColor: "#fbbf24",
      iconBgColor: "bg-gradient-to-br from-blue-500 to-purple-600"
    },
    master_giver: {
      icon: ICONS.masterBadge.src,
      title: "Congratulations!",
      description: "You've earned a Master Giver Badge for being one of the Top 10 Generous Givers for this month.",
      bgColor: "bg-gradient-to-br from-green-500 to-emerald-600",
      borderColor: "#fbbf24",
      iconBgColor: "bg-gradient-to-br from-emerald-500 to-green-600"
    }
  };

  const config = badgeConfig[vipType];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black opacity-75">
      <div
        className={`rounded-xl p-6 text-white w-[260px] h-[216px] max-w-md relative ${config.bgColor}`}
        style={{ border: `4px solid ${config.borderColor}` }}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 -right-2 text-white hover:text-gray-300"
        >
          <X size={24} />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
            <img src={config.icon} alt={`${vipType} badge`} className='w-[152px] h-[146px] absolute -top-[85px] left-12 right-0'  />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-[#FFEA00] text-center mb-2 mt-[40px]">
          {config.title}
        </h2>

        {/* Description */}
        <p className="text-center text-sm">
          {config.description}
        </p>
      </div>
    </div>
  );
};
