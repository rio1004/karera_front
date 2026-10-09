import { useEffect, useRef, useState } from "react";
import ChatHeader from "./components/ChatHeader";

type ChatMessage = {
  id: number;
  sender: "cs" | "user" | "default";
  text: string;
  time: string;
};

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: "cs",
      text: `Welcome to Karera.Live! We’re here for you 24/7. How can we assist you today? Don’t forget to subscribe to our official Facebook group at www.fb.com/fbgroupname for the latest news and promotions!`,
      time: "10:06 AM",
    },
    {
      id: 2,
      sender: "cs",
      text: `Hello! I’m Princess, your friendly Karera.Live agent today. What can I help you with?`,
      time: "10:06 AM",
    },
    {
      id: 2,
      sender: "default",
      text: `Withdrawal Concern`,
      time: "10:06 AM",
    },
    {
      id: 2,
      sender: "default",
      text: `Deposit Concern`,
      time: "10:06 AM",
    },
    {
      id: 2,
      sender: "default",
      text: `Account Verification`,
      time: "10:06 AM",
    },
    {
      id: 2,
      sender: "default",
      text: `Game Inquiry`,
      time: "10:06 AM",
    },
    {
      id: 2,
      sender: "default",
      text: `Others`,
      time: "10:06 AM",
    },
    {
      id: 4,
      sender: "user",
      text: `Until now, my account is not yet verified. How long would it take to be verified? Gusto ko na magwithdraw.`,
      time: "10:06 AM",
    },
  ]);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const now = new Date();
  const formattedDate = now.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleSend = () => {
    if (!message.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now(),
      sender: "user",
      text: message,
      time: getCurrentTime(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const handleAction = (action: string) => {
    switch (action) {
      case "plus":
        console.log("Plus button clicked → open file picker, menu, etc.");
        break;
      case "emoji":
        console.log("Open emoji picker");
        break;
      default:
        console.log("Unknown action:", action);
    }
  };

  return (
    <div className="flex flex-col h-[100dvh]">
      <header className="shrink-0">
        <ChatHeader />
      </header>

      <main className="flex-1 overflow-y-auto p-5">
        <p className="text-[#999] text-[12px] text-center">
          TODAY {formattedDate}
        </p>

        <div className="flex flex-col gap-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col gap-1 text-[12px] max-w-[70vw] ${
                msg.sender === "user" ? "self-end" : ""
              } `}
            >
              {msg.sender != "default" && (
                <p className="text-[#999999] ml-1">
                  {msg.sender === "user" ? "You" : "CS Princess"} {msg.time}
                </p>
              )}

              <div
                className={`shadow-[0px_0px_7px_-4px_rgba(0,0,0,0.74)] rounded-[15px] p-4 ${
                  msg.sender === "user" ? "bg-[#00A24A] text-white" : "bg-white"
                } ${
                  msg.sender === "default"
                    ? "!bg-[#FFE4002E] border-[#FFE400] border-[1px] w-fit rounded-full !p-2 !px-4"
                    : ""
                }`}
              >
                <p>{msg.text}</p>
              </div>
            </div>
          ))}

          <div ref={bottomRef} />
        </div>
      </main>

      <footer className="shrink-0 p-4 flex w-full justify-center gap-2 items-center">
        <div className="relative w-full">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Write your message here..."
            className="border-[#D9D9D9] border-[1px] w-full p-2 rounded-[10px]"
          />
          <div onClick={handleSend}>
            <img
              src="/icons/send-green.png"
              alt="send"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer"
            />
          </div>
        </div>

        <img
          src="/icons/plus-green.png"
          alt="action"
          onClick={() => handleAction("plus")}
          className="w-7 h-7 cursor-pointer"
        />
      </footer>
    </div>
  );
};

export default ChatBox;
