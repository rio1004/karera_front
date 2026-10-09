import { X } from "lucide-react";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { UI_COLORS } from "@/constant/colors";
import Image from "@/components/Gamesites/Image";
import Text from "@/components/Gamesites/Text";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  username: string;
  userId: string;
};

const Sidebar = ({ isOpen, onClose, username, userId }: SidebarProps) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setTimeout(() => setAnimateIn(true), 20);
    } else {
      setAnimateIn(false);
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <>
      <div
        onClick={onClose}
        className={clsx(
          "fixed inset-0 bg-[#1A1A1ABF] z-40 transition-opacity duration-300",
          animateIn ? "opacity-100" : "opacity-0"
        )}
      />

      <div
        className={clsx(
          "fixed left-0 top-0 h-full w-[300px] bg-white shadow-lg z-50 border-r border-gray-300 transform transition-transform duration-300 ease-in-out", // Changed to left-0 and border-r
          animateIn ? "translate-x-0" : "-translate-x-full" 
        )}
      >
        <div
          className="text-white p-[22px] flex justify-between items-start"
          style={{ background: UI_COLORS.PLAIN.btnGreen }}
        >
          <div>
            <h2 className="text-lg font-semibold">{username}</h2>
            <p className="text-sm opacity-80">ID: {userId}</p>
          </div>
          <button onClick={onClose} className="text-white text-xl">
            <X />
          </button>
        </div>

        <div className="p-4 space-y-6">
          <div>
            <Text
              text="Cashier"
              color="#0E9F68"
              type="p1"
              weight="medium"
              align="start"
            />
            <div className="space-y-2">
              <button className="w-full flex items-center gap-3 p-2 rounded hover:bg-gray-100">
                <Image
                  path="/icons/give_money.png"
                  style={{ height: "25px" }}
                />
                <Text text="Cashier (Walk-In)" type="h8" color="#595959" />
              </button>
              <button className="w-full flex items-center gap-3 p-2 rounded hover:bg-gray-100">
                <Image
                  path="/icons/mobile_money.png"
                  style={{ height: "25px" }}
                />
                <Text text="Cashier (Terminals)" type="h8" color="#595959" />
              </button>
            </div>
          </div>

          <div>
            <Text
              text="Betting"
              color="#0E9F68"
              type="p1"
              weight="medium"
              align="start"
            />
            <div>
              <button className="w-full flex items-center gap-3 p-2 rounded hover:bg-gray-100">
                <Image
                  path="/icons/token_money.png"
                  style={{ height: "25px" }}
                />
                <Text text="Betting (Walk-In)" type="h8" color="#595959" />
              </button>
            </div>
          </div>

          <div className="pt-4 border-t">
            <button className="w-full flex items-center gap-3 p-2 rounded text-red-600 hover:bg-gray-100">
              <Image path="/icons/sign_out.png" style={{ height: "25px" }} />
              <Text text="Sign Out" type="h8" color="#595959" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
