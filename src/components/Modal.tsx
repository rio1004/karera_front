import type { ReactNode } from "react";
import { Button, buttonVariants } from "./ui/button";
import type { VariantProps } from "class-variance-authority";

type Props = {
  isOpen: boolean;
  type: "image" | "bare" | "custom";
  imgPath?: string;
  children?: ReactNode;
  headerImage?: string;
  textContent?: string;
  submit?: () => void;
  btnText?: string;
  multipleBtn?: boolean;
  singleBtnWidth?: string;
  hasClose?: boolean;
  closeModal?: () => void;
  parentStyle?: string;
  contentStyle?: string;
  hasParentBg?: boolean;
  hasContentBg?: boolean;
  modalAction?: () => void;
  hasBtn?: boolean;
  textContent_2?: ReactNode;
  btnVariant?: VariantProps<typeof buttonVariants>["variant"];
};

const Modal = ({
  isOpen,
  children,
  type,
  imgPath,
  headerImage,
  textContent,
  submit,
  btnText,
  multipleBtn,
  singleBtnWidth = "175px",
  hasClose,
  closeModal,
  parentStyle = "",
  contentStyle = "",
  hasContentBg = true,
  hasParentBg = true,
  hasBtn = true,
  modalAction,
  textContent_2,
  btnVariant = "yellow",
}: Props) => {
  if (!isOpen) return null;
  const handleModalAction = () => {
    if (modalAction) modalAction();
  };
  const handleSubmit = () => {
    if (submit) submit();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        hasParentBg ? "bg-[#1A1A1ABF]" : ""
      }`}
      onClick={handleModalAction}
    >
      <div
        className={`relative rounded-[25px] p-6 ${
          hasContentBg ? "bg-white shadow-lg" : "bg-transparent shadow-none"
        } ${parentStyle}`}
        onClick={type !== "image" ? (e) => e.stopPropagation() : undefined}
      >
        {type === "custom" ? (
          <div className={`${contentStyle} max-w-[75vw]`}>
            {hasClose && (
              <div className="absolute focus:outline-none" onClick={closeModal}>
                <img
                  src="/DosLetra/close_gifting.png"
                  alt="close"
                  className="h-[15px] object-contain cursor-pointer"
                />
              </div>
            )}
            {children}
          </div>
        ) : type === "image" ? (
          <div>
            <img src={imgPath} alt="" />
          </div>
        ) : (
          <div
            className={`flex flex-col items-center gap-[26px] relative ${contentStyle}`}
          >
            {hasClose && (
              <div
                className="absolute right-0 focus:outline-none"
                onClick={closeModal}
              >
                <img
                  src="/DosLetra/close_gifting.png"
                  alt="close"
                  className="h-[15px] object-contain cursor-pointer"
                />
              </div>
            )}

            {headerImage && (
              <img
                src={headerImage}
                alt="header"
                className="h-[68px] object-contain"
              />
            )}
            {textContent && (
              <p className="text-[20px] font-medium text-center">
                {textContent}
              </p>
            )}
            {textContent_2 && (
              <p className="text-[14px] font-regular text-center -mt-[13px]">
                {textContent_2}
              </p>
            )}
            {hasBtn &&
              (multipleBtn ? (
                children
              ) : (
                <Button
                  onClick={handleSubmit}
                  variant={btnVariant}
                  style={{ width: singleBtnWidth }}
                >
                  {btnText || "Submit"}
                </Button>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
