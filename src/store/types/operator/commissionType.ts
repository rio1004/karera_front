import type {
  CommissionData,
  Player,
  Transaction,
  ViewType,
} from "@/types/operator/representative";

export interface CommissionState {
  // UI State
  currentView: ViewType;
  searchTerm: string;
  showAmount: boolean;
  selectedPlayer: Player | null;

  // Data
  commissionData: CommissionData;
  players: Player[];
  transactions: Transaction[];

  // Actions
  setCurrentView: (view: ViewType) => void;
  setSearchTerm: (term: string) => void;
  toggleAmountVisibility: () => void;
  selectPlayer: (player: Player | null) => void;

  // Computed
  filteredPlayers: Player[];
}
