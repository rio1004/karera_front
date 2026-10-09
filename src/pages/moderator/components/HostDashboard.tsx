import { useEffect, useState } from "react";
import { ModInfoBox } from "./ModInfoBox";
import { Channel, GameState } from "../../../types/enum";
import DrawerActionButton from "./drawer/DrawerActionButton";
import Drawer from "./drawer/Drawer";
import AuthDrawerModal from "./modal/AuthModal";
import BettingModal from "./modal/BettingModal";
import WinnerModal from "./modal/WinnerModal";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import HostModal from "./modal/SelectHostModal";
import { useWebSocketStore } from "../../../store/websocket/useWebsocket";
import { useHostStore } from "@/store/moderator/useHostStore";
import { useDrawerStore } from "@/store/moderator/useDrawerStore";
import { useAuthStore } from "@/store/auth/useAuth";
import { IMAGES } from "@/constant/image";
import { formatStatusText } from "@/utils/formatStatusText";
import { ConfirmWinnerLetter } from "./ConfirmWinnerLetter";
import { useRoomStore } from "@/store/host/useRoomStore";

const HostDashboard = () => {
  const {
    isOpen,
    gameRound,
    studioNo,
    hostName,
    toggleOpen,
    selectedLetter,
    status,
    toggleHostModal,
    startLetterConfirm,
    declaredWinner,
    clearWinner,
    setStatus,
    declareWinner,
    setStudioNo,
    setHostName,
  } = useHostStore();

  const location = useLocation();
  const { id: roomId } = useParams();

  const dynamicHostName = location.state?.hostName;
  const dynamicStudioNo = location.state?.studioNo;
  const gameId = location.state?.gameId || roomId;
  const dynamicRoomId = location.state?.roomId;

  const {
    openDrawer,
    setEndGameModal,
    setSignOutModal,
    isEndGameModalOpen,
    isSignOutModalOpen,
  } = useDrawerStore();

  const {
    isAuthenticated,
    messages,
    initializeWebSocket,
    sendMessage,
    isConnected,
  } = useWebSocketStore();

  const [, setShowCountdown] = useState(true);
  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingLetter, setPendingLetter] = useState<"A" | "B" | null>(null);
  const [showBettingModal, setShowBettingModal] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [hasTopWinners, setHasTopWinners] = useState(false);

  const { token, user } = useAuthStore();
  const { endRoom, currentRoomId, setCurrentRoomId } = useRoomStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (dynamicHostName) setHostName(dynamicHostName);
    if (dynamicStudioNo) setStudioNo(dynamicStudioNo);
  }, [dynamicHostName, dynamicStudioNo, setHostName, setStudioNo]);

  useEffect(() => {
    if (isAuthenticated) {
      sendMessage({
        channel: "Game",
        state: "Update",
        data: {},
      });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isConnected) {
      sendMessage({
        channel: "Game",
        state: "Authenticate",
        data: {
          token: token,
        },
      });
    }
  }, [isConnected, token]);

  useEffect(() => {
    if (isAuthenticated) {
      sendMessage({
        channel: "Game",
        state: "NewGame",
        data: { gameId: gameId },
      });
      setStatus("NEW_GAME");
      setShowCountdown(true);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    initializeWebSocket();
  }, []);

  useEffect(() => {
    if (!messages || messages.length === 0) return;
    const latest = messages[messages.length - 1];
    if (latest.channel === "Game") {
      switch (latest.state) {
        case "NewGame":
          setStatus("NEW_GAME");
          setShowCountdown(false);
          setHasTopWinners(false);
          break;
        case "Closing":
          setStatus("CLOSING");
          setCountdown(latest.data.countdown);
          break;
        case "Rolling":
          setStatus("ROLLING");
          setShowCountdown(false);
          setCountdown(0);
          break;
        case "Open":
          setStatus("OPEN");
          setCountdown(latest.data.countdown);
          break;
        case "LastCall":
          setStatus("LAST_CALL");
          setCountdown(latest.data.countdown);
          break;
        case "Closed":
          setStatus("CLOSED");
          setShowCountdown(false);
          setCountdown(0);
          break;
        case "WinnerDeclared":
          setStatus("DECLARED");
          setShowCountdown(false);
          setCountdown(0);
          if (latest.data?.topWinners !== undefined) {
            setHasTopWinners(true);
          }
          break;
      }
    }
  }, [messages]);

  const isActiveStatus = status === "DECLARED" && !declaredWinner;

  const showWinnerHighlight =
    declaredWinner &&
    (status === "SEND_PAYOUT" || status === "SEND_PAYOUT_SUCCESSFUL");

  const handleSendGameUpdate = () => {
    // handleGameSession();
    sendMessage({
      channel: Channel.Game,
      state: GameState.Open,
      data: {},
    });
  };

  const handleSendRollingUpdate = () => {
    sendMessage({
      channel: Channel.Game,
      state: GameState.Rolling,
      data: {},
    });
  };

  const handleSendDeclareUpdate = () => {
    setStatus("DECLARED");
  };

  const handleLetterClick = (letter: "A" | "B") => {
    if (isActiveStatus) {
      startLetterConfirm(letter);
      setPendingLetter(letter);
      setShowConfirmModal(true);
    }
  };

  const handleConfirmWinner = () => {
    if (pendingLetter) {
      setShowConfirmModal(false);
      setShowWinnerModal(true);
      sendMessage({
        channel: Channel.Game,
        state: GameState.WinnerDeclared,
        data: {
          choice: pendingLetter,
        },
      });
    }
  };

  const handleCancelConfirm = () => {
    setShowConfirmModal(false);
    setPendingLetter(null);
  };

  const handleWinnerModalClose = () => {
    setShowWinnerModal(false);
  };

  const handleSendPayout = () => {
    declareWinner();
    setShowWinnerModal(false);
  };
  const handleStatusChange = (newStatus: any) => {
    setStatus(newStatus);
  };

  const handleClearWinner = () => {
    clearWinner();
    setShowWinnerModal(false);
  };

  const handleBettingModalClose = () => {
    setShowBettingModal(false);
  };

  const handleBettingStart = () => {
    setShowBettingModal(false);
  };

  const handleNewGame = () => {
    setStatus("NEW_GAME");
    setShowCountdown(true);
    setHasTopWinners(false);
    sendMessage({
      channel: Channel.Game,
      state: GameState.NewGame,
      data: { gameId: gameId },
    });
  };

  const handleOpenClick = () => {
    setStatus("OPEN");
    handleSendGameUpdate();
    toggleOpen();
  };

  const handleUnavailableToOpen = () => {
    setStatus("OPEN");
    sendMessage({
      channel: Channel.Game,
      state: GameState.Update,
      data: {},
    });
  };

  useEffect(() => {
    const newRoomId = dynamicRoomId || roomId;
    if (newRoomId && newRoomId !== currentRoomId) {
      setCurrentRoomId(newRoomId);
    }
  }, [dynamicRoomId, roomId, currentRoomId, setCurrentRoomId]);

  const handleEndRoom = async () => {
    const roomIdToEnd = currentRoomId || hostName || roomId;

    if (!roomIdToEnd || !gameId || !user?.id || !status) {
      console.error("Missing required data for ending room:", {
        roomId: roomIdToEnd,
        gameId,
        userId: user?.id,
        status,
      });
      return;
    }

    try {
      await endRoom(roomIdToEnd, gameId, user.id, status);
      setEndGameModal(false);
      navigate("/moderator");
    } catch (error) {
      console.error("Failed to end room:", error);
    }
  };

  // const handleGameSession = async () => {
  //   try {
  //     const response = await gameSession(id ?? null);
  //     console.log("Game session created:", response);
  //   } catch (error) {
  //     console.error("Error creating game session:", error);
  //   }
  // };

  const isDisabledButton =
    status === "OPEN" || status === "LAST_CALL" || status === "CLOSING";

  return (
    <div
      className="min-h-screen relative"
      style={{
        background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
      }}
    >
      {/* HEADER */}
      <div className="flex justify-between items-center bg-gradient-to-r from-blue-500 to-blue-400 text-white px-6 py-3">
        <div className="flex items-center gap-3">
          <img
            src={IMAGES.csrLogo.src}
            alt={IMAGES.csrLogo.alt}
            className="w-10 h-10 rounded-full"
          />
          <span className="text-lg font-bold">Dos Letra Karera</span>
        </div>
        <div className="flex items-center gap-3">
          <div
            onClick={() =>
              openDrawer(
                <div className="flex items-center gap-3 flex-col">
                  <div className="space-y-4 flex gap-2 border-b border-gray-300 pb-2">
                    <img
                      src={IMAGES.csrGirl.src}
                      alt={IMAGES.csrGirl.alt}
                      className="w-12 h-12 object-cover"
                    />
                    <h1 className="font-md flex flex-col">
                      {user?.userName}
                      <span className="text-md text-gray-500 font-bold text-center">
                        UserId: {user?.id}
                      </span>
                    </h1>
                  </div>
                  <DrawerActionButton
                    icon={IMAGES.endGameIcon.src}
                    label="End Game Room"
                    onClick={handleEndRoom}
                  />
                  <DrawerActionButton
                    icon={IMAGES.signOutIcon.src}
                    label="Sign Out"
                    onClick={() => setSignOutModal(true)}
                  />
                </div>
              )
            }
            className="w-full flex rounded-full items-center gap-4 cursor-pointer"
          >
            <img
              src={IMAGES.csrGirl.src}
              alt={IMAGES.csrGirl.alt}
              className="w-12 h-12 object-cover"
            />
            <h1 className="font-md flex flex-col"> {user?.userName}</h1>
          </div>
        </div>
      </div>

      <Drawer />
      <HostModal />

      <AuthDrawerModal
        isSignOutOpen={isSignOutModalOpen}
        setIsSignOutOpen={setSignOutModal}
        isEndGameOpen={isEndGameModalOpen}
        setIsEndGameOpen={setEndGameModal}
      />

      <div className="p-6">
        <div className="grid grid-cols-5 grid-rows-5 gap-4 h-[600px]">
          <div className="col-span-2">
            <button
              onClick={
                status !== "UNAVAILABLE" ? handleSendGameUpdate : undefined
              }
              className={`w-full h-full font-bold text-2xl rounded-lg transition-colors duration-200
      ${
        status === "UNAVAILABLE"
          ? "bg-gray-400 text-white cursor-default"
          : status === "NEW_GAME"
          ? "bg-blue-500 hover:bg-blue-600 text-white"
          : status === "OPEN"
          ? "bg-[#00A24A] text-white"
          : formatStatusText(status) === "LAST CALL"
          ? "bg-[#FFE400] text-black"
          : status === "CLOSING" || status === "CLOSED"
          ? "bg-red-600 text-white"
          : status === "ROLLING"
          ? "bg-orange-500 text-white cursor-pointer"
          : status === "DECLARED"
          ? "bg-purple-600 text-white"
          : status === "SEND_PAYOUT" || status === "SEND_PAYOUT_SUCCESSFUL"
          ? "bg-blue-600 text-white"
          : "bg-blue-500 hover:bg-blue-600 text-white"
      }
    `}
            >
              {status === "UNAVAILABLE"
                ? "Unavailable"
                : status === "SEND_PAYOUT" ||
                  status === "SEND_PAYOUT_SUCCESSFUL"
                ? "WINNER DECLARED"
                : status === "NEW_GAME"
                ? "NEW GAME"
                : status}
            </button>
          </div>

          {/* COUNTDOWN TIMER */}
          {typeof countdown === "number" && (
            <div className="absolute left-1/2 transform -translate-x-1/2 top-[160px] z-10">
              <div
                id="moderator-countdown-timer"
                className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl font-extrabold text-white
        ${
          status === "UNAVAILABLE"
            ? "bg-black border-4 border-gray-500"
            : status === "OPEN" || status === "NEW_GAME"
            ? "bg-black border-4 border-green-500"
            : status === "LAST_CALL"
            ? "bg-black border-4 border-yellow-400"
            : status === "CLOSING" || status === "CLOSED"
            ? "bg-black border-4 border-red-600"
            : ""
        }
      `}
              >
                {countdown}
              </div>
            </div>
          )}

          {/* LETTER BOXES */}
          <>
            <div
              className={`col-span-2 row-span-4 col-start-1 row-start-2 flex items-center justify-center text-9xl font-bold rounded-lg transition-all duration-200
                ${
                  status === "UNAVAILABLE"
                    ? "bg-gray-200 text-gray-400 cursor-default"
                    : isActiveStatus
                    ? "bg-red-600 text-white cursor-pointer"
                    : showWinnerHighlight && declaredWinner === "A"
                    ? "bg-gray-300 text-gray-600 border-4 border-blue-500"
                    : "bg-gray-300 text-gray-400 cursor-default"
                }
                ${
                  selectedLetter === "A" && isActiveStatus
                    ? "border-b-4 border-yellow-400"
                    : ""
                }
              `}
              onClick={() => status !== "UNAVAILABLE" && handleLetterClick("A")}
              // Add id for playwright test
              id="first-choice"
            >
              <span className="drop-shadow-lg select-none">A</span>
            </div>
            <div
              className={`col-span-2 row-span-4 col-start-3 row-start-2 flex items-center justify-center text-9xl font-bold rounded-lg transition-all duration-200
                ${
                  status === "UNAVAILABLE"
                    ? "bg-gray-200 text-gray-400 cursor-default"
                    : isActiveStatus
                    ? "bg-blue-600 text-white cursor-pointer"
                    : showWinnerHighlight && declaredWinner === "B"
                    ? "bg-gray-300 text-gray-600 border-4 border-blue-500"
                    : "bg-gray-300 text-gray-400 cursor-default"
                }
                ${
                  selectedLetter === "B" && isActiveStatus
                    ? "border-b-4 border-yellow-400"
                    : ""
                }
              `}
              // Add id for playwright test
              id="second-choice"
              onClick={() => status !== "UNAVAILABLE" && handleLetterClick("B")}
            >
              <span className="drop-shadow-lg select-none">B</span>
            </div>
          </>

          {/* SELECT HOST */}
          <div className="row-span-2 col-start-5 row-start-2">
            <button
              onClick={toggleHostModal}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-lg text-xl transition-colors duration-200 w-full h-full"
            >
              SELECT
              <br />
              HOST
            </button>
          </div>

          {/* ACTION RIGHT SIDE BOTTOM BUTTONS */}
          <div className="row-span-2 col-start-5 row-start-4 flex flex-col gap-2">
            <button
              // Add id for playwright test
              id="game-action-button"
              onClick={() => {
                if (status !== "UNAVAILABLE" && isDisabledButton) return;

                if (status === "UNAVAILABLE") {
                  handleUnavailableToOpen();
                } else if (status === "SEND_PAYOUT") {
                  handleNewGame();
                } else if (status === "NEW_GAME") {
                  handleOpenClick();
                } else if (status === "CLOSED") {
                  handleSendRollingUpdate();
                } else if (status === "ROLLING") {
                  handleSendDeclareUpdate();
                } else {
                  toggleOpen();
                }
              }}
              disabled={
                (status !== "UNAVAILABLE" && isDisabledButton) ||
                (status === "DECLARED" && !hasTopWinners)
              }
              className={`rounded-lg font-bold text-lg transition-all duration-200 w-full flex-1
                ${
                  (status !== "UNAVAILABLE" && isDisabledButton) ||
                  (status === "DECLARED" && !hasTopWinners)
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : status === "UNAVAILABLE"
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : status === "SEND_PAYOUT_SUCCESSFUL" ||
                      status === "SEND_PAYOUT"
                    ? "bg-blue-500 text-white"
                    : status === "NEW_GAME"
                    ? "bg-green-500 text-white"
                    : status === "CLOSED"
                    ? "bg-orange-500 text-white"
                    : status === "DECLARED" && hasTopWinners
                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                    : isOpen
                    ? "bg-purple-500 text-white"
                    : status === "ROLLING"
                    ? "bg-purple-500 hover:bg-purple-600 text-white"
                    : "bg-gray-400 cursor-not-allowed text-white"
                }
              `}
            >
              {status === "UNAVAILABLE"
                ? "OPEN"
                : status === "SEND_PAYOUT_SUCCESSFUL" ||
                  status === "SEND_PAYOUT"
                ? "NEW GAME"
                : status === "NEW_GAME"
                ? "OPEN"
                : status === "ROLLING"
                ? "DECLARE"
                : status === "DECLARED" && hasTopWinners
                ? "NEW GAME"
                : status === "DECLARED"
                ? "DECLARED"
                : status === "CLOSING" || status === "CLOSED"
                ? "ROLLING"
                : isOpen
                ? "ROLLING"
                : "ROLLING"}
            </button>
          </div>

          {/* INFO BOXES */}
          <ModInfoBox boxLabel="GAME ROUND" value={gameRound} color="green" />
          <ModInfoBox boxLabel="STUDIO NO." value={studioNo} color="green" />
          <ModInfoBox boxLabel="LIVE HOST" value={hostName} color="yellow" />
        </div>
      </div>

      {/* Winner Modal */}
      <WinnerModal
        isOpen={showWinnerModal}
        winner={selectedLetter}
        onClose={handleWinnerModalClose}
        onSendPayout={handleSendPayout}
        onStatusChange={handleStatusChange}
        onClearWinner={handleClearWinner}
      />

      <ConfirmWinnerLetter
        isOpen={showConfirmModal}
        letter={pendingLetter}
        onConfirm={handleConfirmWinner}
        onCancel={handleCancelConfirm}
        closeModal={() => setShowConfirmModal(false)}
      />

      {/* Betting Modal FOR VOID GAMES */}
      <BettingModal
        isOpen={showBettingModal}
        onClose={handleBettingModalClose}
        onStart={handleBettingStart}
      />
    </div>
  );
};

export default HostDashboard;
