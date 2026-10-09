export type Transaction = {
  type: string;
  status: string;
  amount: number | string;
  updatedAt: string;
  createdAt: string;
  receiverId?: string;
  transaction_type?: string; 
};

export const TRANSACTIONS_OPERATOR = [
  {
    transaction_type: "Deduct Credits",
    amount: -5000.0,
    date_time: "04/25/2025 11:42:17",
    status: "Completed",
    transaction_id: "TXN001",
  },
  {
    transaction_type: "Send Credits",
    amount: -1000.0,
    date_time: "04/20/2025 08:00:05",
    status: "Completed",
    transaction_id: "TXN002",
  },
  {
    transaction_type: "Send Credits",
    amount: -2000.0,
    date_time: "04/15/2025 08:15:12",
    status: "Completed",
    transaction_id: "TXN003",
  },
  {
    transaction_type: "Send Credits",
    amount: -2000.0,
    date_time: "04/10/2025 09:06:23",
    status: "Completed",
    transaction_id: "TXN004",
  },
  {
    transaction_type: "Send Credits",
    amount: -5000.0,
    date_time: "04/10/2025 08:00:00",
    status: "Completed",
    transaction_id: "TXN005",
  },
  {
    transaction_type: "Load",
    amount: 50000.0,
    date_time: "04/09/2025 09:08:29",
    status: "Completed",
    transaction_id: "TXN006",
  },
  {
    transaction_type: "Send Credits",
    amount: -3500.0,
    date_time: "04/08/2025 14:22:15",
    status: "Completed",
    transaction_id: "TXN007",
  },
  {
    transaction_type: "Send Credits",
    amount: -750.0,
    date_time: "04/07/2025 16:45:30",
    status: "Completed",
    transaction_id: "TXN008",
  },
  {
    transaction_type: "Load",
    amount: 25000.0,
    date_time: "04/05/2025 10:15:45",
    status: "Completed",
    transaction_id: "TXN009",
  },
  {
    transaction_type: "Deduct Credits",
    amount: -1200.0,
    date_time: "04/04/2025 13:28:50",
    status: "Completed",
    transaction_id: "TXN010",
  },
];
