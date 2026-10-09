 
import { createPortal } from "react-dom";

type Props = {
  isOpen: boolean;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
};

const sizeMap = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-2xl",
  xxl: "max-w-9xl"
};

const Modal = ({ isOpen, children, size = "md" }: Props) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A1A1ABF] backdrop-blur-sm">
      <div
        className={`bg-white ${sizeMap[size]} rounded-xl shadow-lg p-6 relative`}
      >
        <div className="mb-4">{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
