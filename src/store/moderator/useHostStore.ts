import { HostService } from "@/api/services/hostApi.service";
import { UserService } from "@/api/services/userApi.service";
import type { GetMethodBaseQueryParams } from "@/types";
import { create } from "zustand";

export type GameStatus =
  | "OPEN"
  | "NEW_GAME"
  | "LAST_CALL"
  | "CLOSING"
  | "CLOSED"
  | "ROLLING"
  | "DECLARED"
  | "SEND_PAYOUT"
  | "SEND_PAYOUT_SUCCESSFUL"
  | "COUNTDOWN"
  | "UNAVAILABLE";

export interface Host {
  id: string;
  userId: number;
  name: string;
  firstName?: string;
  lastName?: string;
  userName?: string;
  email?: string;
  mobile?: string;
  likes: number;
  badge?: string;
  isSelected?: boolean;
  status?: string;
  gameId?: string;
  hostId?: string;
  profile?: {
    id: number;
    userId: number;
    permanentAddress?: string;
    currentAddress?: string;
    birthDate?: string;
    birthPlace?: string;
    nationality?: string;
    gamingSite?: string;
    natureOfWork?: string;
    sourceOfIncome?: string;
    profilePicture?: string;
    profilePictureUrl?: string;
    meta?: {
      talent?: string;
      zodiac?: string;
      location?: string;
      birthDate?: string;
    };
    createdAt: string;
    updatedAt: string;
  };
  location?: string;
  talent?: string;
  zodiac?: string;
  birthDate?: string;
  profileImage?: string;
}

export interface ApiHost {
  id: string;
  name?: string;
}

interface HostState {
  gameRound: string;
  studioNo: string;
  hostName: string;
  isOpen: boolean;
  selectedLetter: "A" | "B" | null;
  timeLeft: number;
  status: GameStatus;
  messageData: any;

  isHostModalOpen: boolean;
  availableHosts: Host[];

  isDeclareButtonEnabled: boolean;
  isConfirmingLetter: boolean;
  confirmStep: 1 | 2 | null;
  letterToConfirm: "A" | "B" | null;
  declaredWinner: "A" | "B" | null;
  isPayoutModalOpen: boolean;
  isPayoutSuccess: boolean;

  toggleOpen: () => void;
  selectLetter: (letter: "A" | "B") => void;
  toggleHostModal: () => void;
  closeHostModal: () => void;
  setHostName: (hostName: string) => void;
  setAvailableHosts: (hosts: Host[]) => void;
  setStatus: (status: GameStatus) => void;
  setTimeLeft: (time: number) => void;
  setWinner: (winner: "A" | "B" | null) => void;
  setMessageData: (messageData: any) => void;
  setStudioNo: (studioNo: string) => void;

  enableDeclareButton: () => void;
  startLetterConfirm: (letter: "A" | "B") => void;
  advanceLetterConfirm: () => void;
  cancelLetterConfirm: () => void;
  declareWinner: () => void;
  openPayoutModal: () => void;
  confirmPayout: () => void;
  resetAfterPayout: () => void;
  clearWinner: () => void;
  startNewGame: () => void;

  setConfirmingLetter: (open: boolean) => void;

  isDrawerOpen: boolean;
  toggleDrawer: () => void;
  setDrawerOpen: (open: boolean) => void;
}

