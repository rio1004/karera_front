

import { OperatorService } from '@/api/services/operatorApi.service';
import type { BaseCodeObject } from '@/types/operator/generateCode';
import { create } from 'zustand';

interface GenerateCodeState {
  formData: BaseCodeObject;
  isLoading: boolean;
  error: string | null;
  generatedCode: any | null;
  
  // Actions
  updateFormData: (data: Partial<BaseCodeObject>) => void;
  resetForm: () => void;
  generateCode: () => Promise<void>;
  clearError: () => void;
  clearGeneratedCode: () => void;
}

const initialFormData: BaseCodeObject = {
  pctOperator: 0,
  pctRep1: 0,
  pctRep2: 0,
  codeType: "player" 
};

export const useGenerateCodeStore = create<GenerateCodeState>((set, get) => ({
  // Initial state
  formData: initialFormData,
  isLoading: false,
  error: null,
  generatedCode: null,

  // Actions
  updateFormData: (data) => {
    set((state) => ({
      formData: { ...state.formData, ...data }
    }));
  },

  resetForm: () => {
    set({
      formData: initialFormData,
      error: null,
      generatedCode: null
    });
  },

  generateCode: async () => {
    const { formData } = get();
    
    set({ isLoading: true, error: null });
    
    try {
      const response = await OperatorService.OpGenerateCode(formData);
      set({ 
        generatedCode: response,
        isLoading: false 
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred while generating code';
      set({ 
        error: errorMessage,
        isLoading: false 
      });
    }
  },

  clearError: () => {
    set({ error: null });
  },

  clearGeneratedCode: () => {
    set({ generatedCode: null });
  }
}));