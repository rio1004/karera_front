import { OPERATOR_ICON } from "@/constant/image";
import { formatToPeso } from "@/utils/utils.helper";

interface TransactionTypeCardProps {
  title: string;
  amount: number;
  currency?: string;
  variant: "commission" | "load" | "credits";
  dimensions?: string;
  className?: string;
  width?: string;
  height?: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export const TransactionTypeCard = ({
  title,
  amount,
  variant,
  className = "",
  width = "w-80",
  height = "h-36",
  isSelected = false,
  onClick,
}: TransactionTypeCardProps) => {
  const getVariantConfig = () => {
    switch (variant) {
      case "commission":
        return { backgroundImage: OPERATOR_ICON.goldCard.src };
      case "load":
        return { backgroundImage: OPERATOR_ICON.blueCard.src };
      case "credits":
        return { backgroundImage: OPERATOR_ICON.redCard.src };
      default:
        return { backgroundImage: "" };
    }
  };

  const config = getVariantConfig();

  return (
    <div
      className={`relative ${width} ${height} rounded-xl text-white shadow-lg overflow-hidden ${
        isSelected ? "border-2 border-yellow-400" : "border border-gray-200"
      } ${className}`}
      onClick={onClick}
      style={{
        backgroundImage: `url(${config.backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative z-10 space-y-4 p-6 h-full flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <h3 className="text-3xl font-medium text-white drop-shadow-sm">
            {title}
          </h3>
        </div>
        <div className="mt-auto">
          <p className="text-3xl text-end font-bold text-white drop-shadow-lg">
            {formatToPeso(Number(amount))}
          </p>
        </div>
      </div>
    </div>
  );
};
