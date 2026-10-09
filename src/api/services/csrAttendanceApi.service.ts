import { axiosInstance } from "../axiosInstance";
import { API_ENDPOINTS } from "../endpoints";
import type {
  AttendanceResponse,
  CheckedInOutPayload,
  CheckedInOutResponse,
} from "@/types/csr/csr";

export const CsrAttendanceServices = {
  checkInOut: async (
    data: CheckedInOutPayload
  ): Promise<CheckedInOutResponse> => {
    const res = await axiosInstance.post(API_ENDPOINTS.CSR.CREATE, data);
    return res.data;
  },
  getAttendanceById: async (userId: string): Promise<AttendanceResponse> => {
    const res = await axiosInstance.get(API_ENDPOINTS.CSR.GET_BY_ID(userId));
    return res.data;
  },
};
