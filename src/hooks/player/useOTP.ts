import { useState } from "react";

import type { OtpPayload } from "@/types/player/otp";
import { OtpServices } from "@/api/services/otpApi.service";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
export const useOTP = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const requestOTP = async (payload: OtpPayload) => {
    setIsLoading(true);
    try {
      const res = await OtpServices.requestOTP(payload);
      if (res.message) {
        navigate("/player/otp");
      }
    } catch (error: any) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { requestOTP, isLoading };
};
