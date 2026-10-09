import { useDosLetraStore } from "@/store/player/useDosLetraStore";
import type { ModalType } from "./useModalState";

export const useModalHandlers = ({
  openModal,
  closeModal,
}: {
  openModal: (type: ModalType) => void;
  closeModal: (type: ModalType) => void;
}) => {
  const { topWinners, winnings } = useDosLetraStore();
  const handleWinnerClose = () => {
    if (topWinners.length <= 0) return;
    closeModal("winner");
    if (winnings) {
      openModal("winnings");
    } else {
      openModal("topThree");
    }
  };

  const handleWinningsClose = () => {
    closeModal("winnings");
    openModal("topThree");
  };

  const handleTopThreeClose = () => {
    closeModal("topThree");
    openModal("newGame");
  };

  const handleNewGameClose = () => closeModal("newGame");

  return {
    handleWinnerClose,
    handleWinningsClose,
    handleTopThreeClose,
    handleNewGameClose,
  };
};
