import   { useState } from "react";
import InputField from "../../../../components/Gamesites/InputField";
import { UI_COLORS } from "../../../../constant/colors";
import Text from "@/components/Gamesites/Text";
import CustomButton from "@/components/Gamesites/button";

const Login = () => {
  const [openModal] = useState(false);

  return (
    <div className="flex flex-col min-h-screen relative">
      <div
        className="flex flex-col items-center justify-start p-5 h-[45vh] bg-cover"
        style={{ backgroundImage: "url(/loginAssets/RED_BG.png)" }}
      >
        <div className="relative w-full h-[16%] flex justify-between mb-5">
          <div className="flex-1 flex items-center">
            <img
              src="/loginAssets/KARERA_LIVE_LOGO.png"
              alt="Secured Login"
              className="h-full"
            />
          </div>
          <img
            src="/loginAssets/Secure-login.png"
            alt="Secured Login"
            className="h-full "
          />
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center -translate-y-1/2">
        <Text type="h4" text="Let’s Get You Signed In!" weight="bold" />
        <div className="relative bg-white rounded-[30px] p-6 shadow-lg flex flex-col w-[360px]">
          <InputField
            label="Username"
            placeholder="Enter your username"
            type="text"
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            type="password"
          />
          <CustomButton bgColor={UI_COLORS.LINEAR.green} text="Login" />
        </div>
      </div>
      {openModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white w-[365px] h-[119px] flex items-center justify-start p-3 rounded-[10px] shadow-lg">
            <img
              src="/assets/login/MODAL_CHECK_IMG.png"
              alt="Success"
              className="w-[107px] h-[66px] mr-[-10px]"
            />
            <span className="text-[24px] font-normal text-[#333] ml-2">
              Your account has been successfully logged in.
            </span>
          </div>
        </div>
      )}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
        <img
          src="/loginAssets/PAGCOR_LOGO.png"
          alt="Your Logo"
          className="w-[28vh]"
        />
      </div>
    </div>
  );
};

export default Login;
