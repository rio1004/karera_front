import { X, ChevronRight, Check, ClockFading } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Image from "@/components/Image";
import Text from "@/components/Text";

export type NavItemProps = {
  icon: string;
  text: string;
  status?: "VERIFIED" | "pending" | "DENIED" | "UNVERIFIED" | string;
  to?: string;
  hasArrow?: boolean;
  submit?: () => void;
};

const NavItem = ({
  icon,
  text,
  status,
  to,
  hasArrow = true,
  submit,
}: NavItemProps) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (to) navigate(to);
    if (submit) submit();
  };

  const getBadgeData = (status: string) => {
    switch (status) {
      case "VERIFIED":
        return {
          icon: <Check size={12} />,
          color: "bg-[#2196F3]",
          text: "Verified",
        };
      case "pending":
        return {
          icon: <ClockFading size={12} />,
          color: "bg-[#00A24A]",
          text: "Pending",
        };
      case "DENIED":
        return {
          icon: <X size={12} />,
          color: "bg-[#BD0000]",
          text: "Denied",
        };
      case "UNVERIFIED":
        return {
          icon: <X size={12} />,
          color: "bg-[#F44336]",
          text: "Unverified",
        };
      default:
        return null;
    }
  };

  const badge = status ? getBadgeData(status) : null;

  return (
    <div className="flex justify-between items-center" onClick={handleNavigate}>
      <div className="flex items-center gap-5">
        <Image path={icon} className="h-[26px] w-[24px] object-contain" />
        <Text text={text} type="p1" color="black" />
        {badge && (
          <div
            className={`flex items-center gap-1 px-2 py-[5px] rounded-[30px] text-[12px] text-white ${badge.color}`}
          >
            {badge.icon}
            <p className="leading-none">{badge.text}</p>
          </div>
        )}
      </div>
      {hasArrow && (
        <div>
          <ChevronRight size={18} color="#bfbfbf" strokeWidth={4} />
        </div>
      )}
    </div>
  );
};

export default NavItem;
