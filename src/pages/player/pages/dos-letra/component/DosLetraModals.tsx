import Modal from "@/components/Modal";
import { useDosLetraStore } from "@/store/player/useDosLetraStore";
import { formatToPeso } from "@/utils/utils.helper";

type Props = {
  winnerState: boolean;
  handleWinnerClose: () => void;
  newGameState: boolean;
  handleNewGameClose: () => void;
  winningState: boolean;
  handleWinningClose: () => void;
  winningAmount: number;
  giftState: boolean;
  giftText: string;
  handleCloseGift: () => void;
};

const DosLetraModals = ({
  winnerState,
  handleWinnerClose,
  newGameState,
  winningState,
  handleWinningClose,
  giftState,
  giftText,
  handleCloseGift,
}: Props) => {
  const { declaredWinner, winnings, topWinners } = useDosLetraStore();
  return (
    <>
      <Modal
        type="custom"
        isOpen={winnerState}
        hasContentBg={false}
        modalAction={handleWinnerClose}
      >
        <div className="flex flex-col">
          <img
            src="/DosLetra/winner.png"
            alt="Winner"
            className="h-[170px] object-contain"
          />
          {declaredWinner === "A" ? (
            <img
              src="/DosLetra/winnerA.png"
              alt="Winner animation"
              className="h-[196px] object-contain mt-[-24px]"
            />
          ) : (
            <img
              src="/DosLetra/winnerB.png"
              alt="Winner animation"
              className="h-[196px] object-contain mt-[-24px]"
            />
          )}
        </div>
      </Modal>
      <Modal type="custom" isOpen={newGameState} hasContentBg={false}>
        <div>
          <img
            src="/DosLetra/new_game.png"
            alt="New game"
            className="w-[100vw]"
          />
        </div>
      </Modal>
      <Modal
        isOpen={winningState}
        type="custom"
        hasContentBg={false}
        modalAction={handleWinningClose}
      >
        <div className="flex flex-col items-center justify-center text-white text-center">
          <img
            src="/DosLetra/congrats.png"
            alt="Congratulations"
            className="h-[73px] object-contain"
          />
          <p className="text-[36px] font-baloo mt-[-12px] leading-[1.2]">
            You have won
          </p>
          <p className="text-[#FFE400] text-[48px] font-bold leading-[1.2]">
            {formatToPeso(winnings)}
          </p>
          <p className="text-[12px]">
            The amount has been credited to your wallet.
          </p>
        </div>
      </Modal>
      <Modal
        isOpen={giftState}
        type="bare"
        headerImage="/DosLetra/gift box.png"
        btnText="YES!"
        textContent={giftText}
        hasClose={true}
        closeModal={handleCloseGift}
      />
    </>
  );
};

export default DosLetraModals;
