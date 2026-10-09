import { axiosInstance } from "@/api/axiosInstance";
import { API_ENDPOINTS } from "@/api/endpoints";
import type { GetMethodBaseQueryParams, User } from "@/types";
import type { AuditPayload, AuditResponse } from "@/types/admin/auditTrail";
import { buildParams } from "@/utils/buildParams";

export const AdminAuditTrail = {
  postAuditTrail: async (payload: AuditPayload) => {
    const res = await axiosInstance.post<{ user: User }>(
      `${API_ENDPOINTS.AUDIT_TRAIL.GET_POST_AUDITS}`,
      payload
    );
    return res.data;
  },
  getAuditTrails: async (params: GetMethodBaseQueryParams = {}) => {
    const res = await axiosInstance.get<AuditResponse>(
      `${API_ENDPOINTS.AUDIT_TRAIL.GET_POST_AUDITS}`,
      {
        params: buildParams(params),
      }
    );
    return res.data;
  },
};
