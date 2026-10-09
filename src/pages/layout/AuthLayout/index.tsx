import Image from "@/components/Image";
import Text from "@/components/Text";
import { ICONS, LOGIN_ASSETS } from "@/constant/image";
import PrivacyPopup from "@/pages/player/components/PrivacyPopup";
import ResponsibleGaming from "@/pages/player/components/ResponsibleGaming";
import TermsPopup from "@/pages/player/components/TermsPopup";
import { AuthLayoutConfig } from "@/routes/AuthLayoutConfig";
import { Outlet, useNavigate } from "react-router-dom";

const AuthLayout = () => {
  const navigate = useNavigate();
  const current = AuthLayoutConfig.find((page: any) =>
    location.pathname.endsWith(page.path)
  );
  return (
    <div>
      {" "}
      <TermsPopup />
      <PrivacyPopup />
      <ResponsibleGaming />
      <div className="relative pb-5">
        <Image path={LOGIN_ASSETS.redBg.src} className="h-[50vh] w-[100vw]" />
        <div className="absolute top-0 left-0 w-[100vw] h-[100vh] flex flex-col p-5 gap-4">
          <div className="flex justify-between">
            <div className="flex gap-2 items-start">
              <Image
                path={ICONS.right.src}
                className="h-[20px]"
                onClick={() => navigate(-1)}
              />
              {current?.title && (
                <Text text={current?.title} type="h6" color="white" />
              )}
            </div>
            <Image path={ICONS.secured.src} className="h-[45px]" />
          </div>

          <div className="flex flex-col gap-2 px-2 flex-1 justify-center max-w-6xl lg:mx-auto ">
            {current?.label && (
              <Text
                text={current?.label}
                type="h8"
                align="left"
                color="white"
                className="!ml-5"
              />
            )}

            <div
              className={`bg-white ${
                current?.path === "auth/register" ? "p-6" : "p-2"
              } rounded-[30px] relative shadow-[0px_4px_4px_0px_#5B5B5B80] mt-2 max-h-[700px] min-h-[524px] flex flex-col`}
            >
              {current?.path === "auth/register" && (
                <Text
                  text="Please complete all required information."
                  type="p2"
                  align="left"
                  className=" bg-white z-10 py-2"
                />
              )}
              <div
                className={`flex-1 ${
                  current?.path === "auth/register" ? "overflow-y-auto" : ""
                }`}
              >
                <Outlet />
              </div>
            </div>
            <Image
              path={LOGIN_ASSETS.pagcorLogoModerator.src}
              className="h-[60px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
