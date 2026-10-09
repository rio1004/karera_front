import type { PasswordStore } from "@/types/player/password";
import { create } from "zustand";

export const usePasswordStore = create<PasswordStore>((set) => ({
  showPassword: false,
  showConfirmPassword: false,
  showOldPassword: false,
  isSubmitting: false,
  togglePasswordVisibility: () =>
    set((state) => ({ showPassword: !state.showPassword })),
  toggleConfirmPasswordVisibility: () =>
    set((state) => ({ showConfirmPassword: !state.showConfirmPassword })),
  toggleOldPasswordVisibility: () =>
    set((state) => ({ showOldPassword: !state.showOldPassword })),
  setSubmitting: (isSubmitting) => set({ isSubmitting }),
}));