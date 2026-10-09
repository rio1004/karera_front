import { create } from "zustand";
import type { AttendanceStoreType } from "../types/csr/attendance";
import type { AttendanceRecord } from "@/types/csr/csr";

export const useAttendanceStore = create<AttendanceStoreType>((set) => ({
  isCheckedIn: false,
  setIsCheckedIn: (value: boolean) => set({ isCheckedIn: value }),
  attendanceRecords: [],
  setAttendanceRecord: (value: AttendanceRecord[]) =>
    set({ attendanceRecords: value }),
  showConfirmCheckout: false,
  setShowConfirmCheckout: (value: boolean) =>
    set({ showConfirmCheckout: value }),
}));
