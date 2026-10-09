export type CheckedInOutPayload = {
  id?: string;
  userId?: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
};

export type CheckedInOutResponse = {
  id: string;
  userId: string;
  date: string;
  checkIn: string;
  checkOut: string;
  totalHours: number;
  payableHours: number;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type AttendanceRecord = {
  id: string;
  userId: string;
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  totalHours: number;
  payableHours: number;
  status: string;
  createdAt?: string;
};

export type AttendanceResponse = {
  totalRows: number;
  limit: number;
  offset: number;
  records: AttendanceRecord[];
};
