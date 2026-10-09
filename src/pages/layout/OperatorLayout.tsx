import { OPERATOR_ICON } from "@/constant/image";
import { useWallet } from "@/hooks/player/useWallet";
import { useAuthStore } from "@/store/auth/useAuth";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const OperatorLayout = () => {
  const { getWalletBalance } = useWallet();
  const { isAuthenticated, user } = useAuthStore();
  console.log("asdfasdf");
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      getWalletBalance();
    }
  }, [isAuthenticated]);
  return (
    <>
      <header
        className={`px-4 py-3 flex justify-between items-center min-h-[100px] bg-cover bg-center`}
      >
        <button
          className={`"text-black"}`}
          onClick={() => navigate("/operator")}
        >
          <img
            src={OPERATOR_ICON.whiteArrow.src}
            className="w-8 h-8"
            alt="Back"
          />
        </button>
        <div className={`text-xl text-white font-bold`}>Wallet</div>
        <div className="flex items-center space-x-3">
          <div
            className={`w-8 h-8 rounded-full text-white flex items-center justify-center `}
          >
            <img
              src={OPERATOR_ICON.walletMoney.src}
              className="w-8 h-8"
              alt="Coins"
            />
          </div>
        </div>
      </header>

      <section>
        <Outlet />
      </section>
    </>
  );
};
