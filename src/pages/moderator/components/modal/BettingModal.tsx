import Modal from "../../../../components/Modal";
import { CustomButton } from "../../../../components/Button";

interface BettingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStart: () => void;
}

const BettingModal = ({ isOpen, onClose, onStart }: BettingModalProps) => {
  const handleSubmit = () => {
    onStart();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      type="bare"
      textContent="Start the 60-second betting time?"
      hasClose
      closeModal={handleCancel}
      multipleBtn
    >
      <div className="flex gap-4 justify-center">
        <CustomButton
          bgColor="#FFD700"
          text="Yes"
          submit={handleSubmit}
          width="120px"
        />
        <CustomButton
          bgColor="#ccc"
          text="Cancel"
          submit={handleCancel}
          width="120px"
        />
      </div>
    </Modal>
  );
};

export default BettingModal;
