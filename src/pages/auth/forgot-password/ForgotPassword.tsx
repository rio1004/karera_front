import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgotPasswordSchema,
  type ForgotPasswordSchema,
} from "@/schema/authSchema";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PhoneForm from "@/pages/auth/login/PhoneForm";
import { useOtpStore } from "@/store/player/useOtpStore";

export default function ForgotPassword() {
  const { isLoading, OtpRequest } = useOtpStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { mobile: "" },
    mode: "onChange",
  });

  const onSubmit = async (data: ForgotPasswordSchema) => {
    try {
      await OtpRequest(data.mobile);
      toast.success("OTP sent successfully.");
      reset();
      navigate("/auth/otp", { state: { from: "forgot-password" } });
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? "Failed to send OTP");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">Forgot Password</h2>
      <PhoneForm
        register={register}
        errors={errors}
        isValid={isValid}
        isChecked={true}
        isLoading={isLoading}
        onSubmit={handleSubmit(onSubmit)}
      />
    </div>
  );
}
