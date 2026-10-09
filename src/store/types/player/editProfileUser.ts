export interface EditProfileState {
  open: boolean;
  showCamera: boolean;
  capturedImage: string | null;
  showSuccess: boolean;
  savedPhoto: string | null;
  facingMode: "user" | "environment";
  setOpen: (open: boolean) => void;
  setShowCamera: (show: boolean) => void;
  setCapturedImage: (image: string | null) => void;
  setShowSuccess: (show: boolean) => void;
  setSavedPhoto: (photo: string | null) => void;
  toggleFacingMode: () => void;
  resetCamera: () => void;
}