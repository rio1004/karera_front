import { useState } from "react";

export type ModalType = "gift" | "winner" | "winnings" | "newGame" | "topThree";

export const useModalState = () => {
  const [modalState, setModalState] = useState<Record<ModalType, boolean>>({
    gift: false,
    winner: false,
    winnings: false,
    newGame: false,
    topThree: false,
  });

  const openModal = (modalType: ModalType) => {
    setModalState((prev) => ({ ...prev, [modalType]: true }));
  };

  const closeModal = (modalType: ModalType) => {
    setModalState((prev) => ({ ...prev, [modalType]: false }));
  };

  return {
    modalState,
    openModal,
    closeModal,
  };
};
