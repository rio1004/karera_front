import { useMemo, useState, useRef, useEffect } from "react";
import { useCSRStore } from "@/store/admin/useCSRStore";
import { Search } from "lucide-react";
import { useWebSocketStore } from "@/store/websocket/useWebsocket";

const quickTopics = [
  "Withdrawal Concern",
  "Deposit Concern",
  "Account Verification",
  "Game Inquiry",
  "Others",
];

function formatDateTime(date: Date) {
  const now = new Date();

  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  const time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  if (isToday) {
    return `Today ${time}`;
  }

  return date.toLocaleString([], {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export default function CSRLiveUI() {
  const [tab, setTab] = useState<"All" | "New" | "Handled" | "Closed">("All");
  const [search, setSearch] = useState("");
  const [showEndPopup, setShowEndPopup] = useState(false);
  const { messages } = useWebSocketStore();

  const convos = useCSRStore((state) => state.convos);
  const activeId = useCSRStore((state) => state.activeId);
  const notifyOn = useCSRStore((state) => state.notifyOn);
  const setActiveId = useCSRStore((state) => state.setActiveId);
  const toggleNotify = useCSRStore((state) => state.toggleNotify);
  const pushAgentMessage = useCSRStore((state) => state.pushAgentMessage);
  const endConversation = useCSRStore((state) => state.endConversation);
  const markAsRead = useCSRStore((state) => state.markAsRead);

  const activeConvo = useMemo(
    () => convos.find((c) => c.id === activeId) || null,
    [convos, activeId]
  );

  const filtered = useMemo(() => {
    return convos
      .filter((c) => {
        if (tab !== "All" && c.status !== tab) return false;
        if (!search) return true;
        return (
          c.user.handle.toLowerCase().includes(search.toLowerCase()) ||
          c.preview.toLowerCase().includes(search.toLowerCase())
        );
      })
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  }, [convos, search, tab]);

  function handleEndConversation() {
    if (!activeConvo) return;
    endConversation();
    setShowEndPopup(false);
  }

  return (
    <>
      <div className="grid grid-cols-[1fr_2fr] gap-[1px] flex-1 overflow-hidden bg-gray-300">
        {/* LEFT PANEL */}
        <div className="bg-white h-full pt-2">
          {/* Tabs */}
          <div className="flex items-center text-[24px] border-b border-gray-300 px-2 pb-5 mb-2 w-full gap-1">
            {["All", "New", "Handled", "Closed"].map((t) => {
              const activeColors: Record<string, string> = {
                All: "bg-green-500",
                New: "bg-yellow-500",
                Handled: "bg-blue-500",
                Closed: "bg-red-500",
              };

              return (
                <button
                  key={t}
                  onClick={() => {
                    setTab(t as any);
                    setActiveId(null); // reset active conversation when tab changes
                  }}
                  className={`flex-1 text-center px-3 py-1 rounded-full cursor-pointer text-white ${
                    tab === t ? activeColors[t] : "bg-gray-300"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>

          {/* Notify toggle */}
          <div className="flex items-center border-b border-gray-300 px-3 py-2">
            <span className="text-[22px]">Notification Sound</span>
            <div className="ml-auto text-xs flex items-center">
              <button
                className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${
                  notifyOn ? "bg-green-500" : "bg-gray-400"
                }`}
                onClick={toggleNotify}
              >
                <span
                  className={`absolute top-[2px] left-[2px] w-4 h-4 bg-white rounded-full transition-transform ${
                    notifyOn ? "translate-x-5" : ""
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="px-2">
            <div className="relative mt-2 flex items-center">
              <Search className="absolute left-2" color="#999999" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search something here"
                className="w-full p-2 pl-9 text-[20px] rounded-full bg-gray-100 outline-none"
              />
            </div>
          </div>

          {/* Conversation list */}
          <ul className="list-none p-2 h-[calc(100vh-220px)] overflow-y-auto">
            {filtered.map((c) => {
              const latestMessage =
                c.messages.length > 0
                  ? c.messages[c.messages.length - 1].text
                  : "No messages yet";

              return (
                <li
                  key={c.id}
                  className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer ${
                    activeId === c.id ? "bg-yellow-100" : ""
                  }`}
                  onClick={() => {
                    setActiveId(c.id);
                    markAsRead(c.id);
                  }}
                >
                  <span
                    className={`inline-block min-w-[24px] text-center bg-red-600 text-white text-[11px] px-2 py-[2px] rounded-full mr-[-7px] ${
                      c.unread === 0 ? "invisible" : ""
                    }`}
                  >
                    {c.unread > 0 ? c.unread : ""}
                  </span>
                  <img
                    src={c.user.avatar}
                    alt="avatar"
                    className="w-9 h-9 rounded-full"
                  />
                  <div className="flex flex-col flex-1">
                    <div className="flex justify-between">
                      <span className="text-[18px] text-[#5B5B5B]">
                        {c.user.handle}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatDateTime(c.updatedAt)}
                      </span>
                    </div>
                    <div className="text-[20px] text-gray-500 truncate">
                      {latestMessage}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* RIGHT PANEL */}
        <div className="bg-white flex flex-col h-full pt-2">
          {activeConvo ? (
            <>
              {/* Header */}
              <div className="flex items-center gap-2 border-b border-gray-300 px-2 pb-2 mb-2">
                <img
                  src={activeConvo.user.avatar}
                  className="w-9 h-9 rounded-full"
                />
                <div className="font-bold">{activeConvo.user.handle}</div>
                <div className="ml-auto text-black text-base">
                  Ticket ID: VKC82102048X121
                </div>
                <button
                  disabled={activeConvo.ended}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-green-500 hover:bg-green-600 text-white disabled:bg-gray-300"
                >
                  <span className="relative text-3xl font-bold bottom-1.25">
                    ...
                  </span>
                </button>
              </div>

              {/* Quick Topics */}
              <div className="flex flex-wrap gap-2 mt-2 px-2">
                {quickTopics.map((t) => (
                  <button
                    key={t}
                    onClick={() => pushAgentMessage(`Regarding ${t}`)}
                    className="text-xs px-3 py-1 border border-gray-300 rounded-full bg-white"
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto mt-2 flex flex-col gap-1 max-h-[calc(100vh-280px)] p-2">
                {activeConvo.messages.map((m) => (
                  <div
                    key={m.id}
                    className={`max-w-[70%] px-3 py-2 border border-gray-300 rounded-full text-sm ${
                      m.from === "agent"
                        ? "bg-white text-black self-start"
                        : "bg-green-600 text-white self-end"
                    }`}
                  >
                    {m.text}
                  </div>
                ))}

                {activeConvo.ended && (
                  <div className="text-center text-black text-sm py-2">
                    This chat session has ended.
                  </div>
                )}
              </div>

              {/* Composer */}
              <Composer
                disabled={!activeConvo}
                onSend={pushAgentMessage}
                onEnd={() => setShowEndPopup(true)}
                ended={!!activeConvo.ended}
              />
            </>
          ) : (
            <div className="flex flex-col h-[85vh]">
              <div className="flex-1 flex items-center justify-center text-3xl bg-white text-gray-400 rounded-xl p-3">
                No selected conversation.
              </div>
              <Composer
                disabled={true}
                onSend={() => {}}
                onEnd={() => {}}
                ended={false}
              />
            </div>
          )}
        </div>
      </div>

      {/* End Confirmation Popup */}
      {showEndPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[300px] relative">
            <button
              className="absolute top-2 right-2 text-xl"
              onClick={() => setShowEndPopup(false)}
            >
              ✕
            </button>
            <p className="mb-4 text-gray-700">End this chat?</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={handleEndConversation}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                End
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Composer component remains unchanged
function Composer({
  disabled,
  onSend,
  onEnd,
  ended,
}: {
  disabled?: boolean;
  onSend: (text: string) => void;
  onEnd: () => void;
  ended: boolean;
}) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  function send() {
    const text = value.trim();
    if (!text) return;
    onSend(text);
    setValue("");
    inputRef.current?.focus();
  }

  return (
    <div className="flex items-center gap-2 p-2 border-t border-gray-300">
      <div className="relative flex-1">
        <textarea
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={disabled || ended}
          placeholder="Write your message here..."
          className="w-full min-h-[50px] p-3 pr-12 rounded-lg border border-gray-300 resize-none outline-none text-sm disabled:bg-gray-100"
        />
        <button
          className="absolute right-3 top-1/2 -translate-y-1/2 text-2xl text-green-500 hover:text-green-600 disabled:text-gray-400"
          onClick={send}
          disabled={disabled || ended}
          title="Send"
        >
          ➤
        </button>
      </div>

      <button
        disabled={disabled || ended}
        className="px-3 py-1 rounded text-white bg-green-500 hover:bg-green-600 disabled:bg-gray-300"
      >
        +
      </button>
      <button
        onClick={onEnd}
        disabled={disabled || ended}
        className="px-3 py-1 rounded-full text-white bg-green-500 hover:bg-green-600 disabled:bg-gray-300"
      >
        End
      </button>
      <button
        disabled={disabled}
        className="px-3 py-1 rounded-full text-white bg-green-500 hover:bg-green-600 disabled:bg-gray-300"
      >
        Rate
      </button>
    </div>
  );
}
