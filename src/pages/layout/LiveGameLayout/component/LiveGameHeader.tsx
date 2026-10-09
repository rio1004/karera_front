import { useWallet } from "@/hooks/player/useWallet";
import { useWalletStore } from "@/store/player/useWalletStore";
import { formatToPeso } from "@/utils/utils.helper";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HEADER_HEIGHT = "66px";

const LOGO_IMAGES = [
  {
    src: "/DosLetra/KareraLiveGame.png",
    alt: "Karera Live Game",
    className: "h-[21px] object-contain",
  },
  {
    src: "/DosLetra/DosLetraGame.png",
    alt: "Dos Letra Game",
    className: "h-[20px] object-contain",
  },
  {
    src: "/DosLetra/PagcorGame.png",
    alt: "Pagcor Game",
    className: "h-[24px] object-contain",
  },
] as const;

interface LiveGameHeaderProps {
  balance?: string;
  onBalanceClick?: () => void;
}

const LiveGameHeader: React.FC<LiveGameHeaderProps> = ({ onBalanceClick }) => {
  const { walletBalance } = useWalletStore();
  const { getWalletBalance } = useWallet();

  const navigate = useNavigate();

  useEffect(() => {
    getWalletBalance();
  }, []);

  return (
    <div
      className="flex justify-between items-center px-4 shadow-md"
      style={{
        height: HEADER_HEIGHT,
        background: "linear-gradient(180deg, #00C0FA 0%, #015EEA 100%)",
      }}
    >
      <div className="flex gap-2">
        {LOGO_IMAGES.map((logo, index) => (
          <img
            key={`${logo.alt}-${index}`}
            src={logo.src}
            alt={logo.alt}
            className={logo.className}
            onClick={() => navigate("/player")}
          />
        ))}
      </div>

      <div
        className="flex items-center gap-2"
        onClick={() => navigate("/player/wallet")}
      >
        <span className="text-white font-baloo text-base">
          {formatToPeso(walletBalance)}
        </span>
        <img
          src="/DosLetra/plus.png"
          alt="Add balance"
          className="h-[16px] object-contain cursor-pointer"
          onClick={onBalanceClick}
        />
      </div>
    </div>
  );
};

export default LiveGameHeader;
