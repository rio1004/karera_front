import { useLocation } from "react-router-dom";
import { useMemo } from "react";
import { useAuthStore } from "@/store/auth/useAuth";

export const useEffectiveType = () => {
  const location = useLocation();
  const user = useAuthStore((state) => state.user);

  const effectiveType = useMemo(() => {
    if (!user) return "player";

    const rootPath = location.pathname.split("/")[1];

    if (user.type === "admin") {
      switch (rootPath) {
        case "player":
          return "player";
        case "operator":
          return "operator";
        default:
          return "admin";
      }
    }

    return user.type;
  }, [location.pathname, user]);

  return effectiveType;
};
