export interface BaseCodeObject {
  [key: string]: any;
}

export interface TransactionFilters {
  userId: string;
  type?: string;
  range?: {
    startDate: string;
    endDate: string;
  };
}

export interface Transaction {
  id: string;
  userId: string;
  receiverId: string;
  gameId: string;
  type: string;
  amount: number;
  status: string;
  updatedAt: string;
}

export interface TransactionResponse {
  userId: string;
  type: string;
  range: {
    startDate: string;
    endDate: string;
  };
  totalAmount: number;
  count: number;
  transactions: Transaction[];
}

export interface GetTransactionPlayerParams {
  userId: string;
  type?: string;
  range?: {
    startDate: string;
    endDate: string;
  };
}
