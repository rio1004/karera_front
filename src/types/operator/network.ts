export type TransactionDetails = {
  transactionNo: string;
  transactionDate: string;
  gameId: string;
  bet: string;
  betAmount: number;
  OperatorCommission: string;
  franchiseTax: string;
  netCommission: number;
  gameName: string;
};

export type NetworkItem = {
  id: string;
  name: string;
  username: string;
  mobile: string;
  date: string;
  time: string;
  amount: number;
  type?: "representative" | "player";
  transaction?: TransactionDetails;
};

export type NetworkConfig = {
  title: string;
  itemType: "Representatives" | "Players";
  totalLabel: string;
  statusColors: {
    [key: string]: string;
  };
};
