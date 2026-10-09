import { UI_COLORS } from "@/constant/colors";

const GiftItem = ({
  icon,
  label,
  amount,
  picked,
  onSend,
  multiplier,
  onMultiply,
  onPick,
}: {
  icon: string;
  label: string;
  amount: number;
  picked: boolean;
  onSend: (amount: number, icon: string) => void;
  multiplier: number;
  onMultiply: () => void;
  onPick: () => void;
}) => {
  return (
    <div
      className={`relative flex flex-col items-center justify-center text-white font-semibold cursor-pointer transition-all ${
        picked ? "bg-[#FFE40080] rounded-[10px]" : ""
      }`}
      onClick={onPick}
    >
      <div onClick={picked ? onMultiply : undefined}>
        {picked && <p className="absolute top-1 right-1">{multiplier}x</p>}
        <img src={icon} alt={label} className="w-14 h-14" />
        {!picked && <p className="text-sm text-center">{label}</p>}
        <p className="font-semibold text-center">₱ {amount * multiplier}</p>
      </div>

      {picked && (
        <div
          style={{ background: UI_COLORS.LINEAR.yellow }}
          className="w-full flex justify-center rounded-b-[10px] items-center py-1"
          onClick={() => onSend(amount * multiplier, icon)}
        >
          SEND
        </div>
      )}
    </div>
  );
};

export default GiftItem;
