import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import { useOtpStore } from "@/store/player/useOtpStore";
import { usePasswordStore } from "@/store/player/usePasswordStore";
import {
  passwordChangeSchema,
  type PasswordChangeFormData,
} from "@/schema/authSchema";
import { UI_COLORS } from "@/constant/colors";
import { getPasswordRequirements } from "@/pages/auth/reset-password/components/requirements";
import PasswordField from "@/pages/auth/reset-password/components/PasswordField";
import PasswordRequirement from "@/pages/auth/reset-password/components/PasswordRequirement";

const ChangePassword = () => {
  const navigate = useNavigate();
  const { PasswordChange } = useOtpStore();
  const {
    showPassword,
    showConfirmPassword,
    showOldPassword,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    toggleOldPasswordVisibility,
  } = usePasswordStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm<PasswordChangeFormData>({
    resolver: zodResolver(passwordChangeSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const watchedOldPassword = watch("oldPassword", "");
  const watchedPassword = watch("newPassword", "");
  const watchedRepeatPassword = watch("newRepeatPassword", "");

  const isOldPasswordValid = watchedOldPassword.length > 0 && !errors.oldPassword;
  const isNewPasswordValid = watchedPassword.length > 0 && !errors.newPassword;
  const isRepeatPasswordValid = watchedRepeatPassword.length > 0 && !errors.newRepeatPassword;

  const requirements = getPasswordRequirements(watchedPassword);

  const onSubmit = async (data: PasswordChangeFormData) => {
    try {
      await PasswordChange(
        data.newPassword,
        data.newRepeatPassword,
        data.oldPassword
      );
      toast.success("Your password has been changed successfully");
      navigate("/player");
    } catch (error: any) {
      console.error("Error resetting password:", error);
      toast.error(error?.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div>
      <header className="text-start mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Change Your Password
        </h1>
        <p className="text-gray-600 text-sm">
          To keep your account safe, you need to create a strong password.
        </p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <PasswordField
          field={register("oldPassword")}
          error={errors.oldPassword}
          placeholder="Enter Your Current Password"
          show={showOldPassword}
          toggleShow={toggleOldPasswordVisibility}
          value={watchedOldPassword}
          isValid={isOldPasswordValid}
        />
        <PasswordField
          field={register("newPassword")}
          error={errors.newPassword}
          placeholder="Enter Your New Password"
          show={showPassword}
          toggleShow={togglePasswordVisibility}
          value={watchedPassword}
          isValid={isNewPasswordValid}
        />
        <PasswordField
          field={register("newRepeatPassword")}
          error={errors.newRepeatPassword}
          placeholder="Confirm Your New Password"
          show={showConfirmPassword}
          toggleShow={toggleConfirmPasswordVisibility}
          value={watchedRepeatPassword}
          isValid={isRepeatPasswordValid}
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
          {isSubmitting ? "Changing..." : "Change"}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;