import { axiosInstance } from "../axiosInstance";
import { API_ENDPOINTS } from "../endpoints";
import type { BaseCodeObject } from "@/types/operator/generateCode";

export const OperatorService = {
  OpGenerateCode: async (data: BaseCodeObject): Promise<any> => {
    const res = await axiosInstance.post(
      API_ENDPOINTS.OPERATOR.OP_GENERATE_CODE,
      data
    );
    return res.data;
  },
};
