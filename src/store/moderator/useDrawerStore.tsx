// store/useDrawerStore.ts
import type { ReactNode } from 'react'
import { create } from 'zustand'

interface DrawerState {
  isOpen: boolean
  content: ReactNode | null
  isEndGameModalOpen: boolean
  isSignOutModalOpen: boolean
  openDrawer: (content: ReactNode) => void
  closeDrawer: () => void
  setEndGameModal: (open: boolean) => void
  setSignOutModal: (open: boolean) => void
}

export const useDrawerStore = create<DrawerState>((set) => ({
  isOpen: false,
  content: null,
  isEndGameModalOpen: false,
  isSignOutModalOpen: false,
  openDrawer: (content) => set({ isOpen: true, content }),
  closeDrawer: () => set({ isOpen: false, content: null }),
  setEndGameModal: (open) => set({ isEndGameModalOpen: open }),
  setSignOutModal: (open) => set({ isSignOutModalOpen: open }),
}))
