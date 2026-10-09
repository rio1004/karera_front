import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import { useOtpStore } from "@/store/player/useOtpStore";
import { usePasswordStore } from "@/store/player/usePasswordStore";
import {
  resetPasswordChangeSchema,
  type PasswordResetFormData,
} from "@/schema/authSchema";
import { getPasswordRequirements } from "./components/requirements";
import PasswordField from "./components/PasswordField";
import PasswordRequirement from "./components/PasswordRequirement";
import { UI_COLORS } from "@/constant/colors";

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const { PasswordReset } = useOtpStore();
  const {
    showPassword,
    showConfirmPassword,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
  } = usePasswordStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm<PasswordResetFormData>({
    resolver: zodResolver(resetPasswordChangeSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const watchedPassword = watch("newPassword", "");
  const requirements = getPasswordRequirements(watchedPassword);

  const onSubmit = async (data: PasswordResetFormData) => {
    try {
      await PasswordReset(data.newPassword, data.newRepeatPassword);
      toast.success("Your password has been changed successfully");
      navigate("/player");
    } catch (error: any) {
      console.error("Error resetting password:", error);
      toast.error(error?.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="p-6">
      <header className="text-start mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Reset Password
        </h1>
        <p className="text-gray-600 text-sm">
          To keep your account safe, you need to create a strong password.
        </p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-1.5">
        {/* New Password */}
        <PasswordField
          field={register("newPassword")}
          error={errors.newPassword}
          placeholder="Your New Password"
          show={showPassword}
          toggleShow={togglePasswordVisibility}
        />

        {/* Confirm Password */}
        <PasswordField
          field={register("newRepeatPassword")}
          error={errors.newRepeatPassword}
          placeholder="Confirm Your New Password"
          show={showConfirmPassword}
          toggleShow={toggleConfirmPasswordVisibility}
        />

        {/* Requirements */}
        <section className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            YOUR PASSWORD MUST CONTAIN
          </h3>
          <div className="space-y-2">
            {requirements.map((req, index) => (
              <PasswordRequirement key={index} met={req.met}>
                {req.text}
              </PasswordRequirement>
            ))}
          </div>
        </section>

        <button
          type="submit"
          disabled={isSubmitting || !isValid}
          className="w-full text-white font-semibold py-3 px-6 rounded-full 
                     transition-colors duration-200 disabled:cursor-not-allowed"
          style={{
            background:
              isSubmitting || !isValid
                ? UI_COLORS.PLAIN.gray
                : UI_COLORS.LINEAR.green,
          }}
        >
          {isSubmitting ? "Resetting..." : "Reset"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
