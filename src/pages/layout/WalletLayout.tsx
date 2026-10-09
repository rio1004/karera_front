import { SettingsLayoutConfig } from "@/routes/settingsLayoutConfig";
import { ChevronLeft } from "lucide-react";
import TermsPopup from "../player/components/TermsPopup";
import PrivacyPopup from "../player/components/PrivacyPopup";
import ResponsibleGaming from "../player/components/ResponsibleGaming";
import TermsAndCondDrawer from "../player/components/TermsAndCondDrawer";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const WalletLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const current = SettingsLayoutConfig().find((page: any) =>
    location.pathname.endsWith(page.path)
  );

  console.log("current", current);

  const goTo = () => {
    console.log("click");
    navigate("/player/wallet/transaction-history");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <TermsPopup />
      <PrivacyPopup />
      <ResponsibleGaming />
      <TermsAndCondDrawer />
      <div
        className="flex items-center justify-between py-[15px] px-[20px] border-[none] "
        style={{ background: "#00A24A" }}
      >
        <button onClick={() => navigate(-1)} className="p-1">
          <ChevronLeft color={current?.color ? current.color : "#fff"} />
        </button>
        <img
          src="/icons/invoice.png"
          alt=""
          className="w-6 h-6"
          onClick={goTo}
        />
      </div>

      <div className=" overflow-auto relative -mt-5">
        <Outlet />
      </div>
    </div>
  );
};

export default WalletLayout;
