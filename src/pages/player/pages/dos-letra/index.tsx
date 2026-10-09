import Countdown from "./component/Countdown";
import TopThree from "./component/TopThree";
import HeaderInfo from "./component/HeaderInfo";
import GameHistory from "./component/GameHistory";
import DosLetraModals from "./component/DosLetraModals";

import { useDosLetraStore } from "@/store/player/useDosLetraStore";
import { useDosLetraSocket } from "./hooks/useDosLetraSocket";
import { useModalHandlers } from "./hooks/useModalHandlers";
import { useModalState } from "./hooks/useModalState";
import LiveGameLayout from "@/pages/layout/LiveGameLayout";
import { LETRA_TEXTS } from "@/constant/dos-letra";
import GiftDrawer from "./component/GiftDrawer";
import BadgesDrawer from "./component/BadgesDrawer";
import LeaderBoardDrawer from "./component/LeaderBoardDrawer";
import VideoPlayer from "@/components/VideoPlayer";

const WINNING_AMOUNT = 52000;

const DosLetra = () => {
  const {
    betColor,
    betState,
    betBtnBgColor,
    countdown,
    showHistory,
    setShowHistory,
    showDrawer,
    setShowDrawer,
  } = useDosLetraStore();

  const { modalState, openModal, closeModal } = useModalState();

  const {
    handleWinnerClose,
    handleWinningsClose,
    handleTopThreeClose,
    handleNewGameClose,
  } = useModalHandlers({ openModal, closeModal });

  useDosLetraSocket({ openModal, closeModal });

  const renderBetButton = () => {
    if (showDrawer || modalState.winner) return null;

    return (
      <div
        className="absolute bottom-[106px] right-[22px] flex items-center z-2 cursor-pointer"
        id="bet-toggle-button"
        onClick={() => setShowDrawer(true)}
      >
        <img
          src="/DosLetra/bet.png"
          alt="Place bet"
          className="h-[90px] object-contain"
        />
      </div>
    );
  };

  return (
    <LiveGameLayout>
      <VideoPlayer url={"https://1b427243885c.ap-northeast-2.playback.live-video.net/api/video/v1/ap-northeast-2.544958837233.channel.rl9MxNoj2cHz.m3u8"}/>
      <img src="/DosLetra/dosLetraTemp.png" alt="Dos Letra game" />
      <Countdown countdown={countdown} betColor={betColor} />
      <HeaderInfo betState={betState} betBtnBgColor={betBtnBgColor} />
      <GiftDrawer />
      <BadgesDrawer />
      <LeaderBoardDrawer />
      <GameHistory setShowHistory={setShowHistory} showHistory={showHistory} />
      {renderBetButton()}
      <DosLetraModals
        winnerState={modalState.winner}
        handleWinnerClose={handleWinnerClose}
        newGameState={modalState.newGame}
        handleNewGameClose={handleNewGameClose}
        winningAmount={WINNING_AMOUNT}
        winningState={modalState.winnings}
        handleWinningClose={handleWinningsClose}
        giftState={modalState.gift}
        giftText={LETRA_TEXTS.gift}
        handleCloseGift={() => closeModal("gift")}
      />
      <TopThree isOpen={modalState.topThree} closeModal={handleTopThreeClose} />
    </LiveGameLayout>
  );
};

export default DosLetra;
