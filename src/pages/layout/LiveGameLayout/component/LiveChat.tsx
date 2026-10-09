import { GIFT_ICON, ICONS } from "@/constant/image";
import { BadgePopup } from "@/pages/player/pages/dos-letra/component/BadgesPopUp/Badges";
import { useWebSocketStore } from "@/store/websocket/useWebsocket";
import { useEffect, useState, useRef } from "react";

type MessageType = {
  id: string;
  userName: string;
  message: string;
  color: string;
  bgColor: string;
  vipType: "vip" | "front_runner" | "loyalty" | "master_giver";
  icon: string;
};

const vipMapping: Record<MessageType["vipType"], string> = {
  vip: "#4F27874D",
  front_runner: "#FE8F004D",
  loyalty: "#4CD3FE4D",
  master_giver: "#00A24A4D",
};

const vipMappingIcon: Record<MessageType["vipType"], string> = {
  vip: ICONS.vipBadge.src,
  front_runner: ICONS.frontRunner.src,
  loyalty: ICONS.loyaltyBadge.src,
  master_giver: ICONS.masterBadge.src,
};

const getRandomVipType = (): MessageType["vipType"] => {
  const types: MessageType["vipType"][] = [
    "vip",
    "front_runner",
    "loyalty",
    "master_giver",
  ];
  return types[Math.floor(Math.random() * types.length)];
};

const LiveChat = () => {
  const { messages: wsMessage } = useWebSocketStore();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [badgePopup, setBadgePopup] = useState<{
    isOpen: boolean;
    vipType: MessageType["vipType"] | null;
  }>({
    isOpen: false,
    vipType: null,
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!wsMessage?.length) return;
    const latest = wsMessage[wsMessage.length - 1];

    const handleSetMessage = (msg: string, username: string) => {
      const vipType = getRandomVipType();
      const userMessage: MessageType = {
        id: username,
        userName: username,
        message: msg,
        color: "text-[#FFE400]",
        bgColor: vipMapping[vipType],
        vipType,
        icon: vipMappingIcon[vipType],
      };

      setMessages((prev) => [...prev, userMessage].slice(-6));
    };

    const { state, data } = latest;
    if (state === "Message")
      handleSetMessage(data.message, data.sender.userName);
  }, [wsMessage]);

  const handleShowBadgePopUp = (vipType: MessageType["vipType"]) => {
    setBadgePopup({
      isOpen: true,
      vipType: vipType,
    });
  };

  const handleCloseBadgePopup = () => {
    setBadgePopup({
      isOpen: false,
      vipType: null,
    });
  };

  return (
    <>
      <div className="bg-transparent p-4 pl-0 w-[300px] h-64 overflow-y-auto transition-transform duration-500 ease-in-out transform flex flex-col-reverse space-y-2 space-y-reverse">
        {[...messages].reverse().map((msg, index) => {
          const isLast = index === messages.length - 1;
          const isSecondLast = index === messages.length - 2;

          return (
            <div
              key={msg.userName + index}
              className={`flex space-x-2 animate-fadeIn ${
                isLast
                  ? "opacity-50"
                  : isSecondLast
                  ? "opacity-70"
                  : "opacity-100"
              }`}
            >
              <div
                style={{ backgroundColor: msg.bgColor }}
                className="p-1 px-2 items-center rounded-md flex"
                onClick={() => handleShowBadgePopUp(msg.vipType)}
              >
                <div className="flex-1 min-w-0 flex items-center gap-1">
                  <img src={msg.icon} className="h-[15px]" />
                  <div>
                    <span className={`font-semibold text-sm ${msg.color}`}>
                      {msg.userName}:
                    </span>
                    <span className="text-white text-sm ml-2">
                      {msg.message}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
        <div className="flex items-center rounded-full px-2 py-1 text-white w-fit gap-2 bg-[linear-gradient(180deg,rgba(255,234,0,0.85)_0%,rgba(255,198,0,0.85)_100%)]">
          <img src={"/dosLetraAssets/gift/profile.png"} className="h-[30px]" />
          <div className="flex flex-col items-center">
            <div className="flex-1 min-w-0 flex items-center gap-1">
              <img src={ICONS.masterBadge.src} className="h-[15px]" />
              <p className={`font-semibold text-sm text-[#1a1a1a]`}>
                jode7891990
              </p>
            </div>
            <p className="text-sm">Sent Impressive</p>
          </div>
          <img src={GIFT_ICON.racer.src} className="h-[30px]" />
          <p className="bg-[#1A1A1AD9] rounded-full px-2">x1</p>
        </div>
      </div>

      {badgePopup.vipType && (
        <BadgePopup
          isOpen={badgePopup.isOpen}
          onClose={handleCloseBadgePopup}
          vipType={badgePopup.vipType}
        />
      )}
    </>
  );
};

export default LiveChat;
