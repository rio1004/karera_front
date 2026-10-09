import { useState } from "react";

// import { useNavigate } from "react-router-dom";
import { EkycServices } from "@/api/services/ekycApi.service";
import type { EkycId, EkycPayload } from "@/types/player/ekyc";
// import { popup } from "@/components/PopupManager";
import { useEKYCStore } from "@/store/player/useEKYCStore";
import type { PersonalInformationType } from "@/schema/ekycSchema";
export const useEkycHook = () => {
  const { ekycId, setEkycId } = useEKYCStore();
  // const navigate = useNavigate();

  // const createEkyc = async (payload: EkycPayload) => {
  //   setIsLoading(true);
  //   try {
  //     const res = await EkycServices.createEkyc(payload);
  //     if (res.result) {
  //       setEkycId(res.result.id);
  //       navigate("/player/ekyc-settings/document-type");
  //     }
  //   } catch (error: any) {
  //     popup.error(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const uploadById = async (
    images: EkycId,
    payload: PersonalInformationType
  ) => {
    const formData = new FormData();
    console.log(payload, images);
    formData.append("documentFront", images.documentFront);
    formData.append("documentBack", images.documentBack);

    Object.entries(payload).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });
    const res = await EkycServices.submitById(formData, ekycId || "");
    console.log(res);
    return res;
  };

  const uploadBySelfie = async (payload: { selfie: File }) => {
    const formData = new FormData();
    formData.append("selfie", payload.selfie);
    const res = await EkycServices.submitBySelfie(formData, ekycId || "");
    console.log(res);
    return res;
  };

  const getEkycById = async (id: string) => {
    const res = await EkycServices.getEkycById(id);
    return res;
  };

  return { uploadById, uploadBySelfie, getEkycById };
};
