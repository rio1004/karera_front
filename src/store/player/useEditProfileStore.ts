import { create } from "zustand";
import type { EditProfileState } from "../types/player/editProfileUser";


export const useEditProfileStore = create<EditProfileState>((set) => ({
  open: false,
  showCamera: false,
  capturedImage: null,
  showSuccess: false,
  savedPhoto: null,
  facingMode: "user",

  setOpen: (open: boolean) => set({ open }),
  setShowCamera: (show) => set({ showCamera: show }),
  setCapturedImage: (image) => set({ capturedImage: image }),
  setShowSuccess: (show) => set({ showSuccess: show }),
  setSavedPhoto: (photo) => set({ savedPhoto: photo }),
  
  toggleFacingMode: () =>
    set((state) => ({
      facingMode: state.facingMode === "user" ? "environment" : "user",
    })),
  
  resetCamera: () => set({ capturedImage: null }),
}));


interface ProfileData {
  userId: string;
  nickname: string;
  firstName: string;
  lastName: string;
  birthdate: string;
}

interface ProfileState {
  showSuccess: boolean;
  isLoading: boolean;
  setShowSuccess: (show: boolean) => void;
  setLoading: (loading: boolean) => void;
  updateProfile: (data: ProfileData) => Promise<void>;
}

export const useProfileStore = create<ProfileState>((set, get) => ({
  showSuccess: false,
  isLoading: false,

  setShowSuccess: (show) =>
    set(() => ({ showSuccess: show })),

  setLoading: (loading) =>
    set(() => ({ isLoading: loading })),

  updateProfile: async () => {
    const { setLoading, setShowSuccess } = get();
    
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to update profile:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }
}));