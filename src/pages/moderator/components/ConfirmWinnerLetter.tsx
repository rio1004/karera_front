import Image from "@/components/Image";
import Modal from "@/components/Modal";
import { ICONS } from "@/constant/image";

interface Props {
  isOpen: boolean;
  letter: string | null;
  onConfirm: () => void;
  onCancel: () => void;
  closeModal?: () => void;
}

export const ConfirmWinnerLetter = ({
  isOpen,
  letter,
  onConfirm,
  onCancel,
  closeModal,
}: Props) => {
  const handleConfirm = () => {
    onConfirm();
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Modal
      isOpen={isOpen}
      type="custom"
      hasClose={false}
      hasParentBg={true}
      hasContentBg={true}
      hasBtn={false}
      parentStyle="max-w-sm w-full mx-4"
      contentStyle="flex flex-col items-center gap-6 py-8 px-6"
      modalAction={closeModal}
    >
      <Image
        path={letter === "A" ? ICONS.letterA.src : ICONS.letterB.src}
        alt={`Letter ${letter}`}
        className="w-16 h-16"
      />

      <div className="text-center">
        <p className="text-lg font-medium text-gray-800">
          Declare Letter {letter}
          <br />
          as the winning ball?
        </p>
      </div>

      <div className="flex gap-4 w-full">
        <button
          // Add id for playwright test
          id="confirm-winner-letter-button"
          onClick={handleConfirm}
          className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
        >
          DECLARE
        </button>
        <button
          onClick={handleCancel}
          className="flex-1 px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
        >
          NO
        </button>
      </div>
    </Modal>
  );
};
