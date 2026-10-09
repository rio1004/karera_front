import DailyLeaderboard from "@/pages/player/pages/dos-letra/component/DailyLeaderboard";
import { useDosLetraStore } from "@/store/player/useDosLetraStore";
import Text from "@/components/Text";
import { useWebSocketStore } from "@/store/websocket/useWebsocket";
import {
  useState,
  type FormEvent,
  type MouseEvent,
  type KeyboardEvent,
} from "react";
import LiveChat from "./LiveChat";
import GameBetDrawer from "@/pages/player/pages/dos-letra/component/GameBetDrawer";
import { usePlayerStore } from "@/store/player/usePlayerStore";

const LiveGameFooter = () => {
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [isOn, setIsOn] = useState(false);
  const { setShowGiftDrawer, setShowDrawer, showDrawer } = useDosLetraStore();
  const { setShowSideBar } = usePlayerStore();
  const { isConnected, sendMessage } = useWebSocketStore();

  const sendChat = () => {
    if (!newMessage.trim()) return;
    if (isConnected) {
      sendMessage({
        channel: "Chat",
        state: "Message",
        data: { message: newMessage },
      });
      setNewMessage("");
    }
  };

  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendChat();
  };

  const handleSendClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    sendChat();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendChat();
    }
  };

  return (
    <>
      <div className="absolute bottom-15 p-4 bg-transparent">
        <div
          onClick={() => setIsOn(!isOn)}
          className="w-[70px] p-1 rounded-full flex items-center justify-between mb-3 cursor-pointer transition-colors duration-300 bg-[#1A1A1A90]"
        >
          <Text
            text="ON"
            type="p1"
            color="white"
            className={`leading-0 ml-2 flex items-center transition-opacity duration-200 ${
              isOn ? "opacity-100" : "opacity-0"
            }`}
          />
          <img
            src="/icons/switch.png"
            alt="switch knob"
            className={`h-[25px] transform transition-transform duration-300 ${
              isOn ? "translate-x-[16px]" : "-translate-x-[22px]"
            }`}
          />
          <Text
            text="OFF"
            type="p1"
            color="white"
            className={`leading-0 flex !mr-2 items-center -translate-x-[14px] transition-opacity duration-200 ${
              !isOn ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>

        {isOn && <LiveChat />}
      </div>

      <div
        className="flex justify-center items-center h-[66px] px-4 shadow-md relative"
        style={{
          background: "linear-gradient(180deg, #00C0FA 0%, #015EEA 100%)",
        }}
      >
        {showDrawer && <GameBetDrawer onClose={() => setShowDrawer(false)} />}
        <div className="flex items-center gap-2 w-full max-w-[600px]">
          <img
            src="/DosLetra/hamburger icon.png"
            alt="Karera Live Game"
            className="h-[40px] object-contain cursor-pointer"
            onClick={() => setShowSideBar(true)}
          />
          <form
            onSubmit={handleSendMessage}
            className="relative w-full max-w-[300px] mt-2"
          >
            <input
              type="text"
              placeholder="type your message here..."
              className="rounded-full bg-black/50 text-white placeholder-white px-4 pr-10 py-2 border-[1.5px] border-[#FFE400] focus:outline-none focus:border-[#FFE400] hover:border-[#FFE400] text-sm w-full"
              style={{ height: "40px" }}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div onClick={handleSendClick}>
              <img
                src="/icons/send.png"
                alt="send"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer"
              />
            </div>
          </form>
          <img
            src="/DosLetra/star.png"
            alt="Star Icon"
            className="h-[35px] object-contain"
          />
          <img
            src="/DosLetra/gift box.png"
            alt="Gift Icon"
            className="h-[35px] object-contain"
            onClick={() => setShowGiftDrawer(true)}
          />
        </div>
      </div>

      <DailyLeaderboard
        showDrawer={showLeaderboard}
        setShowDrawer={setShowLeaderboard}
      />
    </>
  );
};

export default LiveGameFooter;
