import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthTypes } from "../types/auth/AuthTypes";

export const useAuthStore = create<AuthTypes>()(
  persist(
    (set) => ({
      user: null,
      role: "",
      token: null,
      loading: false,
      isAuthenticated: false,
      setRole: (role) => set({ role }),
      login: (user, token) =>
        set({
          user,
          token,
          isAuthenticated: true,
          role: (user as any)?.type ?? "",
        }),
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false, role: "" });
        localStorage.removeItem("auth-storage");
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
