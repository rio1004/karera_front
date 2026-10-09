import React, { useState } from "react";
import { CustomButton } from "../../../../../components/Button";
import HostDrawer from "./hosts/HostRanking";
import { useDosLetraStore } from "@/store/player/useDosLetraStore";

const AVATAR_IMAGES = [
  "/DosLetra/avatar_blue_sm.png",
  "/DosLetra/avatar_green_sm.png",
  "/DosLetra/avatar_yellow_sm.png",
] as const;

const ANNOUNCEMENT_ICON = "/DosLetra/announcement.png";

const AvatarStack: React.FC<{ images: readonly string[] }> = ({ images }) => (
  <div className="relative flex items-center">
    {images.map((image, index) => (
      <div
        key={image}
        className="relative"
        style={{
          zIndex: images.length - index,
          marginRight: index < images.length - 1 ? "-15px" : "0",
        }}
      >
        <img
          src={image}
          alt={`Avatar ${index + 1}`}
          className="w-[21px] h-[21px] rounded-full"
        />
      </div>
    ))}
  </div>
);

export const Announcement: React.FC<{
  winnerName: string;
  amount: string;
  gameName: string;
}> = ({ winnerName, amount, gameName }) => {
  const [showHostDrawer, setShowHostDrawer] = useState(false);

  const handleHostImageClick = () => {
    setShowHostDrawer(true);
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 bg-[#1A1A1A80] px-3 py-2 rounded-[10px] h-[40px]">
        <img src={ANNOUNCEMENT_ICON} alt="Announcement" />
        <p className="text-white text-[10px]">
          {winnerName} has won <span className="text-[#FFE400]">{amount}</span>{" "}
          in {gameName}
        </p>
      </div>

      <div
        className="flex items-center gap-1 bg-[#1A1A1A80] w-[120px] h-[40px] rounded-full mt-2 pr-1 cursor-pointer hover:bg-[#1A1A1AAA] transition-colors duration-200"
        onClick={handleHostImageClick}
      >
        <img
          src="/DosLetra/host_image.jpg"
          alt="Host profile"
          className="w-[40px] h-[40px] object-cover rounded-full border-2 border-yellow-400 bg-white"
        />
        <div className="flex flex-col text-white text-sm leading-tight">
          <span>Bonita</span>
          <div className="flex items-center gap-1 text-xs">
            <img
              src="/Host/likes heart1.png"
              alt="Likes"
              className="h-[16px] object-contain"
            />
            <span>2.3k</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-white text-xs">
          <img
            src="/DosLetra/gold_crown.png"
            alt="Crown ranking"
            className="h-[16px] object-contain"
          />
          <span>1</span>
        </div>
      </div>

      <HostDrawer
        showDrawer={showHostDrawer}
        setShowDrawer={setShowHostDrawer}
      />
    </div>
  );
};

const HeaderInfo: React.FC<{
  winnerName?: string;
  amount?: string;
  gameName?: string;
  betState: string;
  betBtnBgColor: string;
}> = ({
  winnerName = "samgyup01",
  amount = "₱1,430",
  gameName = "Dos Letra",
  betState,
  betBtnBgColor,
}) => {
  const { setShowLeaderBoard } = useDosLetraStore();

  return (
    <div className="absolute top-[82px] w-full px-[10px] ">
      <div className="flex justify-between">
        <Announcement
          winnerName={winnerName}
          amount={amount}
          gameName={gameName}
        />
        <div className="flex items-center flex-col">
          <div className="flex items-center gap-1 bg-[#1A1A1A80] pl-[5px]  pl-1 rounded-[20px] h-[40px]">
            <div
              className="flex gap-1 items-center"
              onClick={() => setShowLeaderBoard(true)}
            >
              <AvatarStack images={AVATAR_IMAGES} />
              <p className="text-white text-[13px]">9.8k</p>
            </div>
            <CustomButton
              text={betState}
              bgColor={betBtnBgColor}
              submit={() => {}}
              fontSize="13px"
            />
          </div>
          <p className="text-white text-sm text-[12px]">
            Game ID:{" "}
            <span className="text-warning font-bold">250403DL0347</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeaderInfo;
