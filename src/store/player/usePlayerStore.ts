import { create } from "zustand";
import type { PlayerStoreType } from "../types/player/player";
import { persist } from "zustand/middleware";
export const usePlayerStore = create<PlayerStoreType>()(
  persist(
    (set) => ({
      showSidebar: false,
      setShowSideBar: (value) => set({ showSidebar: value }),

      showRightSideBar: false,
      setShowRightSidebar: (value) => set({ showRightSideBar: value }),

      showTOU: false,
      setShowTOU: (value) => set({ showTOU: value }),

      showPrivacy: false,
      setShowPrivacy: (value) => set({ showPrivacy: value }),

      showResponsible: false,
      setShowResponsible: (value) => set({ showResponsible: value }),

      showTerms: false,
      setShowTerms: (value) => set({ showTerms: value }),
    }),
    {
      name: "player-store",
      partialize: (state) => ({ showTerms: state.showTerms }),
    }
  )
);