export const useHostStore = create<HostState>((set, get) => ({
  gameRound: "250215DL0002",
  studioNo: "",
  hostName: "",
  isOpen: false,
  selectedLetter: null,
  timeLeft: 0,
  status: "UNAVAILABLE" as GameStatus,
  isDrawerOpen: false,

  isHostModalOpen: false,
  availableHosts: [],

  isDeclareButtonEnabled: false,
  isConfirmingLetter: false,
  confirmStep: null,
  letterToConfirm: null,
  declaredWinner: null,
  isPayoutModalOpen: false,
  isPayoutSuccess: false,
  messageData: {},

  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  selectLetter: (letter) => set({ selectedLetter: letter }),
  toggleHostModal: () =>
    set((state) => ({ isHostModalOpen: !state.isHostModalOpen })),

  closeHostModal: () => set(() => ({ isHostModalOpen: false })),

  setHostName: (hostName) => {
    set({ hostName });
    // Also update the availableHosts to mark the selected host
    set((state) => ({
      availableHosts: state.availableHosts.map((host) =>
        host.name === hostName
          ? { ...host, isSelected: true }
          : { ...host, isSelected: false }
      ),
    }));
  },

  setAvailableHosts: (hosts) => set({ availableHosts: hosts }),

  setStatus: (status) => set({ status }),
  setMessageData: (messageData) => set({ messageData }),
  setTimeLeft: (seconds) => set({ timeLeft: seconds }),
  setStudioNo: (studioNo) => set({ studioNo }),

  enableDeclareButton: () => set({ isDeclareButtonEnabled: true }),

  startLetterConfirm: (letter) =>
    set({
      isConfirmingLetter: true,
      confirmStep: 1,
      letterToConfirm: letter,
      selectedLetter: letter,
    }),

  advanceLetterConfirm: () => {
    const step = get().confirmStep;
    if (step === 1) {
      set({ confirmStep: 2 });
    } else if (step === 2) {
      get().declareWinner();
    }
  },

  cancelLetterConfirm: () =>
    set({
      isConfirmingLetter: false,
      confirmStep: null,
      letterToConfirm: null,
      selectedLetter: null,
    }),

  declareWinner: () =>
    set((state) => ({
      declaredWinner: state.letterToConfirm,
      isConfirmingLetter: false,
      confirmStep: null,
      letterToConfirm: null,
      isDeclareButtonEnabled: false,
      status: "SEND_PAYOUT" as GameStatus,
      isOpen: false,
    })),

  clearWinner: () =>
    set({
      declaredWinner: null,
      selectedLetter: null,
    }),

  openPayoutModal: () =>
    set({ isPayoutModalOpen: true, isConfirmingLetter: false, confirmStep: 1 }),

  confirmPayout: () => set({ isPayoutModalOpen: false, isPayoutSuccess: true }),

  resetAfterPayout: () =>
    set({
      declaredWinner: null,
      isPayoutSuccess: false,
      isOpen: false,
      status: "NEW_GAME" as GameStatus,
      timeLeft: 0,
      selectedLetter: null,
      isDeclareButtonEnabled: false,
      isConfirmingLetter: false,
      confirmStep: null,
      letterToConfirm: null,
    }),

  startNewGame: () =>
    set({
      declaredWinner: null,
      isPayoutSuccess: false,
      isOpen: false,
      status: "NEW_GAME" as GameStatus,
      timeLeft: 0,
      selectedLetter: null,
      isDeclareButtonEnabled: false,
      isConfirmingLetter: false,
      confirmStep: null,
      letterToConfirm: null,
      isPayoutModalOpen: false,
    }),

  setConfirmingLetter: (open) => set({ isConfirmingLetter: open }),

  toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
  setDrawerOpen: (open: boolean) => set({ isDrawerOpen: open }),
  setWinner: (winner) => set({ declaredWinner: winner }),
}));

// Helper functions for consistent error handling
const createErrorHandler =
  (action: string) =>
  (err: unknown): string => {
    const errorMessage =
      err instanceof Error ? err.message : `Failed to ${action}`;
    console.error(`Error ${action}:`, err);
    return errorMessage;
  };

  const mapUserToHost = (user: any): Host => {
  return {
    id: String(user.id),
    userId: user.id,
    name: `${user.firstName} ${user.lastName}`.trim() || user.userName || "Unknown",
    firstName: user.firstName,
    lastName: user.lastName,
    userName: user.userName,
    email: user.email,
    mobile: user.mobile,
    likes: 0, // Default value, you might want to fetch this separately
    isSelected: false,
    profile: user.profile,
    // Computed properties for easy access
    location: user.profile?.meta?.location || user.profile?.permanentAddress || "Not specified",
    talent: user.profile?.meta?.talent || "Not specified",
    zodiac: user.profile?.meta?.zodiac || "Not specified",
    birthDate: user.profile?.meta?.birthDate || user.profile?.birthDate || user.birthDate,
    profileImage: user.profile?.profilePictureUrl || "/default-avatar.jpg",
  };
};

type HostStore = {
  hosts: Host[];
  isLoading: boolean;
  isUpdating: boolean;
  updateError: string | null;
  selectHost: (hostName: string) => void;
  currentRoomId: string | null;
  setCurrentRoomId: (roomId: string) => void;
  fetchHosts: (params?: GetMethodBaseQueryParams) => Promise<void>;
  updateHostById: (id: string, gameId: string, hostId: string) => Promise<any>;
  clearUpdateError: () => void;
};

export const useHostsStore = create<HostStore>((set) => ({
  hosts: [],
  isLoading: false,
  isUpdating: false,
  updateError: null,
  currentRoomId: null,

  setCurrentRoomId: (roomId: string) => {
    set({ currentRoomId: roomId });
  },

  selectHost: (hostName: string) => {
    useHostStore.getState().setHostName(hostName);
  },

  fetchHosts: async (params = { limit: 10, offset: 0 }) => {
    set({ isLoading: true });
    try {
      const { users } = await UserService.getUsers({
        ...params,
        type: "host",
      } as any);

      const mappedHosts: Host[] = users.map(mapUserToHost);

      console.log('Mapped hosts with profiles:', mappedHosts); // Debug log

      set({ hosts: mappedHosts, isLoading: false, updateError: null });
      useHostStore.getState().setAvailableHosts(mappedHosts);
    } catch (err) {
      const error = createErrorHandler("fetch hosts")(err);
      set({ updateError: error, isLoading: false });
    }
  },


  updateHostById: async (roomId: string, gameId: string, hostId: string) => {
    try {
      const response = await HostService.updateHost(roomId, gameId, hostId);
      const hostStore = useHostStore.getState();
      const selectedHost = hostStore.availableHosts.find(
        (h) => h.id === hostId
      );
      if (selectedHost) {
        hostStore.setHostName(selectedHost.name);
      }
      return response;
    } catch (error) {
      console.error("Failed to update host:", error);
      throw error;
    }
  },

  clearUpdateError: () => set({ updateError: null }),
}));
