import { create } from "zustand";

export type Sender = "user" | "agent";

export interface Message {
  id: string;
  from: Sender;
  text: string;
  at: number;
}

export interface Conversation {
  id: string;
  user: { handle: string; avatar: string };
  preview: string;
  updatedAt: Date;
  status: "New" | "Handled" | "Closed";
  unread: number;
  messages: Message[];
  ended?: boolean;
}

interface CSRState {
  convos: Conversation[];
  activeId: string | null;
  notifyOn: boolean;

  setConvos: (convos: Conversation[]) => void;
  setActiveId: (id: string | null) => void;
  toggleNotify: () => void;
  pushAgentMessage: (text: string) => void;
  endConversation: () => void;
  markAsRead: (id: string) => void;
}

const seedConversations: Conversation[] = [
  {
    id: "c1",
    user: { handle: "jackie775020", avatar: "https://i.pravatar.cc/48?img=10" },
    preview: "Withdrawal concern",
    updatedAt: new Date(Date.now() - 60 * 60 * 1000),
    status: "New",
    unread: 1,
    messages: [{ id: "m1", from: "user", text: "Hello! I have a concern.", at: Date.now() - 3600_000 }],
  },
  {
    id: "c2",
    user: { handle: "mssal777020", avatar: "https://i.pravatar.cc/48?img=11" },
    preview: "Deposit concern",
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    status: "New",
    unread: 1,
    messages: [{ id: "m1", from: "user", text: "I need help with a deposit.", at: Date.now() - 7200_000 }],
  },
];

export const useCSRStore = create<CSRState>((set, get) => ({
  convos: seedConversations,
  activeId: null,
  notifyOn: true,

  setConvos: (convos) => set({ convos }),
  setActiveId: (id) => set({ activeId: id }),
  toggleNotify: () => set((state) => ({ notifyOn: !state.notifyOn })),

  pushAgentMessage: (text) => {
    const { convos, activeId } = get();
    if (!activeId) return;

    set({
      convos: convos.map((c) =>
        c.id === activeId
          ? {
              ...c,
              messages: [...c.messages, { id: crypto.randomUUID(), from: "agent", text, at: Date.now() }],
              updatedAt: new Date(),
              status: c.status === "New" ? "Handled" : c.status,
            }
          : c
      ),
    });
  },

  endConversation: () => {
    const { convos, activeId } = get();
    if (!activeId) return;

    set({
      convos: convos.map((c) => (c.id === activeId ? { ...c, ended: true } : c)),
    });
  },

  markAsRead: (id) => {
    const { convos } = get();
    set({
      convos: convos.map((c) => (c.id === id ? { ...c, unread: 0 } : c)),
    });
  },
}));
