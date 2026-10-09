import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { InputFieldLogin } from "../InputField";
import { useLogin } from "@/hooks/auth/userLogin";
import { loginSchema, type LoginSchema } from "@/schema/authSchema";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_ASSETS } from "@/constant/image";
import Image from "../Image";

export default function LoginForm() {
  const { handleLogin, isLoading } = useLogin();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      userNameOrEmail: "",
      password: "",
    },
  });

  const [activeTab, setActiveTab] = useState<number>(2);
  const [showPassword, setShowPassword] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const onSubmit = (data: LoginSchema) => handleLogin(data);

  return (
    <div
      className={`h-[450px] flex flex-col items-center bg-center bg-no-repeat bg-cover font-display`}
      style={{ backgroundImage: `url(${LOGIN_ASSETS.redBg.src})` }}
    >
      <div className="flex flex-row pt-4 w-full justify-between items-center">
        <button
          onClick={handleBack}
          className="flex flex-row items-center border-0 bg-transparent"
        >
          <ChevronLeft size={30} color="white" />
        </button>
      </div>

      <h2 className="text-white  mt-16 mb-4 font-display font-medium text-[20px]">
        Let’s Get You Signed In!
      </h2>

      <div className="box-border pt-8 px-5 flex flex-col rounded-[25px] w-[320px] h-[493px] m-auto bg-white shadow-[0_10px_15px_rgba(0,0,0,0.25)]">
        <div className="w-full flex flex-col">
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

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 h-[320px]">
            {activeTab === 2 && (
              <>
                <div className="flex flex-col mb-2 h-[48px] rounded-[10px] bg-white px-3 justify-center text-start">
                  <InputFieldLogin
                    type="text"
                    {...register("userNameOrEmail")}
                    placeholder="Enter your email"
                    className="font-display"
                  />
                </div>

                <div className="flex flex-col mb-2 h-[48px] rounded-[10px] bg-white px-3 justify-center text-start">
                  <InputFieldLogin
                    isPassword
                    {...register("password")}
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    error={errors.password?.message}
                    icon={
                      showPassword ? <Eye size={15} /> : <EyeClosed size={15} />
                    }
                    onIconClick={() => setShowPassword((prev) => !prev)}
                  />
                </div>

                <Link
                  to="/player/reset-password"
                  className="border-0 bg-transparent font-display text-[12px] text-[#2196f3] w-full flex items-center justify-end"
                >
                  Reset password?
                </Link>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-[49px] border-0 rounded-[25px] font-display font-light text-[20px] text-white bg-gradient-to-b from-[#00CB60] to-[#009135] mt-3"
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </button>

                <p className="font-display font-light text-[13px] text-[#818181] w-full flex flex-row justify-center items-center gap-[3px] mt-3">
                  Don’t have an account?
                  <Link className="text-[#2196f3] no-underline" to="/register">
                    Sign up
                  </Link>
                </p>

                <div className="w-full mt-2 flex flex-row justify-center items-center">
                  <p className="font-display font-light text-[13px] text-[#7f631a] bg-[#fff7db] rounded-[5px] w-[197px] h-[27px] flex justify-center items-center">
                    Email us at support@karera.live
                  </p>
                </div>
              </>
            )}

            {activeTab === 1 && (
              <>
                <p className="font-display font-light text-[13px] text-[#818181] mb-2">
                  We’ll send a code to your mobile number
                </p>

                <InputFieldLogin
                  prefix="+63"
                  type="tel"
                  maxLength={10}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  {...register("phone")}
                  placeholder="9123456789"
                />

                <button
                  type="button"
                  className="w-full h-[49px] border-0 rounded-[25px] font-display font-light text-[20px] text-white bg-gradient-to-b from-[#00CB60] to-[#009135] mt-4"
                >
                  Request OTP
                </button>

                <p className="font-display font-light text-[13px] text-[#818181] w-full flex flex-row justify-center items-center gap-[3px] mt-3">
                  Don’t have an account?
                  <a className="text-[#2196f3] no-underline" href="/register">
                    Sign up
                  </a>
                </p>

                <div className="w-full mt-2 flex flex-row justify-center items-center">
                  <p className="font-display font-light text-[13px] text-[#7f631a] bg-[#fff7db] rounded-[5px] w-[197px] h-[27px] flex justify-center items-center">
                    Email us at support@karera.live
                  </p>
                </div>
              </>
            )}
          </form>
        </div>
      </div>

      <div className="w-full flex flex-col justify-center items-center mt-8">
        <Image
          path={LOGIN_ASSETS.pagcorLogoModerator.src}
          className="h-[50px]"
        />
      </div>
    </div>
  );
}
