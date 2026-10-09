import { UI_COLORS } from "@/constant/colors";
import { useAuthStore } from "@/store/auth/useAuth";
import { useOtpStore } from "@/store/player/useOtpStore";
import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function EnterOtpForm() {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(59);
  const [error, setError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  const navigationState = location.state || {};
  const { from, otpCode: initialOtp, userType } = navigationState;

  const {
    isLoading,
    OtpVerify,
    OtpRequest,
    mobile: storeMobile,
    setResetToken,
  } = useOtpStore();
  const { login } = useAuthStore.getState();

  const mobile = storeMobile || navigationState.mobile;
  useEffect(() => {
    if (initialOtp && from !== "register") {
      setOtp(initialOtp.split("").slice(0, 6));
    }
  }, [initialOtp, from]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleInputChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError("");

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);
    setError("");
    const nextIndex = Math.min(pastedData.length, otp.length - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleSubmit = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      toast.error("Please enter all 6 digits");
      return;
    }

    try {
      const res = await OtpVerify(otpString, mobile!);
      if (!res?.resetToken) return;
      setResetToken(res.resetToken);
      toast.success("OTP verified successfully!");

      if (from === "register") {
        navigate("/auth/register/ekyc-settings", {
          state: {
            userData: navigationState?.userData,
            userToken: navigationState?.userToken,
            userType: userType || "player",
            registerPayload: navigationState?.registerPayload,
            from: "register", 
          },
        });
      } else if (from === "forgot-password") {
        navigate("/auth/reset-password");
      } else if (res?.user && res?.token) {
        login(res.user, res.token);
        navigate(`/${res.user.type}`);
      } else {
        navigate("/");
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to verify OTP. Please try again.");
    } finally {
      setOtp(Array(6).fill(""));
    }
  };

  const handleResendOTP = async () => {
    if (!mobile) {
      toast.error("No mobile number found. Please restart the process.");
      return;
    }

    try {
      await OtpRequest(mobile);
      toast.success("OTP resent successfully!");
      setTimeLeft(59);
      setOtp(Array(6).fill(""));
      setError("");
      inputRefs.current[0]?.focus();
    } catch (error: any) {
      toast.error(error?.message || "Failed to resend OTP. Please try again.");
    }
  };

  const isOtpComplete = otp.every((digit) => digit !== "");
  const userContact = mobile || "Unknown";

  return (
    <div className="flex items-start p-4 justify-center">
      <div className="w-full max-w-md rounded-lg">
        <h2 className="text-xl font-medium text-gray-800 text-start mb-1">
          Enter One-Time-Pin (OTP)
        </h2>
        <p className="text-sm text-gray-500 text-start mb-8">
          Please enter the 6-digit code sent to{" "}
          <span className="font-medium text-gray-700">{userContact}</span>
        </p>

        <div className="space-y-2">
          {/* OTP Input Fields */}
          <div className="flex justify-center gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="w-10 h-10 text-center text-lg font-medium border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors bg-[#E9E9E9]"
                maxLength={1}
              />
            ))}
          </div>

          {error && <p className="text-red-500 text-xs text-center">{error}</p>}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!isOtpComplete || isLoading}
            className={`w-full h-12 rounded-full font-medium text-white text-lg transition-all duration-200 ${
              !isOtpComplete || isLoading
                ? "bg-gray-300 cursor-not-allowed"
                : ""
            }`}
            style={{
              background:
                !isOtpComplete || isLoading ? "" : UI_COLORS.LINEAR.green,
            }}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Submitting...
              </div>
            ) : (
              "Verify"
            )}
          </button>

          {/* Resend OTP */}
          <button
            onClick={handleResendOTP}
            disabled={timeLeft > 0 || isLoading}
            className={`w-full h-12 rounded-full font-medium text-lg transition-all duration-200 ${
              timeLeft > 0 || isLoading
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : ""
            }`}
            style={{
              background:
                timeLeft > 0 || isLoading ? "" : UI_COLORS.LINEAR.yellow,
            }}
          >
            Resend OTP
          </button>

          {/* Timer + Change Mobile */}
          <div className="text-center space-y-2">
            {timeLeft > 0 && (
              <p className="text-sm text-gray-500">
                Resend Code in{" "}
                <span className="font-medium">
                  {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
                  {String(timeLeft % 60).padStart(2, "0")}s
                </span>
              </p>
            )}
            <button
              onClick={() => navigate("/auth/request-otp")}
              className="text-sm text-gray-600 hover:text-gray-800 underline transition-colors"
            >
              Change Mobile Number
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
