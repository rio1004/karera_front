import type { AttendanceRecord } from "@/types/csr/csr";

export interface AttendanceStoreType {
  isCheckedIn: boolean;
  setIsCheckedIn: (value: boolean) => void;
  attendanceRecords: AttendanceRecord[];
  setAttendanceRecord: (value: AttendanceRecord[]) => void;
  showConfirmCheckout: boolean;
  setShowConfirmCheckout: (value: boolean) => void;
}
