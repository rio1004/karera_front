import Text from "@/components/Text";
import { useOperatorStore } from "@/store/operator/useOperatorStore";
import { formatToPeso } from "@/utils/utils.helper";
import { Eye, EyeClosed } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CommissionCard = ({
  amount,
  label,
}: {
  amount: number;
  label: string;
}) => (
  <div className="bg-[#FFFDE9] rounded-lg p-4 shadow-lg items-center text-center">
    <div className="text-green-600 text-xl font-bold">
      {formatToPeso(amount)}
    </div>
    <div className="text-gray-700 text-[10px] mt-1">{label}</div>
  </div>
);

const MainHeader = () => {
  const { setExpandCommission, expandCommission } = useOperatorStore();

  return (
    <div className={`${!expandCommission ? "px-3" : ""}`}>
      {expandCommission ? (
        <div className="relative bg-success p-10 pb-20 rounded-b-[40px] flex flex-col gap-3">
          <Text type="p1" text="Commission Balance" color="white" />
          <div className="flex justify-center items-center">
            <Text
              type="h5"
              text={formatToPeso(1200)}
              color="white"
              weight="medium"
            />
            <Eye
              color="#fff"
              className="ml-2"
              onClick={() => setExpandCommission(false)}
            />
          </div>

          <Text type="p1" text="Updated as of April 30, 2025" color="white" />

          <div className="absolute w-full left-0 -bottom-8 flex items-center justify-center gap-5">
            <CommissionCard amount={1290} label="Monthly Credits Received" />
            <CommissionCard amount={800} label="Monthly Credits Sent" />
          </div>
        </div>
      ) : (
        <div
          className="relative bg-success py-3 px-5 justify-between items-center rounded-[10px] flex gap-3 cursor-pointer"
          onClick={() => setExpandCommission(true)}
        >
          <Text type="p1" text="Total Commissions" color="white" />
          <EyeClosed color="#fff" />
        </div>
      )}
    </div>
  );
};

export default MainHeader;
