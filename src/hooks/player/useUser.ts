import { useState } from "react";

import { popup } from "@/components/PopupManager";
import { UserService } from "@/api/services/userApi.service";
import { useAuthStore } from "@/store/auth/useAuth";
import type { User } from "@/types";
export const useUserHook = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<User>();
  const { user } = useAuthStore();

  const getUserById = async () => {
    setIsLoading(true);
    try {
      const res = await UserService.getUserById(user?.id || "");
      if (res.user) {
        setResult(res.user);
      }
    } catch (error: any) {
      popup.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { getUserById, isLoading, result };
};
