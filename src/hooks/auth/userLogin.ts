import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { LoginPayload } from "../../types";
import { AuthService } from "@/api/services/authApi.service";
import { useAuthStore } from "@/store/auth/useAuth";
import { popup } from "@/components/PopupManager";
import { usePlayerStore } from "@/store/player/usePlayerStore";

export const useLogin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const login = useAuthStore((state) => state.login);
  const { setShowRightSidebar, setShowSideBar, setShowTerms } =
    usePlayerStore();
  const handleLogin = async (credentials: LoginPayload) => {
    setIsLoading(true);
    try {
      const res = await AuthService.login(credentials);
      if (res?.token && res?.user) {
        login(res?.user, res.token);
        if (res.user.type === "admin") {
          navigate("/auth/redirector");
        } else {
          navigate(`/${res.user.type}`);
          setShowRightSidebar(false);
          setShowSideBar(false);
          setShowTerms(false);
        }
        popup.success("Your account has been successfully logged in.");
      } else {
        popup.error("Invalid login response from server");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleLogin };
};
