import { axiosInstance } from "../axiosInstance";
import { API_ENDPOINTS } from "../endpoints";
import type { OtpPayload, OtpResponse } from "@/types/player/otp";

export const OtpServices = {
  requestOTP: async (data: OtpPayload): Promise<OtpResponse> => {
    const res = await axiosInstance.post(API_ENDPOINTS.OTP.OTP_REQUEST, data);
    return res.data;
  },
};
