import clsx from "clsx";
import { useEffect, useState } from "react";

import NavItem, { type NavItemProps } from "../../../../components/SideBar/NavItem";
import { usePlayerStore } from "@/store/player/usePlayerStore";
import Divider from "@/components/Divider";
import { BANNERS, ICONS } from "@/constant/image";
import Image from "@/components/Image";

const navItems: NavItemProps[] = [
  {
    icon: "/icons/csr.png",
    text: "Customer Support",
    to: "/customer-support",
    hasArrow: false,
  },
  {
    icon: "/icons/faqs.png",
    text: "FAQs",
    to: "/player/faqs",
    hasArrow: false,
  },
  {
    icon: "/icons/lamp.png",
    text: "About Us",
    to: "/about-us",
    hasArrow: false,
  },
  {
    icon: "/icons/privacy.png",
    text: "Privacy Policy",
    to: "/Privacy Policy",
    hasArrow: false,
  },
  {
    icon: "/icons/terms.png",
    text: "Terms and Conditions",
    to: "/Terms and Conditions",
    hasArrow: false,
  },
];

const RightSideBar = () => {
  const { showRightSideBar, setShowRightSidebar } = usePlayerStore();
  const [animateIn, setAnimateIn] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  useEffect(() => {
    if (showRightSideBar) {
      setShouldRender(true);
      setTimeout(() => setAnimateIn(true), 20);
    } else {
      setAnimateIn(false);
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [showRightSideBar]);

  if (!shouldRender) return null;
  return (
    <div
      onClick={() => setShowRightSidebar(false)}
      className={clsx(
        "fixed inset-0 bg-[#1A1A1ABF] z-40 transition-opacity duration-300",
        animateIn ? "opacity-100" : "opacity-0"
      )}
    >
      <div
        className={clsx(
          "fixed p-5 right-0 top-0 h-full w-[300px] bg-white shadow-lg z-50 border-l border-gray-300 transform transition-transform duration-300 ease-in-out",
          animateIn ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="p-[20px] flex flex-col gap-5">
          <Image path={BANNERS[0].src} className="h-[102px] rounded-[10px]" />
          <NavItem
            icon={ICONS.gift.src}
            text="Promotions"
            to={"/promotions"}
            hasArrow={false}
          />
        </div>

        <Divider width="217px" />
        <div className="p-[20px] flex flex-col gap-5">
          {navItems.map((item) => (
            <NavItem
              icon={item.icon}
              text={item.text}
              to={item.to}
              hasArrow={item.hasArrow}
            />
          ))}
          <Divider width="217px" />
        </div>
      </div>
    </div>
  );
};

export default RightSideBar;
