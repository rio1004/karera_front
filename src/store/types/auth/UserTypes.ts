import type { Role } from "@/constant/roles";

export type User = {
  id: string | number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  mobile: string;
  type: Role;
  createdAt: string;
  updatedAt: string;
  status: string;
};

export interface UserState {
  users: User[];
  usersData: User[];
  userCurrentPage: number;
  userRowsPerPage: number;

  isLoading: boolean;
  total: number;
  limit: number;
  offset: number;

  typeFilter: string;

  fetchUsers: () => Promise<void>;
  setTypeFilter: (type: string) => void;
  setPage: (page: number) => void;

  setUsersData: (data: User[]) => void;
  setUserCurrentPage: (page: number) => void;
  setUserRowsPerPage: (rows: number) => void;
}
