import { UI_COLORS } from "@/constant/colors";
import { ICONS, LOGIN_ASSETS } from "@/constant/image";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";

interface QueryItem {
  id: string;
  title: string;
  description: string[];
  bgColor: string;
  borderColor: string;
}

const queryData: QueryItem[] = [
  {
    id: "1",
    title: "Ano ang age requirement to play on Karera.Live?",
    description: [
      "For first-time depositors, ang required minimum deposit amount ay P500.",
      "For succeeding deposits, ang minimum deposit amount ay P100.",
      "Ang maximum deposit amount ay P50,000 per transaction.",
    ],
    bgColor: "#FFF7DB",
    borderColor: "#FFDC61",
  },
  {
    id: "2",
    title: "Ano ang minimum at maximum deposit amount?",
    description: [
      "Pumunta sa Withdraw section.",
      "Ilagay ang halaga na gusto mong i-withdraw.",
      "Hintayin ang confirmation.",
    ],
    bgColor: "#F0F0FF",
    borderColor: "#7777FF",
  },
  {
    id: "3",
    title: "Pwede bang hindi na dumaan sa eKYC process and isang player?",
    description: [
      "You can reach us via live chat.",
      "Or send us an email at support@karera.live.",
    ],
    bgColor: "#FFF7DB",
    borderColor: "#FFDC61",
  },
  {
    id: "4",
    title: "Paano laruin ang Dos Letra Karera?",
    description: [
      "You can reach us via live chat.",
      "Or send us an email at support@karera.live.",
    ],
    bgColor: "#FE8F004D",
    borderColor: "#FE8F00",
  },
  {
    id: "5",
    title: "Legit at safe ba ang Karera.Live?",
    description: [
      "You can reach us via live chat.",
      "Or send us an email at support@karera.live.",
    ],
    bgColor: "#F0F0FF",
    borderColor: "#7777FF",
  },
];

const AccordionItem = ({
  item,
  isOpen,
  onToggle,
}: {
  item: QueryItem;
  isOpen: boolean;
  onToggle: () => void;
}) => (
  <div className="flex flex-col gap-2">
    <div
      className="flex justify-between p-4 items-center rounded-[10px] cursor-pointer"
      style={{
        background: item.bgColor,
        borderLeft: `10px solid ${item.borderColor}`,
      }}
      onClick={onToggle}
    >
      <p>{item.title}</p>
      <div>
        <img
          src={isOpen ? "/icons/up-rounded.png" : "/icons/down-rounded.png"}
          alt={isOpen ? "Collapse" : "Expand"}
          className="h-[28px] object-contain self-center"
        />
      </div>
    </div>

    {isOpen && (
      <div className="p-4 flex flex-col gap-3 bg-[#F6F6F6BF] rounded-[10px] text-[14px] text-[#5B5B5B]">
        {item.description.map((desc, index) => (
          <p key={index}>{desc}</p>
        ))}
      </div>
    )}
  </div>
);

const StartQuery = () => {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenItem((prev) => (prev === id ? null : id));
  };

  return (
    <div
      style={{
        background: `url('${LOGIN_ASSETS.redBg.src}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div>
        <ChevronLeft color="white" />
      </div>

      <div className="p-5 text-white flex flex-col gap-2 justify-start items-start mt-20">
        <img src={ICONS.userProfile2.src} alt="" className="h-[45px]" />
        <p className="text-[20px]">Hi, Jode7879877987</p>
        <p className="font-semibold text-[20px]">How can we help you?</p>

        <div className="flex bg-white rounded-[15px] px-2 py-1 gap-2 items-center justify-between">
          <div className="flex gap-2 items-center text-black">
            <img src={ICONS.csrProfile.src} alt="" className="h-[36px]" />
            <div>
              <p>CS Princess</p>
              <p>I appreciate your patience. Is there...</p>
            </div>
          </div>
          <div
            style={{ background: UI_COLORS.LINEAR.green }}
            className="rounded-full text-[12px] w-[20px] h-[20px] flex items-center justify-center text-center"
          >
            2
          </div>
        </div>
      </div>
      <p className="font-medium text-white ml-4 mb-2">Get Help</p>

      <div className="bg-white px-4 py-3 rounded-t-[20px]">
        <input
          type="text"
          placeholder="Search your concern or inquiry here..."
          className="bg-[#F5F5F5] w-full p-4 rounded-[5px] mb-3"
        />

        <div className="flex flex-col gap-2 rounded-[15px]">
          {queryData.map((item) => (
            <AccordionItem
              key={item.id}
              item={item}
              isOpen={openItem === item.id}
              onToggle={() => toggleItem(item.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StartQuery;
