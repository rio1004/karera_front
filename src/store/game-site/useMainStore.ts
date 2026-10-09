import { create } from "zustand";
import type { DosLetraSlice } from "../types/game-site/dosLetraTypes";
import { createDosLetraSlice } from "./dosLetraSlice";

type MainStore = DosLetraSlice;

export const useMainStore = create<MainStore>()((...a) => ({
  ...createDosLetraSlice(...a),
}));
