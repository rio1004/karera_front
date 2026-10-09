import { useAuthStore } from "@/store/auth/useAuth";
import { Navigate, Outlet } from "react-router-dom";

type Props = {
  allowedRoles: string[];
};

export const ProtectedRoute = ({ allowedRoles }: Props) => {
  const user = useAuthStore((state) => state.user);

  if (!user) return <Navigate to="/auth/login" replace />; // not logged in

  if (!allowedRoles.includes(user.type)) {
    return <Navigate to={`/${user.type}`} replace />; // logged in but not allowed
  }

  return <Outlet />;
};
