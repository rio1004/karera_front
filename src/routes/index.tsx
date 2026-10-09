import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";

import GameSiteHomePage from "@/pages/game-site/home-page";
import BetTransactions from "@/pages/game-site/bet-transactions";
import Login from "@/pages/game-site/auth/Login";
import { SettingsLayoutConfig } from "./settingsLayoutConfig";
import GamePage from "@/pages/player/pages/games/GamePage";
import Wallet from "@/pages/player/pages/Wallet";
import Csr from "@/pages/csr/csr";
import SettingsLayout from "@/pages/layout/SettingsLayout";
import WalletLayout from "@/pages/layout/WalletLayout";
import PlayerPage from "@/pages/player/PlayerPage";
import PlayerLayout from "@/pages/layout/PlayerLayout/PlayerLayout";
import GameSiteDosLetra from "@/pages/game-site/dos-letra";
import DosLetra from "@/pages/player/pages/dos-letra";
import ModeratorLayout from "@/pages/layout/moderatorLayout/ModeratorLayout";
import CsrLayout from "@/pages/layout/CsrLayout";
import CsrAttendance from "@/pages/csr/CsrAttendance";
import AuthLayout from "@/pages/layout/AuthLayout";
import { AuthLayoutConfig } from "./AuthLayoutConfig";
import HostDashboard from "@/pages/moderator/components/HostDashboard";
import OperatorPage from "@/pages/operator/OperatorPage";
import { useEffectiveType } from "@/hooks/common/useEffectiveType";
import { OperatorWalletLayoutConfig } from "./OperatorWalletLayoutConfig";
import OperatorWalletLayout from "@/pages/layout/OperatorWalletLayout";
import OperatorWallet from "@/pages/operator/pages/wallet/OperatorWallet";
import ModeratorPage from "@/pages/moderator/ModeratorPage";
import AdminLayout from "@/pages/layout/AdminLayout";
import { AdminLayoutConfig } from "./AdminLayoutConfig";
import StartQuery from "@/pages/player/pages/csr/StartQuery";
import ChatBox from "@/pages/player/pages/csr/ChatBox";
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <InnerRoutes />
    </BrowserRouter>
  );
};

const InnerRoutes = () => {
  const effectiveType = useEffectiveType();

  const filteredSettingsRoutes = SettingsLayoutConfig().filter(
    (item) => (item.type ?? "player") === effectiveType
  );

  return (
    <Routes>
      {/* ADMIN ROUTES */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/admin" element={<AdminLayout />}>
          {AdminLayoutConfig.map(({ path, element, subRoutes }) =>
            subRoutes ? (
              subRoutes.map(({ path: subPath, element: subElement }) => (
                <Route key={subPath} path={subPath} element={subElement} />
              ))
            ) : (
              <Route key={path} path={path} element={element} />
            )
          )}
        </Route>
      </Route>
      {/* PLAYER ROUTES */}
      <Route path="/player">
        <Route element={<PlayerLayout />}>
          <Route index element={<PlayerPage />} />
          <Route path="games" element={<GamePage />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["player", "admin"]} />}>
          <Route element={<SettingsLayout />}>
            {filteredSettingsRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Route>
          <Route element={<WalletLayout />}>
            <Route path="wallet" element={<Wallet />} />
          </Route>
          <Route path="start-support" element={<StartQuery />} />
          <Route path="start-support/chat" element={<ChatBox />} />
          <Route path="dos-letra" element={<DosLetra />} />
        </Route>
      </Route>
      {/* CSR ROUTES */}
      <Route element={<ProtectedRoute allowedRoles={["csr", "admin"]} />}>
        <Route path="/csr">
          <Route element={<CsrLayout />}>
            <Route index element={<Csr />} />
            <Route path="attendance" element={<CsrAttendance />} />
          </Route>
        </Route>
      </Route>
      {/* GAME SITE ROUTES */}
      <Route path="/game-site">
        <Route path="login" element={<Login />} />
        <Route path="dos-letra" element={<GameSiteDosLetra />} />
        <Route path="home" element={<GameSiteHomePage />} />
        <Route path="bet-transactions" element={<BetTransactions />} />
      </Route>
      {/* OPERATOR ROUTES */}
      <Route element={<ProtectedRoute allowedRoles={["operator", "admin"]} />}>
        <Route path="/operator">
          <Route index element={<OperatorPage />} />
          <Route path="wallet" element={<OperatorWallet />} />
        </Route>
        <Route element={<OperatorWalletLayout />}>
          {OperatorWalletLayoutConfig.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
        <Route element={<SettingsLayout />}>
          {filteredSettingsRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
      </Route>
      {/* MODERATOR ROUTES */}
      <Route element={<ProtectedRoute allowedRoles={["moderator", "admin"]} />}>
        <Route path="/moderator">
          <Route element={<ModeratorLayout />}>
            <Route index element={<ModeratorPage />} />
          </Route>
          <Route path=":id" element={<HostDashboard />} />
        </Route>
      </Route>
      {/* HOST ROUTES */}
      <Route element={<ProtectedRoute allowedRoles={["host"]} />}>
        <Route path="/host">
          <Route element={<ModeratorLayout />}>
            {/* <Route index element={<HostPage />} /> */}
          </Route>
          <Route path=":id" element={<HostDashboard />} />
        </Route>
      </Route>
      {/* AUTH ROUTES */}
      <Route element={<AuthLayout />}>
        {AuthLayoutConfig.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Route>
      {/* DEFAULT */}
      <Route path="*" element={<Navigate to={`/${effectiveType}`} replace />} />
    </Routes>
  );
};

export default AppRoutes;
