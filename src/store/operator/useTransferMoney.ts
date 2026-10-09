import type { TransferData } from '@/types/operator/transferMoney';
import { create } from 'zustand';

interface TransferMoneyStore {
  transferData: TransferData;
  updateTransferData: (data: Partial<TransferData>) => void;
  resetTransferData: () => void;
}

const initialState: TransferData = {
  selectedCard: null,
  amount: null,
  selectedDestination: null,
  agreeToTerms: false,
};

export const useTransferMoneyStore = create<TransferMoneyStore>((set) => ({
  transferData: initialState,
  updateTransferData: (data) =>
    set((state) => ({
      transferData: { ...state.transferData, ...data }
    })),
  resetTransferData: () =>
    set({ transferData: initialState }),
}));