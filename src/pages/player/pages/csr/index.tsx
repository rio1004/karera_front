import { UI_COLORS } from "@/constant/colors";

const PlayerCSR = () => {
  return (
    <div className="flex flex-col justify-center items-center rounded-[15px] ">
      <img src="/playerCsr/customerBadge.png" className="h-[151px]" />

      <div className="text-white border p-5 w-full flex flex-col rounded-[15px] gap-4">
        <p className="text-black">For concerns or report an issue:</p>
        <div
          style={{ background: UI_COLORS.LINEAR.yellow }}
          className="flex justify-between p-4 rounded-[15px]"
        >
          <div className="flex gap-1">
            <img src="/icons/csr-24.png" alt="" className="h-[24px]" />
            <div>
              <p className="font-semibold">Live Chat Support</p>
              <p>Available 24/7</p>
            </div>
          </div>
          <div className="self-center">
            <img src="/icons/left-rounded.png" alt="" className="h-[27px]" />
          </div>
        </div>
        <div
          style={{ background: UI_COLORS.LINEAR.light_blue }}
          className="flex justify-between p-4 rounded-[15px]"
        >
          <div className="flex gap-1">
            <img src="/icons/email-white.png" alt="" className="h-[24px]" />
            <div>
              <p className="font-semibold">Live Chat Support</p>
              <p>support@karera.live</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerCSR;
