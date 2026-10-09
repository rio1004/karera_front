export type BalanceType = {
  type: "game" | "commission" | "load";
  balance: string;
  totalCredits: number;
  totalDebits: number;
  transactionCount: number;
};

export type BalanceResponse = {
  message: string;
  wallets: BalanceType[];
};
export type TransactionResponse = {
  transaction: {
    id: string;
    userId: string;
    receiverId: string;
    type: "deposit" | "withdrawal" | string;
    amount: string;
    status: "completed" | "pending" | "failed" | string;
    redirectUrl?: string;
  };
};

export type IcoreDepositResponse = {
  operationId: string;
  redirectUrl: string;
};

export type TransactionPayload = {
  amount: number;
};

export type WithdrawIcorePayload = TransactionPayload & 
  Pick<DepositIcorePayload, 'fullName' | 'email' | 'phoneNumber' | 'address' | 'remark'> & {
  bankId: string,
  accountNumber: string
}
export type DepositIcorePayload = TransactionPayload & {
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  remark: string;
};

export type PinPayload = {
  pin: string;
};
export type PinResponse = {
  message?: string;
  error?: string;
};
export type PinStatusResponse = {
  hasActivePin?: boolean;
  error?: string;
};
export type GetPinResponse = {
  id: string;
  userId: string;
  balance: string;
  status: "active" | "inactive" | string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export type IcoreDeposit = {
  amount: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  remark: string;
};
