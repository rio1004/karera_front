import { ICONS } from "@/constant/image";
import clsx from "clsx";
import React, { useEffect, useState } from "react";

type Props = {
  showDrawer: boolean;
  setShowDrawer: (value: boolean) => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
  hasClose?: boolean;
  hasBg?: boolean;
};

const CustomDrawer = ({
  setShowDrawer,
  showDrawer,
  children,
  style,
  hasClose,
  hasBg = true,
}: Props) => {
  const [animateIn, setAnimateIn] = useState<boolean>(false);
  const [shouldRender, setShouldRender] = useState<boolean>(false);

  useEffect(() => {
    if (showDrawer) {
      setShouldRender(true);
      setTimeout(() => setAnimateIn(true), 20);
    } else {
      setAnimateIn(false);
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [showDrawer]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowDrawer(false);
      }
    };
    if (showDrawer) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showDrawer]);

  if (!shouldRender) return null;

  return (
    <div
      className={clsx(
        "fixed inset-0 z-40 transition-opacity duration-300 bg-black/50 ",
        animateIn ? "opacity-100" : "opacity-0"
      )}
      onClick={() => setShowDrawer(false)}
    >
      <div
        className={clsx(
          "fixed bottom-0 left-0 w-full max-h-[80vh]  shadow-lg z-50 rounded-t-[25px] transform transition-transform duration-300 ease-in-out",
          animateIn ? "translate-y-0" : "translate-y-full",
          hasBg ? "bg-white" : ""
        )}
        onClick={(e) => e.stopPropagation()}
        style={style}
      >
        <div className="relative">
          {hasClose && (
            <div
              className="absolute focus:outline-none top-[20px] right-[20px] z-1"
              onClick={() => setShowDrawer(false)}
            >
              <img
                src={ICONS.close_black.src}
                alt="close"
                className="h-[15px] object-contain cursor-pointer"
              />
            </div>
          )}
        </div>

        {children}
      </div>
    </div>
  );
};

export default CustomDrawer;
