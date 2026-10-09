import Text from "@/components/Text";
import Circle from "@/pages/operator/components/Circle";
import { MoveUp, Plus } from "lucide-react";

export const StatsCard = () => {
  return (
    <div>
      <div className="grid grid-cols-5 grid-rows-5 gap-2">
        <div className="col-start-1 col-span-3 row-start-1 row-span-5 bg-[#F5F9FF] rounded-[15px] p-4 flex justify-center items-center flex-col gap-3">
          <Circle active={200} borderColor="#1DD5E6" total={340} />
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1 leading-0 text-[12px]">
              <div className="rounded-full bg-gradient-to-b from-[#1DD5E6] to-[#46AEF7] w-[12px] h-[12px]"></div>
              <p className=" ">3</p>
              <p>Active</p>
            </div>
            <div className="flex items-center gap-1 leading-0 text-[12px]">
              <div className="rounded-full bg-[#DBDBDC] w-[12px] h-[12px]"></div>
              <p className=" ">0</p>
              <p>Inactive</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-2 items-start col-start-4 col-span-22 row-start-1 row-span-3 bg-[#F5F9FF] rounded-[15px] p-4">
          <div className="flex items-center justify-start text-left">
            <MoveUp color="#00A24A" strokeWidth={3} />
            <Text text="3" type="h5" weight="medium" />
          </div>
          <Text text="Total Direct Players" type="p1" />
        </div>
        <div className="col-start-4 col-span-22 row-start-4 row-span-2 gap-1 bg-[#FFFBD6] rounded-[15px] flex flex-col items-start justify-center px-3">
          <div className="flex items-center justify-start text-left">
            <Plus strokeWidth={2} color="#00A24A" size={12} />
            <Text
              text="1 Representative"
              type="p1"
              weight="medium"
              className="!text-sm"
            />
          </div>
          <Text text="As of August 2025" type="p3" align="left" />
        </div>
      </div>
    </div>
  );
};
