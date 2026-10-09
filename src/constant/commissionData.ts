import type { CommissionData, Player, Transaction } from "@/types/operator/representative";

export const mockCommissionData: CommissionData = {
  total: 480.00,
  lastUpdated: 'April 30, 2025',
  operatorCommission: 1.25,
  representativeCommission: 1.75
};

export const mockPlayers: Player[] = [
  {
    id: '09123456789',
    name: 'Sandie Alegre',
    username: 'applepiemoo',
    phone: '09123456789',
    amount: 200.00,
    timestamp: '2025-04-25 08:15:45',
    status: 'PLAYER'
  },
  {
    id: '09169237723',
    name: 'Toni Marquez',
    username: 'sweetie123',
    phone: '09169237723',
    amount: 180.00,
    timestamp: '2025-04-22 20:50:05',
    status: 'PLAYER'
  },
  {
    id: '09103298329',
    name: 'Juan Dela Cruz',
    username: 'probinsyano1',
    phone: '09103298329',
    amount: 100.00,
    timestamp: '2025-04-20 09:00:00',
    status: 'PLAYER'
  }
];

export const mockTransactions: Transaction[] = [
  {
    transactionNo: '00021',
    transactionDate: '2025-04-25 08:15:45',
    gameId: 'Dos Letra - 250425DL00142',
    bet: 'B',
    betAmount: 200.00,
    operatorCommission: 1.75,
    franchiseTax: 5,
    netOperatorCommission: 2.38
  }
];