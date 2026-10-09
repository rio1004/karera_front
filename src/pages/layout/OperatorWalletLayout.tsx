import Divider from "@/components/Divider";
import Image from "@/components/Image";
import Text from "@/components/Text";
import { useWalletOp } from "@/hooks/operator/useOperatorWallet";
import { OperatorWalletLayoutConfig } from "@/routes/OperatorWalletLayoutConfig";
import { useOperatorWalletStore } from "@/store/operator/useWalletStore";
import { formatToPeso } from "@/utils/utils.helper";
import { ChevronLeft } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";

const OperatorWalletLayout = () => {
  const navigate = useNavigate();
  const { totalBalance } = useOperatorWalletStore();
  const { getOperatorWalletBalannce } = useWalletOp();

  const current = OperatorWalletLayoutConfig.find((page: any) =>
    location.pathname.endsWith(page.path)
  );
  return (
    <div className="min-h-screen flex flex-col">
      <div
        className={`flex items-center justify-between py-[15px] px-[20px]`}
        style={{
          background: "#00A24A",
          color: "white",
        }}
      >
        <button onClick={() => navigate(-1)} className="p-1">
          <ChevronLeft color={"white"} />
        </button>
        <img src="/icons/wallet2.png" className="w-[24px] h-[24px]" />
      </div>

      <div className="flex-1 overflow-auto relative bg-[00A24A]">
        <div className="flex flex-col">
          <div className="bg-[#00A24A] flex flex-col items-center justify-center pb-4 gap-2">
            <Text type="p1" text="Overall Balance" color="white" />
            <div className="flex justify-center items-center gap-4 pb-5">
              <Text type="h3" text={formatToPeso(totalBalance)} color="white" />
              <Image
                path="/icons/refresh.png"
                onClick={() => getOperatorWalletBalannce()}
              />
            </div>
          </div>
          <div className="bg-white rounded-t-[20px] mt-[-20px] p-5">
            <div className="flex flex-col gap-5">
              <Text
                type="h8"
                text={current?.title || ""}
                weight="bold"
                color="success"
              />
              <Divider width="100%" />
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperatorWalletLayout;
