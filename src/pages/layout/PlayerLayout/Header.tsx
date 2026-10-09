import Image from "@/components/Image";
import { Button } from "@/components/ui/button";
import { UI_COLORS } from "@/constant/colors";
import { ICONS } from "@/constant/image";
import { useAuthStore } from "@/store/auth/useAuth";
import { usePlayerStore } from "@/store/player/usePlayerStore";
import { useWalletStore } from "@/store/player/useWalletStore";
import { formatToPeso } from "@/utils/utils.helper";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { setShowSideBar } = usePlayerStore();
  const { walletBalance } = useWalletStore();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const handleSideBar = () => {
    setShowSideBar(true);
  };

  return (
    <header
      className=" px-4 py-3 flex justify-between items-center"
      style={{ background: UI_COLORS.LINEAR.red }}
    >
      <img
        src={ICONS.kareralogo.src}
        alt={ICONS.kareralogo.alt}
        className="h-[32px] object-contain"
      />
      {isAuthenticated ? (
        <div className="flex items-center gap-1">
          <div
            className="flex items-center bg-success border-1 px-2 py-1 hover:bg-green-600 transition-colors border-white rounded-full"
            onClick={() => navigate("wallet")}
          >
            <span className="text-white font-semibold text-sm mr-2">
              {formatToPeso(walletBalance)}
            </span>
            <Image
              path={ICONS.plusIcon.src}
              className="w-[14px] h-[14px] object-contain"
            />
          </div>
          <div onClick={handleSideBar}>
            {" "}
            <Image path={ICONS.profile.src} className="w-[26px] h-[26px]" />
          </div>
          <Image
            path={ICONS.message.src}
            className="w-[24px] h-[24px]"
            onClick={() => navigate("message")}
          />
        </div>
      ) : (
        <div className="flex items-center gap-1">
          <div>
            <Button
              variant="outlineWhite"
              onClick={() => navigate("/auth/login")}
              className="py-[unset] !h-[35px] text-[16px]"
            >
              Sign In
            </Button>
          </div>
          <div>
            <Button
              variant="yellow"
              onClick={() => navigate("/auth/register")}
              className="text-[#1A1A1A] py-[unset] !h-[35px] text-[16px]"
            >
              Sign up
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
