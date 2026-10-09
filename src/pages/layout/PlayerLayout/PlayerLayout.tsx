import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { useEffect } from "react";
import { useWallet } from "@/hooks/player/useWallet";
import RightSideBar from "@/pages/player/components/RightSideBar";
import { useAuthStore } from "@/store/auth/useAuth";
import { useEKYCStore } from "@/store/player/useEKYCStore";
import { EkycServices } from "@/api/services/ekycApi.service";

export default function PlayerLayout() {
  const { getWalletBalance } = useWallet();
  const { isAuthenticated, user } = useAuthStore();

  const { checkPinStatus } = useWallet();
  const { setEkycStatus } = useEKYCStore();

  useEffect(() => {
    if (!(isAuthenticated || user?.id)) return;

    checkPinStatus();

    if (user?.id) {
      const fetchEkyc = async () => {
        const res = await EkycServices.getEkycById(user.id);
        setEkycStatus(res.status);
      };

      fetchEkyc();
    }
  }, [isAuthenticated, user?.id]);

  useEffect(() => {
    if (isAuthenticated) {
      getWalletBalance();
    }
  }, [isAuthenticated]);
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <RightSideBar />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
