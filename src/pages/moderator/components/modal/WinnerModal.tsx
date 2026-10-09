import { useState } from "react";
import Modal from "../../../../components/Modal";
import { CustomButton } from "../../../../components/Button";
import { Channel, GameState } from "../../../../types/enum";
import { type GameStatus } from "@/store/moderator/useHostStore";
import { useWebSocketStore } from "@/store/websocket/useWebsocket";
import { IMAGES } from "@/constant/image";
import { UI_COLORS } from "@/constant/colors";

type WinnerModalProps = {
  isOpen: boolean;
  winner: string | null;
  onClose?: () => void;
  onSendPayout?: () => void;
  onStatusChange?: (newStatus: GameStatus) => void;
  onClearWinner?: () => void;
};

const WinnerModal = ({
  isOpen,
  winner,
  onClose,
  onSendPayout,
  onClearWinner,
}: WinnerModalProps) => {
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  // const location = useLocation();
  // const gameId = location.state?.gameId;

  const sendMessage = useWebSocketStore((state) => state.sendMessage);

  if (!winner) return null;

  const handleWinnerClick = () => {
    setShowPayoutModal(true);
  };

  const handleSendPayout = () => {
    setShowPayoutModal(false);
    setShowSuccessMessage(true);
    onSendPayout?.();
    console.warn("send payout");
    sendMessage({
      channel: Channel.Game,
      state: GameState.SendPayout,
      data: {},
    });

    setTimeout(() => {
      onClearWinner?.();
    }, 100);

    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const handleCancelPayout = () => {
    setShowPayoutModal(false);
  };

  return (
    <>
      {/* Winner Modal */}
      <Modal
        isOpen={isOpen && !showPayoutModal && !showSuccessMessage}
        type="custom"
        closeModal={onClose}
        hasContentBg={false}
        hasParentBg={true}
        modalAction={handleWinnerClick}
        contentStyle="p-0 flex items-center justify-center min-w-[400px] min-h-[400px] bg-transparent"
        parentStyle="bg-none shadow-none rounded-[25px]"
      >
        <div
          className="bg-red-600 border-[10px] border-yellow-400 rounded-lg p-8 flex flex-col items-center justify-center min-w-[300px] min-h-[300px] shadow-2xl cursor-pointer transition-transform duration-200 hover:scale-105"
          onClick={handleWinnerClick}
        >
          <div className="text-white text-center">
            <h1 className="text-[8rem] font-extrabold leading-none mb-2">
              {winner}
            </h1>
            <h2 className="text-3xl font-bold">WINS</h2>
          </div>
        </div>
      </Modal>

      {/* Confirm Payout Modal */}
      <Modal
        isOpen={showPayoutModal}
        type="bare"
        hasParentBg={true}
        hasContentBg={true}
        headerImage={IMAGES.coinIcon.src}
        multipleBtn={true}
        closeModal={handleCancelPayout}
        hasClose={false}
        textContent="Send Payout?"
      >
        <div className="flex gap-3 justify-center w-full">
          <CustomButton
            bgColor={UI_COLORS.LINEAR.green || "#10b981"}
            text="Send"
            submit={handleSendPayout}
            width="120px"
            // Add id for playwright test
            id="send-payout-button"
          />
          <CustomButton
            bgColor="#6b7280"
            text="Cancel"
            submit={handleCancelPayout}
            width="120px"
          />
        </div>
      </Modal>

      {/* Success Message Modal */}
      <Modal
        isOpen={showSuccessMessage}
        type="custom"
        hasContentBg={true}
        hasParentBg={true}
        parentStyle="rounded-xl max-w-[300px]"
        contentStyle="p-4 px-6"
      >
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
            ✓
          </div>
          <p className="text-sm text-gray-700 font-medium">
            The payout has been sent!
          </p>
        </div>
      </Modal>
    </>
  );
};

export default WinnerModal;
