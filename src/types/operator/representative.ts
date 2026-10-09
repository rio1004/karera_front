export interface Representative {
  id: string;
  name: string;
  code: string;
  date: string;
  time: string;
  amount: number;
  status: string;
}

export interface Player {
  id: string;
  name: string;
  username: string;
  phone: string;
  amount: number;
  timestamp: string;
  status: 'PLAYER';
}

export interface Transaction {
  transactionNo: string;
  transactionDate: string;
  gameId: string;
  bet: string;
  betAmount: number;
  operatorCommission: number;
  franchiseTax: number;
  netOperatorCommission: number;
}

export interface CommissionData {
  total: number;
  lastUpdated: string;
  operatorCommission: number;
  representativeCommission: number;
}

export type ViewType = 'list' | 'detail';