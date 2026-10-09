import { useState } from "react";
import Popup from "./Popup";

type PopupData = {
  text: string;
  type: "error" | "info" | "success" | "hold";
  icon?: string;
};

let showPopupFn: ((data: PopupData) => void) | null = null;
let closePopupFn: (() => void) | null = null;

export const PopupManager = () => {
  const [popup, setPopup] = useState<PopupData | null>(null);

  showPopupFn = (data: PopupData) => setPopup(data);
  closePopupFn = () => setPopup(null);

  return (
    <Popup
      isOpen={!!popup}
      text={popup?.text || ""}
      type={popup?.type || "info"}
      icon={popup?.icon}
      onClose={() => setPopup(null)}
    />
  );
};

export const popup = {
  error: (message: string) => showPopupFn?.({ text: message, type: "error" }),
  hold: (message: string) => showPopupFn?.({ text: message, type: "hold" }),
  info: (message: string) => showPopupFn?.({ text: message, type: "info" }),
  success: (message: string) =>
    showPopupFn?.({ text: message, type: "success" }),
  close: () => closePopupFn?.(),
};
