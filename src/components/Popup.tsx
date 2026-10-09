import { ICONS } from "@/constant/image";

type IconType = { src: string; alt?: string };
type Props = {
  isOpen: boolean;
  onClose?: () => void;
  text: string;
  icon?: string;
  type: "error" | "info" | "success" | "hold";
};

const icons: Record<"error" | "info" | "success" | "hold", IconType> = {
  error: ICONS.error_icon,
  info: ICONS.info,
  success: ICONS.success_icon,
  hold: ICONS.hold_icon,
};

const Popup = ({ isOpen, onClose, text, icon, type }: Props) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A1A1ABF]"
      onClick={onClose}
    >
      <div className="bg-white rounded-[25px] shadow-lg px-4 py-3 max-w-[268px] text-center">
        <div className="flex items-center justify- gap-2">
          <img
            src={typeof icon === "string" ? icon : icons[type].src}
            alt={icons[type].alt || "icon"}
            className="h-[40px] object-contain"
          />
          <p className="text-[#5B5B5B] text-lg font-medium">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default Popup;
