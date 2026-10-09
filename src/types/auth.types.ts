import type { Role } from "@/constant/roles";

export type RegisterPayload = {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  mobile: string;
  password: string;
  type: Role;
  ekycTransactionId: string;
};

export type LoginPayload = {
  userNameOrEmail: string;
  password: string;
};