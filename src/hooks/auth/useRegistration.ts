import { AuthService } from "@/api/services/authApi.service";
import { useOtpStore } from "@/store/player/useOtpStore";
import type { RegisterPayload } from "@/types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useRegister = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOtpSent] = useState<boolean>(false);

  const handleRegister = async (data: RegisterPayload) => {
    setIsLoading(true);
    try {
      const res = await AuthService.register(data);
      const mobile = res?.user?.mobile;
      const otpCode = res?.otpCode;
      if (!mobile || !otpCode) {
        throw new Error("Missing mobile or otpCode from response");
      }
      useOtpStore.getState().setMobile(mobile);
      toast.success("OTP sent successfully!");
      navigate("/auth/otp", {
        state: {
          from: "register",
          registerPayload: data,
          otpCode,
          mobile,
          userType: data.type,
          userData: res.user,
          userToken: res.token,
        },
      });
    } catch (error: any) {
      toast.error(error?.message || "Failed to register");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, isOtpSent, handleRegister };
};
