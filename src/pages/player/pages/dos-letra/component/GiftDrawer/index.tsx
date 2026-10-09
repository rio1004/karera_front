import { useModal } from "@/components/ModalManager/ModalManager";
import { Button } from "@/components/ui/button";
import { GIFT_ICON, ICONS } from "@/constant/image";
import CustomDrawer from "@/pages/player/components/Drawer";
import { useDosLetraStore } from "@/store/player/useDosLetraStore";
import { formatToPeso } from "@/utils/utils.helper";
import { ChevronDown } from "lucide-react";
import GiftItem from "./GiftItem";
import { useState } from "react";
import { useWalletStore } from "@/store/player/useWalletStore";
import { popup } from "@/components/PopupManager";

const giftItems = [
  { icon: GIFT_ICON.goodjob.src, label: "Good job!", amount: 5 },
  { icon: GIFT_ICON.clock.src, label: "Keep it up", amount: 20 },
  { icon: GIFT_ICON.helmet.src, label: "Kudos", amount: 50 },
  { icon: GIFT_ICON.wine.src, label: "Thank You", amount: 100 },
  { icon: GIFT_ICON.wheel.src, label: "Fabulous", amount: 100 },
  { icon: GIFT_ICON.fuel.src, label: "Awesome", amount: 100 },
  { icon: GIFT_ICON.racer.src, label: "Impressive", amount: 100 },
  { icon: GIFT_ICON.champion.src, label: "Amazing!", amount: 100 },
];

const GiftDrawer = () => {
  const { showGiftDrawer, setShowGiftDrawer, betState } = useDosLetraStore();
  const { walletBalance } = useWalletStore();
  const [selectedGift, setSelectedGift] = useState<number | null>(null);
  const [multipliers, setMultipliers] = useState<number[]>(
    giftItems.map(() => 1)
  );

  const confirmModal = useModal();
  const sentModal = useModal();

  const handlePick = (idx: number) => {
    setMultipliers((prev) => prev.map((m, i) => (i === idx ? prev[i] : 1)));
    setSelectedGift(idx);
  };

  const handleMultiply = (idx: number) => {
    if (selectedGift === idx) {
      setMultipliers((prev) => prev.map((m, i) => (i === idx ? m + 1 : m)));
    }
  };

  const handleYes = (icon: string) => {
    sentModal.open({
      type: "image",
      imgPath: icon,
      hasContentBg: false,
      hasParentBg: false,
    });
  };

  const handleSend = (amount: number, icon: string) => {
    if (betState != "Open") {
      popup.hold("Hold on—game must be open to send gifts.");
      return;
    }
    if (walletBalance < amount) {
      popup.error("Insufficient balance");
      return;
    }
    confirmModal.open({
      content: (
        <div className="flex flex-col items-center justify-center">
          <img src={icon} className="h-[120px]" />
          <p className="text-center text-[20px] font-medium">
            Are you sure you want to give{" "}
            <span className="font-bold">{formatToPeso(amount)}</span> to our
            lovely host?
          </p>
          <div className="w-full px-12 mt-5">
            <Button variant={"yellow"} onClick={() => handleYes(icon)}>
              Yes!
            </Button>
          </div>
        </div>
      ),
      type: "custom",
      parentStyle: "!p-4",
      contentStyle: "!max-w-[280px]",
    });
  };

  const totalAmount =
    selectedGift !== null
      ? giftItems[selectedGift].amount * multipliers[selectedGift]
      : 0;

  return (
    <div>
      <CustomDrawer
        setShowDrawer={setShowGiftDrawer}
        showDrawer={showGiftDrawer}
        hasBg={false}
      >
        <div className="flex bg-[#1A1A1AF2] p-4 px-5 text-white justify-between">
          <div className="flex gap-2">
            <img src={ICONS.info.src} alt="" className="w-5 h-5" />
            <p>
              Gift Amount:{" "}
              <span className="text-[#FFE400]">
                {formatToPeso(totalAmount)}
              </span>
            </p>
          </div>
          <ChevronDown color="white" size={20} />
        </div>

        <div className="bg-[#1A1A1ABF] grid grid-cols-4 gap-4 p-4">
          {giftItems.map((gift, idx) => (
            <GiftItem
              key={idx}
              icon={gift.icon}
              label={gift.label}
              amount={gift.amount}
              picked={selectedGift === idx}
              onSend={handleSend}
              multiplier={multipliers[idx]}
              onMultiply={() => handleMultiply(idx)}
              onPick={() => handlePick(idx)}
            />
          ))}
        </div>
      </CustomDrawer>
    </div>
  );
};

export default GiftDrawer;
