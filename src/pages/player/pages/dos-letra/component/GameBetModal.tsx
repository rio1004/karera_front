import React, { useEffect, useState } from "react";
import clsx from "clsx";

import { useDosLetraStore } from "@/store/player/useDosLetraStore";
import { useWallet } from "@/hooks/player/useWallet";
import { useWebSocketStore } from "@/store/websocket/useWebsocket";
import { useWalletStore } from "@/store/player/useWalletStore";
import { Button } from "@/components/ui/button";
import { popup } from "@/components/PopupManager";

interface GameBetModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  maxBet?: number;
  minBet?: number;
  titleImage: string;
  bgColor: string;
  betType: "A" | "B" | string;
}

const GameBetModal: React.FC<GameBetModalProps> = ({
  open,
  onClose,
  title = "LETRA A",
  maxBet = 10000,
  minBet = 5,
  titleImage,
  bgColor,
  betType,
}) => {
  const { isAuthenticated, sendMessage } = useWebSocketStore();
  const {
    betAmountA,
    setBetAmountA,
    betAmountB,
    setBetAmountB,
    setBetType,
    betState,
  } = useDosLetraStore();
  const { getWalletBalance } = useWallet();
  const { walletBalance } = useWalletStore();

  const [error, setError] = useState("");

  const quickAmounts = [5, 20, 50, 100, 200, 500, 1000, 5000, 10000];

  const betAmount = betType === "A" ? betAmountA : betAmountB;
  const setBetAmount = betType === "A" ? setBetAmountA : setBetAmountB;

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const numericValue = Number(inputValue.replace(/[₱\s,]/g, ""));
    setBetAmount(numericValue);

    if (numericValue < minBet) {
      setError(`Minimum bet amount is ${minBet}`);
    } else if (numericValue > maxBet) {
      setError(`Maximum bet amount is ${maxBet}`);
    } else {
      setError("");
    }
  };

  const handleQuickAmountClick = (amount: number) => {
    setBetAmount(amount);
    setError("");
  };
  useEffect(() => {
    if (betAmount > walletBalance) {
      setError("Insufficient Balance.");
      return;
    }
  }, [betAmount]);
  useEffect(() => {
    if (betState === "Rolling" || betState === "Closed") {
      onClose();
      return;
    }
  }, [betState]);

  const handleSubmit = () => {
    if (betAmount > walletBalance) {
      setError("Insufficient Balance.");
      popup.error("Insufficient Balance.");
      return;
    }

    if (isAuthenticated) {
      sendMessage({
        channel: "Game",
        state: "Bet",
        data: {
          choice: betType,
          amount: betAmount,
        },
      });
      setBetType(betType);
      getWalletBalance();
    }

    onClose();
    setError("");
  };

  const handleReset = () => {
    if (betAmount <= 0) return;
    setBetAmount(0);
    setError("");
  };

  const handleClose = () => {
    setError("");
    setBetAmountB(0);
    setBetAmountA(0);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A1A1ABF]">
      <div className="bg-white rounded-3xl shadow-lg w-full max-w-xs overflow-hidden">
        <div
          className="flex items-center justify-between p-2"
          style={{ background: bgColor }}
        >
          <div className="flex items-center gap-2">
            <img src={titleImage} alt="" className="h-[70px] object-contain" />
            <h2 className="text-white text-[28px] font-bold">{title}</h2>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center"
          >
            <img
              src="/DosLetra/close_icon.png"
              alt="close"
              className="h-5 object-contain"
            />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Quick Amount Buttons */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {quickAmounts.map((amount) => (
              <button
                key={amount}
                onClick={() => handleQuickAmountClick(amount)}
                className={clsx(
                  "py-2 text-white font-semibold text-lg rounded-lg",
                  betAmount === amount
                    ? "bg-green-600"
                    : "bg-gray-300 text-black hover:bg-gray-200"
                )}
              >
                {amount.toLocaleString()}
              </button>
            ))}
          </div>

          {/* Manual Input */}
          <div className="mb-4">
            <input
              type="text"
              value={betAmount ? `₱ ${betAmount.toLocaleString()}` : ""}
              onChange={handleAmountChange}
              className={clsx(
                "w-full h-14 text-center text-2xl font-medium border-2 rounded-lg outline-none",
                error
                  ? "border-red-500"
                  : "border-gray-300 focus:border-blue-500"
              )}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 justify-center">
            <Button
              variant={"red"}
              className={`w-[110px] ${betAmount <= 0 ? "opacity-60" : ""} `}
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              variant={"green"}
              className={`w-[150px] ${betAmount <= 0 ? "opacity-60" : ""} `}
              onClick={handleSubmit}
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameBetModal;
