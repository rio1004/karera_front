import InputField from "@/components/Gamesites/InputField";
import Modal from "@/components/Gamesites/Modal";
import Text from "@/components/Gamesites/Text";
import { UI_COLORS } from "@/constant/colors";
import { useMainStore } from "@/store/game-site/useMainStore";
import clsx from "clsx";
import { useState } from "react";
import ReceiptLayout from "./ReceiptLayout";
import CustomButton from "@/components/Gamesites/button";
import { useTicket } from "@/hooks/gamesite/useTicket";

const quickAmounts = [20, 50, 200, 500];

const Payment = () => {
  const {
    paymentAmount,
    setPaymentAmount,
    showConfirmModal,
    setShowConfirmModal,
    changeAmount,
  } = useMainStore();
  const { hanldeCreateTicket } = useTicket();
  const [error, setError] = useState<string>("");

  const handleQuickAmountClick = (amount: number) => {
    setPaymentAmount(amount);
    setError("");
  };
  const openReceipt = () => {
    hanldeCreateTicket({
      gameId: "ecdcafd2-8590-48b1-b809-f1cd481d0827",
      sessionId: "07b3f5f6-2607-4ea0-914f-15b334104bb8",
    });
  };
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const numericValue = Number(inputValue.replace(/[₱\s,]/g, ""));

    setPaymentAmount(numericValue);

    // if (numericValue < minBet) {
    //   setError(`Minimum bet amount is ${minBet}`);
    // } else if (numericValue > maxBet) {
    //   setError(`Maximum bet amount is ${maxBet}`);
    // } else {
    //   setError("");
    // }
  };

  return (
    <div className="h-[25vh] flex flex-col justify-center w-[45vw] py-3 px-5 rounded-[15px] max-h-[538px] max-w-[607px] border-2 drop-shadow-md bg-white">
      <ReceiptLayout />
      <Modal isOpen={showConfirmModal}>
        <div className="flex flex-col items-center justify-center">
          <Text
            text="Are you sure you want
to place this bet?"
            type="h5"
            color="#1A1A1A"
            weight="medium"
          />
          <div className="flex items-center justify-center w-full gap-5">
            <CustomButton
              bgColor={UI_COLORS.PLAIN.btnRed}
              submit={() => setShowConfirmModal(false)}
              text="Not now"
              type="box"
            />
            <CustomButton
              bgColor={UI_COLORS.PLAIN.btnGreen}
              submit={openReceipt}
              text="Yes"
              type="box"
            />
          </div>
        </div>
      </Modal>

      <div className="flex justify-between items-center">
        <Text
          text="Payment Amount:"
          type="h8"
          color="#5B5B5B"
          weight="medium"
        />
      </div>
      <div className="grid grid-cols-4 gap-2 mb-2 ">
        {quickAmounts.map((amount) => (
          <button
            key={amount}
            onClick={() => handleQuickAmountClick(amount)}
            className={clsx(
              "text-white font-semibold text-[24px] py-1 rounded-lg",
              paymentAmount === amount
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
        value={paymentAmount > 0 ? `₱${paymentAmount.toLocaleString()}` : ""}
        errorMsg={error}
      />
      <div className="flex justify-between">
        <Text
          text="Change Amount: "
          type="p1"
          color="#5B5B5B"
          weight="medium"
        />
        <Text
          text={paymentAmount ? `₱${changeAmount()}` : "0"}
          type="p1"
          color="#00A24A"
          weight="medium"
        />
      </div>
    </div>
  );
};

export default Payment;
