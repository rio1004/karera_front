import { useState } from "react";

import type {
  AttendanceResponse,
  CheckedInOutPayload,
  CheckedInOutResponse,
} from "@/types/csr/csr";
import { CsrAttendanceServices } from "@/api/services/csrAttendanceApi.service";
import { useAttendanceStore } from "@/store/csr/useAttendanceStore";
import { useAuthStore } from "@/store/auth/useAuth";
import { popup } from "@/components/PopupManager";
export const useAttendance = () => {
  const { setIsCheckedIn, setAttendanceRecord } = useAttendanceStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const { user } = useAuthStore();

  const checkInOut = async (payload: CheckedInOutPayload) => {
    setIsLoading(true);
    try {
      const res: CheckedInOutResponse = await CsrAttendanceServices.checkInOut(
        payload
      );
      if (res.checkIn) {
        setIsCheckedIn(true);
      }
      if (res.checkOut) {
        setIsCheckedIn(false);
      }
    } catch (error: any) {
      popup.error(error);
    } finally {
      getAttendanceById();
      setIsLoading(false);
    }
  };

  const getAttendanceById = async () => {
    if (!user) return;
    setIsFetching(true);
    try {
      const res: AttendanceResponse =
        await CsrAttendanceServices.getAttendanceById(user?.id);

      if (res.records.length > 0) {
        setAttendanceRecord(res.records);
      }
    } catch (err) {
      console.error("Failed to fetch attendance:", err);
    } finally {
      setIsFetching(false);
    }
  };

  return { isLoading, checkInOut, isFetching, getAttendanceById };
};
