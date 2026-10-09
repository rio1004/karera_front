 
import Modal from "@/components/Gamesites/Modal";
import type { BetItem } from "@/store/types/game-site/dosLetraTypes";
import { useMainStore } from "@/store/game-site/useMainStore";
import { X } from "lucide-react";
import Barcode from "react-barcode";
const BarcodeComponent = Barcode as unknown as React.FC<any>;

const formatDateTime = () => {
  const date = new Date();
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return date.toLocaleString("en-US", options).replace(",", "");
};

const getTotalBetAmount = (data: BetItem[]) => {
  return data.reduce((total, item) => {
    return total + item.betAmount * item.qty;
  }, 0);
};
const DataBetItems = (data: BetItem[]) =>
  data.map((item: BetItem, index: number) => (
    <div
      key={index}
      className="flex justify-between px-2 mt-1 text-[8pt] font-mono"
    >
      <p>
        {item.ball} * QTY({item.qty})
      </p>
      <p>
        &#8369;{item.betAmount} * {item.qty}
      </p>
    </div>
  ));

const ReceiptLayout = () => {
  const {
    showPrintReceipt,
    betList,
    setShowPrintReceipt,
    setShowPayment,
    ticketData,
    setBall,
    setBetList,
    setBetType,
    setBetAmount,
    paymentAmount,
    setPaymentAmount,
    changeAmount,
    setShowConfirmModal,
    setRounds,
  } = useMainStore();
  const handleClose = () => {
    setShowPrintReceipt(false);
    setShowPayment(false);
    setBall("");
    setBetList([]);
    setBetType("single");
    setBetAmount(0);
    setShowConfirmModal(false);
    setPaymentAmount(0);
    setRounds(0);
  };
  return (
    <Modal isOpen={showPrintReceipt}>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center bg-gradient-to-r from-[#FFFBD6] via-[#FFFCDF] to-white rounded-lg w-full h-full">
        <div
          className="!absolute top-2 right-2 text-black"
          onClick={handleClose}
        >
          <X />
        </div>
        <div className="bg-white shadow-md rounded-lg min-h-[450px] w-[80mm]">
          <div className="flex flex-col p-2">
            <div className="mt-10 text-center text-[12pt] font-mono">
              Karera.Live
            </div>
            <div className="text-center mt-1 text-[9pt] font-mono">
              {ticketData?.siteName}
              <br />
            </div>
            <div className="text-center mt-1 text-[12pt] font-mono">
              BETTING RECEIPT
            </div>
            <div className="text-center mt-1 text-[8pt] font-mono">
              Rep ID: User19988343
            </div>

            <div className="text-center font-bold text-[10pt] font-mono mt-3 mb-1">
              ------------ Single BET ------------
            </div>

            <div className="flex justify-between px-2 text-[8pt] font-mono">
              <p>Bet Transaction No.</p>
              <p>{ticketData?.ticketNumber}</p>
            </div>
            <div className="flex justify-between px-2 text-[8pt] font-mono">
              <p>Transaction Date</p>
              <p>{formatDateTime()}</p>
            </div>
            <div className="flex justify-between px-2 text-[8pt] font-mono">
              <p>Game Name</p>
              <p>DOS LETRA KARERA</p>
            </div>
            <div className="flex justify-between px-2 text-[8pt] font-mono">
              <p>Total No. of Bets</p>
              <p>{betList.length}</p>
            </div>

            <div className="text-center font-mono text-xs mt-1">
              ----------------------------------------
            </div>

            {DataBetItems(betList)}

            <div className="text-center font-mono text-xs mt-1">
              ----------------------------------------
            </div>

            <div className="flex justify-between px-2 mt-1 text-[8pt] font-mono">
              <p>Total Bet Amount</p>
              <p>&#8369;{getTotalBetAmount(betList)}</p>
            </div>
            <div className="flex justify-between px-2 text-[8pt] font-mono">
              <p>Payment Amount</p>
              <p>&#8369;{paymentAmount}</p>
            </div>
            <div className="flex justify-between px-2 text-[8pt] font-mono">
              <p>Change</p>
              <p>&#8369;{changeAmount()}</p>
            </div>

            <div className="text-center font-mono text-xs mt-1">
              ----------------------------------------
            </div>

            <div className="flex flex-col justify-center items-center mt-1 mb-5 px-2">
              <div className="w-full flex justify-center">
                <BarcodeComponent
                  value={ticketData?.ticketNumber}
                  width={2}
                  height={50}
                />
              </div>
              <div className="text-[8pt] font-mono mt-1">
                Ticket No. {ticketData?.ticketNumber}
              </div>
              <p className="text-center text-[8pt] font-mono">
                Please show this receipt to the cashier
                <br /> when you claim your winnings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ReceiptLayout;
