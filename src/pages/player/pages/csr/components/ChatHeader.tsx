import Text from "@/components/Text";
import { UI_COLORS } from "@/constant/colors";
import { ICONS } from "@/constant/image";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ChatHeader = () => {
  const navigate = useNavigate();

  return (
    <div
      className={`flex items-center justify-between py-[15px] px-[20px] relative`}
      style={{
        background: UI_COLORS.LINEAR.yellow,
        borderBottom: "1px solid #C4C4C4",
      }}
    >
      <div className="flex">
        <button onClick={() => navigate(-1)} className="p-1">
          <ChevronLeft color={"#fff"} />
        </button>
        <div className="flex gap-1">
          <img
            src={ICONS.csrProfile.src}
            alt=""
            className="h-[35px] object-contain"
          />
          <div className="flex flex-col justify-center">
            <Text type="p1" text={"CS Princess"} color={"#000"} align="left" />
            <Text
              type="p2"
              text={"Ticket ID: WC0821202487-X121"}
              color={"#000"}
              align="left"
            />
          </div>
        </div>
      </div>

      <img src="/icons/csr-message.png" className="w-5 h-5 object-contain" />
    </div>
  );
};

export default ChatHeader;
