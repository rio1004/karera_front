import Text from "@/components/Text";
import { SettingsLayoutConfig } from "@/routes/settingsLayoutConfig";
import { ChevronLeft } from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import TermsPopup from "../player/components/TermsPopup";
import PrivacyPopup from "../player/components/PrivacyPopup";
import ResponsibleGaming from "../player/components/ResponsibleGaming";
import TermsAndCondDrawer from "../player/components/TermsAndCondDrawer";

const SettingsLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const current = SettingsLayoutConfig().find((page: any) =>
    location.pathname.endsWith(page.path)
  );

  return (
    <div className="min-h-screen flex flex-col">
      <TermsPopup />
      <PrivacyPopup />
      <ResponsibleGaming />
      <TermsAndCondDrawer />
      <div
        className={`flex items-center justify-between py-[15px] px-[20px] relative`}
        style={{
          background: current?.bgColor,
          color: current?.color,
          borderBottom: current?.hasNoBorder ? "" : "1px solid #C4C4C4",
        }}
      >
        <button onClick={() => navigate(-1)} className="p-1">
          <ChevronLeft color={current?.color ? current.color : "#bfbfbf"} />
        </button>
        <Text
          type="p1"
          text={current?.title ?? ""}
          color={current?.color ? current.color : "#000"}
        />
        {current?.icon}
      </div>

      <div
        className={`${
          current?.hasNoPadding ? "" : "px-[25px] py-[20px]"
        } flex-1 overflow-auto relative ${
          current?.bodyBG ? `bg-[${current.bodyBG}]` : ""
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default SettingsLayout;
