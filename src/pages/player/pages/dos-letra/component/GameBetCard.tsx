import { useDosLetraStore } from "@/store/player/useDosLetraStore";
import { formatNumberToK } from "@/utils/utils.helper";
import clsx from "clsx";

type Props = {
  bgColor: string;
  imgPath: string;
  amount: number;
  multiplier: number;
  total: number;
  openModal: (type: string) => void;
  betType: string;
  picked: boolean;
};

const GameBetCard: React.FC<Props> = ({
  bgColor,
  imgPath,
  amount,
  multiplier,
  total,
  openModal,
  betType,
  picked,
}) => {
  const { betState } = useDosLetraStore();

  const isDisabled = [
    "Rolling",
    "Closed",
    "WinnerDeclared",
    "NewGame",
  ].includes(betState);
  const handleOpenModal = () => {
    if (isDisabled || amount > 0) return;
    openModal(betType);
  };

  return (
    <div
      onClick={handleOpenModal}
      className="relative flex flex-col items-center rounded-[25px] text-white w-[139px] h-[187px] cursor-pointer"
      id={`bet-card-${betType}`}
      style={{
        background: bgColor,
        filter: picked
          ? `${
              isDisabled ? "grayscale(80%)" : ""
            } drop-shadow(0px 2px 12px green)`
          : `${isDisabled ? "grayscale(80%)" : ""}`,
      }}
    >
      <div className="flex items-center justify-center gap-1 mt-[11px]">
        <img
          src="/DosLetra/coin.png"
          alt=""
          className="h-[9px] object-contain"
        />
        <span className="font-bold text-base">{formatNumberToK(total)}</span>
      </div>

      <div>
        <img src={imgPath} alt="" className="h-[90px] object-contain" />
      </div>

      <p className="font-bold text-base text-warning">x{multiplier}</p>

      <div className="absolute bottom-1 left-1 right-1 bg-white rounded-b-[23px] text-center">
        <p
          className={clsx(
            "text-lg font-semibold",
            amount > 0 ? "text-[#1a1a1a]" : "text-[#D9D9D9]"
          )}
        >
          P{amount}
        </p>
      </div>
    </div>
  );
};

export default GameBetCard;
