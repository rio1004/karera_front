import { usePlayerStore } from "@/store/player/usePlayerStore";
import { useFormContext } from "react-hook-form";

const TermsAndCondition = () => {
  const { setShowPrivacy, setShowTOU } = usePlayerStore();
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col items-start space-y-1">
      <div className="flex items-start space-x-3">
        <input
          type="checkbox"
          id="terms"
          {...register("agreeToTerms", {
            required: "You must agree to the terms and conditions",
          })}
          className="mt-1"
        />
        <label className="text-xs text-gray-600 leading-relaxed">
          I agree to the{" "}
          <span
            className="text-blue-500 cursor-pointer underline"
            onClick={() => setShowTOU(true)}
          >
            Terms and Conditions
          </span>{" "}
          and{" "}
          <span
            className="text-blue-500 cursor-pointer underline"
            onClick={() => setShowPrivacy(true)}
          >
            Privacy Policy
          </span>
          .
        </label>
      </div>

      {errors.agreeToTerms && (
        <p className="text-red-500 text-xs mt-1">
          {errors.agreeToTerms.message as string}
        </p>
      )}
    </div>
  );
};

export default TermsAndCondition;
