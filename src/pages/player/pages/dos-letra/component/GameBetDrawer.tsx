import { useState, useEffect } from "react";
import GameBetCard from "./GameBetCard";
import GameBetModal from "./GameBetModal";
import Popup from "@/components/Popup";
import { useDosLetraStore } from "@/store/player/useDosLetraStore";
import { LETRA } from "@/constant/dos-letra";

type Props = {
  onClose: () => void;
};

const GameBetDrawer = ({ onClose }: Props) => {
  const { betAmountA, betAmountB, OddA, OddB, netA, netB } = useDosLetraStore();

  const [isOpenBetModal, setIsOpenBetModal] = useState(false);
  const [titleImage, setTitleImage] = useState("");
  const [title, setTitle] = useState("");
  const [bgColor, setBgColor] = useState("");
  const [isInsufficient, setIsInsufficient] = useState(false);
  const [localBetType, setLocalBetType] = useState("");

  const openModal = (type: string) => {
    const letra = type === "A" ? LETRA.LETRA_A : LETRA.LETRA_B;
    setLocalBetType(type);
    setBgColor(letra.bg);
    setTitle(letra.title);
    setTitleImage(letra.imgIcon);
    setIsOpenBetModal(true);
  };

  const closeModal = () => {
    setIsOpenBetModal(false);
  };

  useEffect(() => {
    if (isInsufficient) {
      const timer = setTimeout(() => setIsInsufficient(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isInsufficient]);

  return (
    <>
      {isInsufficient && (
        <Popup
          isOpen={isInsufficient}
          onClose={() => setIsInsufficient(false)}
          text="Insufficient Balance."
          icon="/DosLetra/error_icon.png"
          type="error"
        />
      )}

      <GameBetModal
        onClose={closeModal}
        open={isOpenBetModal}
        titleImage={titleImage}
        title={title}
        bgColor={bgColor}
        betType={localBetType}
      />

      <div
        className="absolute bottom-[66px] left-0 w-full h-[312px] px-3 py-5 rounded-t-[25px] z-10"
        style={{
          background: "linear-gradient(to bottom, #FFFBD6, #FFFCDF, #FFFFFF)",
        }}
        data-e2e="bet-game-drawer"
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <img
              src="/DosLetra/ManyCoins.png"
              alt=""
              className="h-[48px] object-contain"
            />
            <p className="text-[#00A24A] text-[20px] font-bold">
              Bet Big, Win Bigger!
            </p>
          </div>
          <div onClick={onClose} className="cursor-pointer flex items-center">
            <img
              src="/DosLetra/close_black.png"
              alt="Close"
              className="h-[25px] object-contain"
            />
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-4">
          <GameBetCard
            bgColor={LETRA.LETRA_A.bg}
            amount={betAmountA}
            imgPath={LETRA.LETRA_A.imgIcon}
            multiplier={parseFloat(OddA.toFixed(2))}
            total={netA}
            openModal={openModal}
            betType="A"
            picked={betAmountA > 0}
          />
          <GameBetCard
            bgColor={LETRA.LETRA_B.bg}
            amount={betAmountB}
            imgPath={LETRA.LETRA_B.imgIcon}
            multiplier={parseFloat(OddB.toFixed(2))}
            total={netB}
            openModal={openModal}
            betType="B"
            picked={betAmountB > 0}
          />
        </div>
      </div>
    </>
  );
};

export default GameBetDrawer;
