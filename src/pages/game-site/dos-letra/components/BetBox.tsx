import Text from "@/components/Gamesites/Text";
import { UI_COLORS } from "@/constant/colors";
import   { useEffect, useState } from "react";
import BetCard from "./BetCard";
import clsx from "clsx";
import InputField from "@/components/Gamesites/InputField";
import Radio from "@/components/Gamesites/Radio";
import { useMainStore } from "@/store/game-site/useMainStore";
import type { BetType } from "@/store/types/game-site/dosLetraTypes";
import CustomButton from "@/components/Gamesites/button";

const quickAmounts = [5, 20, 50, 100, 200, 500, 1000, 5000, 10000];
const minBet = 5;
const maxBet = 10000;

const BetBox = () => {
  const {
    betAmount,
    setBetAmount,
    ball,
    setBall,
    betType,
    setBetType,
    rounds,
    setRounds,
    addBetList,
    isDisabled,
    setIsDisabled,
    betList,
    setBetList,
    setShowPayment,
    showPayment,
    setShowConfirmModal,
    changeAmount,
  } = useMainStore();
  const [error, setError] = useState<string>("");

  const handleQuickAmountClick = (amount: number) => {
    setBetAmount(amount);
    setError("");
  };

  const placeBet = () => {
    addBetList({
      id: `${Date.now()}-${Math.floor(Math.random() * 10000)}`, // 👈 Unique ID
      gameId: 6723,
      ball: ball,
      type: betType,
      qty: betType === "single" ? 1 : rounds,
      betAmount: betAmount * rounds,
    });
  };

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

  useEffect(() => {
    const isFormValid =
      betType !== "" &&
      ball !== "" &&
      betAmount >= minBet &&
      betAmount <= maxBet;

    setIsDisabled(!isFormValid);
  }, [betType, ball, betAmount]);

  return (
    <div>
      <div className="bg-[#0E9F68] max-h-[729px] max-w-[657px] flex items-center justify-center h-[75vh] w-[40vw] rounded-[15px]">
        <div className="bg-white max-h-[669px] max-w-[607px] h-[70vh] w-[36vw] rounded-[15px]  p-5">
          <div className="flex justify-center gap-5">
            <BetCard
              amount="₱10,000"
              bg={UI_COLORS.LINEAR.red}
              icon="/dosLetraAssets/A.png"
              multiplier="x1.85"
              submit={() => setBall("Letra A")}
              active={ball === "Letra A"}
            />
            <BetCard
              amount="₱10,000"
              bg={UI_COLORS.LINEAR.blue}
              icon="/dosLetraAssets/B.png"
              multiplier="x1.85"
              submit={() => setBall("Letra B")}
              active={ball === "Letra B"}
            />
          </div>
          <Text
            text="Bet Amount: "
            color="#D9D9D9"
            align="start"
            type="h7"
            style={{
              margin: "5px 0",
            }}
          />
          <div className="grid grid-cols-3 gap-2 mb-4">
            {quickAmounts.map((amount) => (
              <button
                key={amount}
                onClick={() => handleQuickAmountClick(amount)}
                className={clsx(
                  " text-white font-semibold text-[24px] py-1 rounded-lg",
                  betAmount === amount
                    ? "bg-green-600"
                    : "bg-gray-300 text-black hover:bg-gray-200"
                )}
              >
                ₱{amount.toLocaleString()}
              </button>
            ))}
          </div>
          <InputField
            type="text"
            onChange={(e) => handleAmountChange(e)}
            value={betAmount > 0 ? `₱${betAmount.toLocaleString()}` : ""}
            errorMsg={error}
          />
          <div className="flex gap-4 mt-2">
            <Text text="Type of Bet:" type="p1" color="#D9D9D9" />
            <Radio
              name="betType"
              text="Single"
              onChange={(e) => setBetType(e.target.value as BetType)}
              value={"single"}
              checked={betType === "single"}
            />
            <Radio
              name="betType"
              text="Advance"
              value={"advance"}
              checked={betType === "advance"}
              onChange={(e) => setBetType(e.target.value as BetType)}
            />
          </div>
          {betType === "advance" && (
            <div className="flex items-center gap-5 mt-3">
              <Text text="Rounds:" type="p1" color="#D9D9D9" />
              <InputField
                type="text"
                value={rounds}
                style={{
                  width: "80px",
                  height: "35px",
                  border: "2px solid #0E9F68",
                  color: "#0E9F68",
                }}
                onChange={(e) => setRounds(Number(e.target.value))}
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-3">
        <CustomButton
          bgColor={UI_COLORS.PLAIN.btnRed}
          submit={() => setBetList([])}
          text="CANCEL"
          type="box"
          disabled={isDisabled}
        />
        {betList.length < 1 && (
          <CustomButton
            bgColor={UI_COLORS.PLAIN.btnBlue}
            submit={placeBet}
            text="ADD TO BET LIST"
            type="box"
            disabled={isDisabled}
          />
        )}
        {betList.length >= 1 && !showPayment && (
          <CustomButton
            bgColor={"#FFC600"}
            submit={() => setShowPayment(true)}
            text="PAY BET AMOUNT"
            type="box"
            disabled={isDisabled}
          />
        )}
        {showPayment && betList.length >= 1 &&(
          <CustomButton
            bgColor={"#0E9F68"}
            submit={() => setShowConfirmModal(true)}
            text="CONFIRM BET"
            type="box"
            disabled={changeAmount() < 0}
          />
        )}
      </div>
    </div>
  );
};

export default BetBox;
