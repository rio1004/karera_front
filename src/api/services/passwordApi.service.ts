import { axiosInstance } from "../axiosInstance";
import { API_ENDPOINTS } from "../endpoints";

export const PasswordServices = {
  confirmResetPassword: async (
    newPassword: string,
    confirmNewPassword: string,
    otp: string,
    userName: string
  ) => {
    const payload = {
      otp,
      userName,
      newPassword,
      confirmNewPassword,
    };
    const { data } = await axiosInstance.post(
      API_ENDPOINTS.USERS.CONFIRM_PASSWORD,
      payload
    );
    return data;
  },

  OtpRequest: async (mobile: string) => {
    const payload = {
      mobile,
    };
    const { data } = await axiosInstance.post(
      API_ENDPOINTS.USERS.OTP_REQUEST,
      payload
    );
    return data;
  },

  OtpVerify: async (otp: string, mobile: string) => {
    const payload = {
      otp,
      mobile,
    };
    const { data } = await axiosInstance.post(
      API_ENDPOINTS.USERS.OTP_VERIFY,
      payload
    );
    return data;
  },

  PasswordChange: async (newPassword: string, newRepeatPassword: string, oldPassword: string) => {
    const payload = {
      newPassword,
      newRepeatPassword,
      oldPassword,
    };
    const { data } = await axiosInstance.patch(
      API_ENDPOINTS.USERS.PASSWORD_CHANGE,
      payload
    );
    return data;
  },

  PasswordReset: async (
    newPassword: string,
    newRepeatPassword: string,
    resetToken?: string
  ) => {
    const payload = { newPassword, newRepeatPassword };
    const headers: Record<string, string> = {};
    if (resetToken) {
      headers["Authorization"] = `Bearer ${resetToken}`; 
    }
    const { data } = await axiosInstance.patch(
      API_ENDPOINTS.USERS.PASSWORD_RESET,
      payload,
      { headers }
    );
    return data;
  },
};
