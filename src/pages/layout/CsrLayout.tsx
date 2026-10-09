import { ICONS } from "@/constant/image";
import { Outlet } from "react-router-dom";

const mockAgents = {
  name: "CS Princess",
  userId: "00639052-a5b5-3123216",
  avatar: "https://i.pravatar.cc/64?img=5",
};

const CsrLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center gap-3 bg-red-700 text-white px-5 py-3">
        <img
          src={mockAgents.avatar}
          alt="agent"
          className="w-[76px] h-[76px] rounded-full"
        />
        <div className="flex-1">
          <div className="font-bold text-[36px]">{mockAgents.name}</div>
          <div className="text-[11px] opacity-80 text-[24px]">
            User ID: {mockAgents.userId}
          </div>
        </div>
        <div className="px-2 py-1 bg-white/10 rounded-lg">
          <img src={ICONS.hamburger.src} alt="" className="h-[65px]" />
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default CsrLayout;
