import { axiosInstance } from "../axiosInstance";
import { API_ENDPOINTS } from "../endpoints";
import type {
  EkycGetResponseType,
  EkycIdResponse,
  EkycPayload,
  EkycResponse,
} from "@/types/player/ekyc";

export const EkycServices = {
  createEkyc: async (data: EkycPayload): Promise<EkycResponse> => {
    const res = await axiosInstance.post(API_ENDPOINTS.EKYC.CREATE, data);
    return res.data;
  },
  submitById: async (data: FormData, id: string): Promise<EkycIdResponse> => {
    const res = await axiosInstance.post(
      API_ENDPOINTS.EKYC.UPLOAD_BY_ID(id),
      data
    );
    return res.data;
  },
  getEkycById: async (id: string): Promise<EkycGetResponseType> => {
    const res = await axiosInstance.get(
      API_ENDPOINTS.EKYC.GET_BY_PATCH_USER_ID(id)
    );
    return res.data;
  },
  submitBySelfie: async (
    data: FormData,
    id: string
  ): Promise<EkycIdResponse> => {
    const res = await axiosInstance.post(
      API_ENDPOINTS.EKYC.UPLOAD_BY_SELFIE(id),
      data
    );
    return res.data;
  },
};
