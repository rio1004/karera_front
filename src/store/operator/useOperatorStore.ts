import { create } from "zustand";
import type { OperatorType } from "../types/operator/operatorType";

export const useOperatorStore = create<OperatorType>((set) => ({
  expandCommission: false,
  setExpandCommission: (value: boolean) => set({ expandCommission: value }),
}));
