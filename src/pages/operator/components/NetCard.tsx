import { ChevronRight, MoveUp } from "lucide-react";
import Circle from "./Circle";
import { useNavigate } from "react-router-dom";
import Text from "@/components/Text";

type Props = {
  label: string;
  total: number;
  active: number;
  inactive: number;
  goTo: string;
  borderColor: string;
};

const NetCard = ({
  goTo,
  active,
  inactive,
  label,
  total,
  borderColor,
}: Props) => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate(`/operator/network/${goTo}`);
  };
  return (
    <div
      className="flex items-center justify-between bg-blue-50 rounded-xl p-4 mb-2 shadow-sm"
      onClick={handleSubmit}
    >
      <div className="flex items-center">
        <Circle active={active} borderColor={borderColor} total={total} />
        <div className="ml-4 flex flex-col gap-2">
          <div className="flex items-center justify-start text-left">
            <MoveUp color="#00A24A" strokeWidth={3} />
            <Text text={total.toString()} type="h5" weight="medium" />
          </div>
          <Text text={`Total ${label}`} type="p1" weight="medium" />
          <div className="flex  gap-2">
            <div className="flex items-center gap-1 leading-0 text-[12px]">
              <div
                className={`rounded-full mb-[2px] bg-gradient-to-b ${
                  goTo === "representatives"
                    ? "from-[#1DD5E6] to-[#46AEF7]"
                    : "from-[#FFEA00] to-[#FFC600]"
                } w-[12px] h-[12px]`}
              ></div>
              <p className=" ">{active}</p>
              <p>Active</p>
            </div>
            <div className="flex items-center gap-1 leading-0 text-[12px]">
              <div className="rounded-full mb-[2px] bg-[#DBDBDC] w-[12px] h-[12px]"></div>
              <p className=" ">{inactive}</p>
              <p>Inactive</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <ChevronRight />
      </div>
    </div>
  );
};

export default NetCard;
