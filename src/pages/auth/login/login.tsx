import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  passwordSchema,
  phoneLoginSchema,
  type LoginSchema,
} from "@/schema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { usePlayerStore } from "@/store/player/usePlayerStore";
import { useLogin } from "@/hooks/auth/userLogin";
import PasswordForm from "./PasswordForm";
import PhoneForm from "./PhoneForm";
import TermsAndCondDrawer from "@/pages/player/components/TermsAndCondDrawer";

const AuthLogin = () => {
  const [activeTab, setActiveTab] = useState(2);
  const { showTerms, setShowTerms, setShowPrivacy, setShowTOU } =
    usePlayerStore();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const { handleLogin, isLoading } = useLogin();
  const schema = activeTab === 2 ? passwordSchema : phoneLoginSchema;

  useEffect(() => {
    setIsChecked(showTerms);
  }, [showTerms]);

  useEffect(() => {
    setShowTerms(false);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginSchema>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      userNameOrEmail: "",
      password: "",
      phone: "",
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    await handleLogin(data);
  };
  return (
    <div className="flex flex-col gap-5 h-full p-6">
      <TermsAndCondDrawer />
      <div className="flex flex-row items-center justify-center">
        <button
          className={`font-medium font-display bg-transparent border-0 w-[200px] flex items-center justify-center text-[15px] ${
            activeTab === 2 ? "text-[#00a24a]" : "text-[#999]"
          }`}
          onClick={() => setActiveTab(2)}
        >
          Password
        </button>
        <div className="w-px h-[23px] bg-[#ccc]" />
        <button
          className={`font-medium font-display bg-transparent border-0 w-[200px] flex items-center justify-center text-[15px] ${
            activeTab === 1 ? "text-[#00a24a]" : "text-[#999]"
          }`}
          onClick={() => setActiveTab(1)}
        >
          Phone
        </button>
      </div>
      <div className="h-full">
        <form
          className="flex flex-col gap-2 justify-between h-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            {activeTab == 2 ? (
              <PasswordForm
                errors={errors}
                isChecked={isChecked}
                isLoading={isLoading}
                isValid={isValid}
                register={register}
              />
            ) : (
              <PhoneForm
                errors={errors}
                isLoading={isLoading}
                isValid={isValid}
                register={register}
                onSubmit={handleSubmit(onSubmit)}
              />
            )}
            <p className="font-display mt-3 font-light text-[12px] text-[#818181] w-full flex flex-row justify-center items-center gap-[3px] ">
              Don’t have an account?
              <Link className="text-[#2196f3] no-underline" to="/auth/register">
                Sign up
              </Link>
            </p>
            <div className="w-full flex flex-col justify-center items-center mt-3">
              <p className="font-display font-light text-[12px] text-[#7f631a] rounded-[5px]  flex justify-center items-center">
                Trouble signing in?
              </p>
              <p className="font-display font-light text-[12px] text-[#7f631a] bg-[#fff7db] rounded-[5px] w-[197px] h-[27px] flex justify-center items-center">
                Email us at support@karera.live
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <p className="text-[13px]">
              I agree to the to the{" "}
              <span
                className="underline text-[#2196F3]"
                onClick={() => setShowTOU(true)}
              >
                Terms & Conditions
              </span>{" "}
              and
              <span
                className="underline text-[#2196F3]"
                onClick={() => setShowPrivacy(true)}
              >
                {" "}
                Privacy Policy.
              </span>
            </p>
          </div>{" "}
        </form>
      </div>
    </div>
  );
};

export default AuthLogin;
