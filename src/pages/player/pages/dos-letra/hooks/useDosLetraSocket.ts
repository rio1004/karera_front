import { useEffect } from "react";

import { useDosLetraStore } from "@/store/player/useDosLetraStore";

import type { ModalType } from "./useModalState";
import { useAuthStore } from "@/store/auth/useAuth";
import { UI_COLORS } from "@/constant/colors";
import { useWebSocketStore } from "@/store/websocket/useWebsocket";
import { useWallet } from "@/hooks/player/useWallet";

export const useDosLetraSocket = ({
  openModal,
  closeModal,
}: {
  openModal: (type: ModalType) => void;
  closeModal: (type: ModalType) => void;
}) => {
  const token = useAuthStore((state) => state.token);
  const {
    messages,
    initializeWebSocket,
    isConnected,
    isAuthenticated,
    sendMessage,
  } = useWebSocketStore();

  const { getWalletBalance } = useWallet();

  const {
    setBetBtnBgColor,
    setBetColor,
    setBetState,
    resetGame,
    setCountdown,
    setOddA,
    setOddB,
    setBetType,
    setBetAmountA,
    setBetAmountB,
    setDeclaredWinner,
    setTopWinners,
    setWinnings,
    setNetA,
    setNetB,
  } = useDosLetraStore();

  useEffect(() => {
    initializeWebSocket();
  }, []);

  useEffect(() => {
    if (isConnected) {
      sendMessage({
        channel: "Game",
        state: "Authenticate",
        data: { token },
      });
    }
  }, [isConnected, token]);

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
    if (!messages?.length) return;

    const latest = messages[messages.length - 1];
    if (latest.channel !== "Game") return;

    const { state, data } = latest;

    const handleNewGame = () => {
      resetGame();
      setBetState("Ended");
      setBetBtnBgColor(UI_COLORS.LINEAR.red);
      openModal("newGame");
      closeModal("winner");
      closeModal("topThree");
      setBetType("");
      setBetAmountA(0);
      setBetAmountB(0);
      setWinnings(0);
      setTopWinners([]);
      setOddA(0);
      setOddB(0);
      setNetA(0);
      setNetB(0);
    };

    const handleUpdate = () => {
      if (data?.odds) {
        setOddA(data.odds.A);
        setOddB(data.odds.B);
      }
      if (data?.net) {
        setNetA(data.net.A);
        setNetB(data.net.B);
      }
    };

    const handleBet = () => {
      if (data?.A != null) setBetAmountA(data.A);
      if (data?.B != null) setBetAmountB(data.B);
    };

    const handleWinnerDeclared = () => {
      getWalletBalance();
      setBetState("Ended");
      setBetBtnBgColor(UI_COLORS.LINEAR.red);
      openModal("winner");
      setCountdown(0);
      if (data?.choice) {
        setDeclaredWinner(data.choice);
      }
    };

    const handleSendPayout = () => {
      if (data?.topWinners) {
        const latestThree = data.topWinners.slice(-3);
        setTopWinners(latestThree);
      }
    };

    switch (state) {
      case "NewGame":
        handleNewGame();
        setBetState("New Game");
        break;
      case "Closing":
        setCountdown(data?.countdown ?? 0);
        setBetState(latest.state);
        break;
      case "Rolling":
        setBetBtnBgColor(UI_COLORS.LINEAR.yellow);
        setCountdown(0);
        setBetState(latest.state);
        break;
      case "Open":
        setBetBtnBgColor(UI_COLORS.LINEAR.green);
        setCountdown(data?.countdown ?? 0);
        closeModal("newGame");
        setBetColor("success");
        setBetState(latest.state);
        break;
      case "LastCall":
        setCountdown(data?.countdown ?? 0);
        setBetBtnBgColor(UI_COLORS.PLAIN.yellow);
        setBetColor("warning");
        setBetState("Last call");
        break;
      case "Closed":
        setBetBtnBgColor(UI_COLORS.LINEAR.red);
        setCountdown(0);
        setBetState(latest.state);
        break;
      case "WinnerDeclared":
        handleWinnerDeclared();
        break;
      case "Update":
        handleUpdate();
        break;
      case "Bet":
        handleBet();
        break;
      case "Win":
        setWinnings(data?.wins);
        break;
      case "SendPayout":
        handleSendPayout();
        break;
    }
  }, [messages]);
};
