import Modal from "@/components/Modal";
import { useDosLetraStore } from "@/store/player/useDosLetraStore";

interface WinnerData {
  imagePath: string;
  name: string;
  amount: number;
}

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  winnersData?: WinnerData[];
};

const TopThree = ({ isOpen }: Props) => {
  const { topWinners } = useDosLetraStore();
  const winnersData = topWinners.slice(0, 3).map((winner, index) => ({
    name: `${winner.firstName} ${winner.lastName}`,
    amount: winner.winnings,
    imagePath: `top_${index + 1}_winner`,
  }));

  return (
    <Modal type="custom" isOpen={isOpen} hasContentBg={false}>
      <div className="flex flex-col items-center">
        <img
          src="/DosLetra/Top3Winner.png"
          alt="Top 3 Winners"
          className="w-screen"
        />

        {winnersData.map((winner, index) => (
          <div
            key={index}
            className="relative w-[370px] h-[70px] bg-no-repeat bg-center bg-contain"
            style={{
              backgroundImage: `url('/DosLetra/${winner.imagePath}.png')`,
            }}
          >
            <div className="absolute top-[12px] left-[131px] w-[200px] text-white text-left">
              <p className="text-[13px] truncate">{winner.name}</p>
            </div>

            <div className="absolute top-[26px] left-[126px] text-white">
              <p className="text-[22px] font-bold">
                ₱ {winner.amount.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default TopThree;
