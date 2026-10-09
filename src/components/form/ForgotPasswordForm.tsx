import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  resetPasswordSchema,
  type ResetPasswordSchema,
} from "@/schema/authSchema";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PhoneForm from "@/pages/auth/login/PhoneForm";
import { useOtpStore } from "@/store/player/useOtpStore";

export default function ForgotPasswordForm() {
  const { isLoading, OtpRequest } = useOtpStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      mobile: "",
    },
    mode: "onTouched",
  });

  const watchedValues = watch();
  const allFieldsFilled = Object.values(watchedValues).every(
    (value) => value.trim() !== ""
  );

  const onSubmit = async (data: ResetPasswordSchema) => {
    try {
      await OtpRequest(data.mobile);
      toast("Password has been reset successfully.");
      reset();
      navigate("/auth/otp");
    } catch (error: any) {
      toast(error?.response?.data?.message ?? "Failed to reset password");
    }
  };

  return (
    <div className="flex items-start justify-center bg-gray-50 font-display">
      <div className="w-full p-6">
        <h2 className="text-xl font-medium text-gray-800 text-start mb-1">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <PhoneForm
            register={register}
            errors={errors}
            isValid={isValid && allFieldsFilled}
            isChecked={true} 
            isLoading={isLoading}
          />
        </form>
      </div>
    </div>
  );
}