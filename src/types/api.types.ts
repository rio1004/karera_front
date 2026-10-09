import type { User } from "@/store/types/auth/UserTypes";
export interface GetMethodBaseQueryParams {
  // for GET METHOD ONLY
  limit?: number;
  offset?: number;
  startDate?: string;
  endDate?: string;
  searchQuery?: string;
  type?: string;
  period?: string;

  [key: string]: any;
}

export type ApiResponse = {
  user: User;
  token: string;
  otpCode?: string;
};

export interface PasswordRule {
  text: string;
  check: boolean;
}
