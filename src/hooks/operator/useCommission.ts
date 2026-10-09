import { mockCommissionData, mockPlayers, mockTransactions } from "@/constant/commissionData";
import type { CommissionState } from "@/store/types/operator/commissionType";
import type { Player, ViewType } from "@/types/operator/representative";
import { useCallback, useMemo, useState } from "react";

export const useCommission = (): CommissionState => {
  const [currentView, setCurrentView] = useState<ViewType>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAmount, setShowAmount] = useState(true);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const filteredPlayers = useMemo(() => {
    return mockPlayers.filter(player =>
      player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.phone.includes(searchTerm)
    );
  }, [searchTerm]);

  const selectPlayer = useCallback((player: Player | null) => {
    setSelectedPlayer(player);
    if (player) {
      setCurrentView('detail');
    }
  }, []);

  const toggleAmountVisibility = useCallback(() => {
    setShowAmount(prev => !prev);
  }, []);

  return {
    currentView,
    searchTerm,
    showAmount,
    selectedPlayer,
    commissionData: mockCommissionData,
    players: mockPlayers,
    transactions: mockTransactions,
    setCurrentView,
    setSearchTerm,
    toggleAmountVisibility,
    selectPlayer,
    filteredPlayers
  };
};