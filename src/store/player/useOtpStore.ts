import { create } from "zustand";
import { PasswordServices } from "@/api/services/passwordApi.service";

interface OtpState {
  mobile: string | null;
  resetToken: string | null;
  isLoading: boolean;
  isAuthenticated?: boolean;
  setMobile: (mobile: string) => void;
  setResetToken: (resetToken: string) => void; 
  OtpRequest: (mobile: string) => Promise<any>;
  OtpVerify: (otp: string, mobile: string) => Promise<any>;
  PasswordChange: (
    newPassword: string,
    newRepeatPassword: string,
    oldPassword: string
  ) => Promise<any>;
  PasswordReset: (
    newPassword: string,
    newRepeatPassword: string
  ) => Promise<any>;
}

export const useOtpStore = create<OtpState>((set, get) => ({
  mobile: null,
  isLoading: false,
  resetToken: null,
  isAuthenticated: false,
  setMobile: (mobile) => set({ mobile }),
  setResetToken: (resetToken) => set({ resetToken }),
  
  OtpRequest: async (mobile: string) => {
    try {
      set({ isLoading: true });
      const res = await PasswordServices.OtpRequest(mobile);
      set({ mobile });
      return res;
    } catch (err) {
      console.error("[OTP Store] Request failed", err);
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  OtpVerify: async (otp: string, mobile: string) => {
    try {
      set({ isLoading: true });
      const res = await PasswordServices.OtpVerify(otp, mobile);
      if (res?.resetToken) {
        set({ resetToken: res.resetToken, isAuthenticated: true });
      }
      return res
    } catch (err) {
      console.error("[OTP Store] Verify failed", err);
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  PasswordChange: async (newPassword, newRepeatPassword, oldPassword) => {
    try {
      set({ isLoading: true });
      const res = await PasswordServices.PasswordChange(
        newPassword,
        newRepeatPassword,
        oldPassword
      );
      return res;
    } catch (err) {
      console.error("[OTP Store] Confirm password failed", err);
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  PasswordReset: async (newPassword, newRepeatPassword) => {
    try {
      set({ isLoading: true });
      const { resetToken } = get();

      const res = await PasswordServices.PasswordReset(
        newPassword,
        newRepeatPassword,
        resetToken ?? undefined
      );
      return res;
    } catch (err) {
      console.error("[OTP Store] Password change failed", err);
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },
}));
