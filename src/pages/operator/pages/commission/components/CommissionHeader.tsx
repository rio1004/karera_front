import Text from "@/components/Text";
import { useOperatorStore } from "@/store/operator/useOperatorStore";
import type { CommissionData } from "@/types/operator/representative";
import { Eye, EyeClosed, EyeOff } from "lucide-react";

export const CommissionHeader: React.FC<{
  commissionData: CommissionData;
}> = ({ commissionData }) => {
  const { expandCommission, setExpandCommission } = useOperatorStore();
  return (
    <header
      className={`${!expandCommission ? "px-3 " : "bg-[#00A24A]"}  text-white`}
    >
      {expandCommission ? (
        <div>
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center text-center justify-center">
              <h1 className="text-lg">Commission Earned - Nori Santos</h1>
            </div>
            <div className="text-3xl font-bold mb-1 flex justify-center">
              <p>₱ {commissionData.total.toFixed(2)}</p>{" "}
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <Eye size={20} onClick={() => setExpandCommission(false)} />
              </button>
            </div>
            <div className="text-green-100 text-sm">
              Updated as of {commissionData.lastUpdated}
            </div>
          </div>

          <div className="bg-[#C6EBD7] rounded-[24px] p-4 translate-y-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm text-black font-medium">
                Nori Santos
              </span>
              <div className="flex gap-2 items-center">
                <p className="bg-[#F8F0AC] text-primary text-[12px] py-1 px-2 rounded-full">
                  REPRESENTATIVE
                </p>
                <p className="bg-[#fff] text-primary text-[12px] py-1 px-2 rounded-full">
                  Online
                </p>
              </div>
            </div>

            <div className="flex flex-col leading-none gap-1 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-black">Operator Commission (%)</span>
                <p className="bg-success text-white text-[16px] font-medium py-2 px-2 rounded-full">
                  {commissionData.operatorCommission}%
                </p>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-black">
                  Representative Commission (%)
                </span>
                <p className=" text-primary text-[16px] font-medium py-0 px-2 rounded-full">
                  {commissionData.representativeCommission}%
                </p>
              </div>
            </div>
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
    </header>
  );
};
