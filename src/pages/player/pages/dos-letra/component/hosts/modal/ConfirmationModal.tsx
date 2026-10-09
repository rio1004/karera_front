import { CustomButton } from "@/components/Button";
import Modal from "@/components/Modal";
import { UI_COLORS } from "@/constant/colors";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName?: string;
  userAvatar?: string | null;
  confirmText?: string;
  cancelText?: string;
  message?: string;
  action?: "like" | "unlike";
}

export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  userName,
  userAvatar,
  confirmText = "Unlike",
  cancelText = "Cancel",
  message = "Are you sure you want to perform this action?",
  action = "unlike"
}: ConfirmationModalProps) => {
  const isUnlike = confirmText === "Unlike";

  return (
    <Modal
      isOpen={isOpen}
      type="bare"
      hasParentBg={true}
      hasContentBg={true}
      multipleBtn={true}
      closeModal={onClose}
      hasClose={false}
    >
      <div
        className="flex flex-col items-center gap-4 p-6 max-w-sm mx-auto relative top-0"
      >
        {userAvatar && (
          <div className="relative mb-2">
            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-yellow-400 shadow-lg z-10 bg-white">
              <img
                src={userAvatar}
                alt={userName ? `${userName}'s avatar` : "User's avatar"}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder-avatar.jpg";
                  e.currentTarget.alt = "Placeholder user avatar";
                }}
              />
            </div>
          </div>
        )}

        <div className="text-center px-4">
          <p className="text-gray-800 font-medium text-base leading-relaxed">
            {message}
          </p>
        </div>

        {action === "unlike" && (
          <div className="flex gap-3 justify-center w-full mt-4">
            <CustomButton
              bgColor={isUnlike ? UI_COLORS.LINEAR.red : "#10b981"}
              text={confirmText}
              submit={onConfirm}
              width="120px"
              type="button"
            />
            {cancelText && (
              <CustomButton
                bgColor="#FFFFF"
                text={cancelText}
                submit={onClose}
                width="120px"
                type="button"
                style={{
                  color: "black"
                }}
              />
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};