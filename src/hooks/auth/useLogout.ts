/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuthService } from "@/api/services/authApi.service";
import { popup } from "@/components/PopupManager";
import { useAuthStore } from "@/store/auth/useAuth";
import { usePlayerStore } from "@/store/player/usePlayerStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useLogout = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const logout = useAuthStore((state) => state.logout);
  const { setShowSideBar, setShowRightSidebar } = usePlayerStore();

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const authData = JSON.parse(localStorage.getItem("auth-storage") || "{}");
      const token = authData?.state?.token;

      if (!token) {
        throw new Error("No token found");
      }
      const res = await AuthService.logout();
      if (res) {
        logout();
        popup.success("Logged out successfully.");
        navigate("/login");
        setShowRightSidebar(false);
        setShowSideBar(false);
      }
    } catch (error) {
      toast("Logout failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleLogout };
};
