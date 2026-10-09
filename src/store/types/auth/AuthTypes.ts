import type { User } from "./UserTypes";

type AuthState = {
  user: User | null;
  role: string;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
};

type AuthActions = {
  setRole: (role: string) => void;
  login: (user: User, token: string) => void;
  logout: () => void;
};

export type AuthTypes = AuthState & AuthActions;
