import { create } from "zustand";

interface ResetPasswordState {
  password: string;
  confirmPassword: string;
  setPassword: (value: string) => void;
  setConfirmPassword: (value: string) => void;
}

export const useResetPasswordStore = create<ResetPasswordState>((set) => ({
  password: "",
  confirmPassword: "",
  setPassword: (value) => set({ password: value }),
  setConfirmPassword: (value) => set({ confirmPassword: value }),
}));
