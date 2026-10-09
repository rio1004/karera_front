import { UI_COLORS } from "@/constant/colors";
import { formatToPeso } from "@/utils/utils.helper";
import Text from "../Text";

type WalletAction = {
  label: string;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
};

type WalletCardProps = {
  title: string;
  balance: number;
  onRefresh: () => void;
  actions: WalletAction[];
};

const WalletCard = ({
  title,
  balance,
  onRefresh,
  actions,
}: WalletCardProps) => {
  return (
    <div className="bg-success text-white flex flex-col justify-center items-center py-[28px] px-[12px] mt-[22px] rounded-[20px]">
      <Text text={title} type="p1" color="white" />
      <div className="flex items-center gap-3">
        <p className="text-[32px] font-medium">{formatToPeso(balance)}</p>
        <button
          type="button"
          className="flex items-center justify-center"
          onClick={onRefresh}
        >
          <img src="/icons/refresh.png" alt="refresh" className="h-[15px]" />
        </button>
      </div>
      <div className="w-full flex gap-3 mt-3">
        {actions.map((action, idx) => (
          <div
            key={idx}
            className="flex w-full py-[10px] px-[11px] rounded-[50px] items-center gap-1 cursor-pointer border-[2px]"
            style={{ background: action.color }}
            onClick={action.onClick}
          >
            {action.icon}
            <p className="text-[14px] medium">{action.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WalletCard;
