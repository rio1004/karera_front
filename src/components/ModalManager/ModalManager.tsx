import { createContext, useContext, useState, type ReactNode } from "react";
import Modal from "../Modal";

type ModalOptions = {
  content?: ReactNode;
  type?: "image" | "bare" | "custom";
  imgPath?: string;
  headerImage?: string;
  textContent?: string;
  textContent_2?: ReactNode;
  btnText?: string;
  multipleBtn?: boolean;
  singleBtnWidth?: string;
  hasClose?: boolean;
  hasParentBg?: boolean;
  hasContentBg?: boolean;
  hasBtn?: boolean;
  btnVariant?: any;
  modalAction?: () => void;
  submit?: () => void;
  parentStyle?: string;
  contentStyle?: string;
};

type ModalContextType = {
  open: (options: ModalOptions) => void;
  close: () => void;
};

const ModalContext = createContext<ModalContextType>({
  open: () => {},
  close: () => {},
});

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalOptions, setModalOptions] = useState<ModalOptions | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const open = (options: ModalOptions) => {
    setModalOptions(options);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setModalOptions(null);
  };

  return (
    <ModalContext.Provider value={{ open, close }}>
      {children}
      {modalOptions && (
        <Modal
          isOpen={isOpen}
          type={modalOptions.type || "bare"}
          imgPath={modalOptions.imgPath}
          headerImage={modalOptions.headerImage}
          textContent={modalOptions.textContent}
          textContent_2={modalOptions.textContent_2}
          submit={modalOptions.submit}
          btnText={modalOptions.btnText}
          multipleBtn={modalOptions.multipleBtn}
          singleBtnWidth={modalOptions.singleBtnWidth}
          hasClose={modalOptions.hasClose}
          closeModal={close}
          parentStyle={modalOptions.parentStyle}
          contentStyle={modalOptions.contentStyle}
          hasParentBg={modalOptions.hasParentBg}
          hasContentBg={modalOptions.hasContentBg}
          hasBtn={modalOptions.hasBtn}
          modalAction={close}
        >
          {modalOptions.content}
        </Modal>
      )}
    </ModalContext.Provider>
  );
};
