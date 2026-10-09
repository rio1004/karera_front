import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { EKYCTypes } from "../types/player/ekycTypes";

export const useEKYCStore = create<EKYCTypes>()(
  persist(
    (set) => ({
      capturedImage: "",
      setCapturedImage: (value: string) => set({ capturedImage: value }),
      frontImage: "",
      setFrontImage: (value: string) => set({ frontImage: value }),
      backImage: "",
      setBackImage: (value: string) => set({ backImage: value }),
      ekycId: "",
      setEkycId: (value: string) => set({ ekycId: value }),
      documentType: "",
      setDocumentType: (value: string) => set({ documentType: value }),
      ekycStatus: "",
      setEkycStatus: (value: string) => set({ ekycStatus: value }),
    }),
    {
      name: "ekyc-storage",
      partialize: (state) => ({
        ekycId: state.ekycId ?? "",
        frontImage: state.frontImage ?? "",
        backImage: state.backImage ?? "",
      }),
    }
  )
);
