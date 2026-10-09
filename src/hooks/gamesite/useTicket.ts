import { TicketService } from "@/api/services/ticketAPI.service";
import { useMainStore } from "@/store/game-site/useMainStore";
import type { TicketPayload, TicketResponse } from "@/types";
import { useState } from "react";
import { toast } from "sonner";
export const useTicket = () => {
  const { setShowPrintReceipt, setTicketData } = useMainStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const hanldeCreateTicket = async (payload: TicketPayload) => {
    setIsLoading(true);
    try {
      const res: TicketResponse = await TicketService.createTicket(payload);
      if (res) {
        setShowPrintReceipt(true);
        setTicketData(res.ticket);
      }
    } catch (error: any) {
      toast(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, hanldeCreateTicket };
};
