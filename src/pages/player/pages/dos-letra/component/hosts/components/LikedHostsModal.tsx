import { ConfirmationModal } from "../modal/ConfirmationModal";

interface LikedHostModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  name: string;
  image: string;
  action: "like" | "unlike";
}

export const LikedHostModal = ({ 
  open, 
  onClose, 
  onConfirm, 
  name, 
  image, 
  action 
}: LikedHostModalProps) => {
  const isLike = action === "like";

  const handleConfirm = () => {
    if (isLike) {
      onClose();
    } else {
      onConfirm?.();
    }
  };

  return (
    <ConfirmationModal
      isOpen={open}
      onClose={onClose}
      onConfirm={handleConfirm}
      userName={name}
      userAvatar={image}
      confirmText={isLike ? "Close" : "Unlike"}
      cancelText={isLike ? undefined : "Cancel"}
      message={
        isLike 
          ? `Yay! Thank you for liking our lovely host, ${name}.`
          : `Are you sure you want to unlike ${name}?`
      }
      action={action} 
    />
  );
};