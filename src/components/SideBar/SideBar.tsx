import clsx from "clsx";
import { useEffect, useState } from "react";
import NavItem, { type NavItemProps } from "./NavItem";
import HeaderProfile from "./HeaderProfile";
import Divider from "@/components/Divider";
import { AuthService } from "@/api/services/authApi.service";
import WalletCard from "./Card";
import { useNavigate } from "react-router-dom";

type Action = {
  label: string;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
};

type SideBarBaseProps = {
  showSidebar: boolean;
  setShowSideBar: (val: boolean) => void;
  walletTitle: string;
  balance: number;
  onRefresh: () => void;
  actions: Action[];
  navItems: NavItemProps[];
};

const SideBarBase = ({
  showSidebar,
  setShowSideBar,
  walletTitle,
  balance,
  onRefresh,
  actions,
  navItems,
}: SideBarBaseProps) => {
  const [animateIn, setAnimateIn] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (showSidebar) {
      setShouldRender(true);
      setTimeout(() => setAnimateIn(true), 20);
    } else {
      setAnimateIn(false);
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [showSidebar]);

  if (!shouldRender) return null;

  const logout = async () => {
    try {
      await AuthService.logout();
      localStorage.removeItem("auth-storage");
      navigate("/auth/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div
      onClick={() => setShowSideBar(false)}
      className={clsx(
        "fixed inset-0 bg-[#1A1A1ABF] z-40 transition-opacity duration-300",
        animateIn ? "opacity-100" : "opacity-0"
      )}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={clsx(
          "fixed p-5 left-0 top-0 h-full w-[340px] bg-white shadow-lg z-50 border-l border-gray-300 transform transition-transform duration-300 ease-in-out",
          animateIn ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <HeaderProfile />
        <WalletCard
          title={walletTitle}
          balance={balance}
          onRefresh={onRefresh}
          actions={actions}
        />
        <div className="p-[20px] flex flex-col gap-5">
          {navItems.map((item) => (
            <NavItem
              icon={item.icon}
              text={item.text}
              to={item.to}
              key={item.to ?? item.text}
              status={item.status}
              submit={item.submit}
            />
          ))}
          <Divider width="217px" />
          <NavItem
            icon="/sideBarAssets/signout.png"
            text="Sign Out"
            submit={logout}
          />
        </div>
      </div>
    </div>
  );
};

export default SideBarBase;
