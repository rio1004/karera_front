import type { TicketPayload, TicketResponse } from "@/types";
import { axiosInstance } from "../axiosInstance";
import { API_ENDPOINTS } from "../endpoints";

export const TicketService = {
  createTicket: async (data: TicketPayload): Promise<TicketResponse> => {
    const res = await axiosInstance.post(API_ENDPOINTS.TICKET.CREATE, data);
    return res.data;
  },
};
