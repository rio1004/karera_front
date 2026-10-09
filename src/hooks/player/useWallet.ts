import { useState } from "react";
import type {
  BalanceResponse,
  PinPayload,
  PinResponse,
  PinStatusResponse,
  TransactionPayload,
  TransactionResponse,
  WithdrawIcorePayload,
} from "../../types/player/wallet";
import { useWalletStore } from "../../store/player/useWalletStore";
import { WalletServices } from "@/api/services/wallet.service";
import { popup } from "@/components/PopupManager";
export const useWallet = () => {
  const {
    setWalletBalance,
    setIswithdrawalSuccess,
    setIsWithdrawSubmitted,
    setShowSuccessPin,
    setIsPinVerified,
    setPins,
    setHasActivePin,
    setShowSuccessUpdatePin,
  } = useWalletStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getWalletBalance = async () => {
    setIsLoading(true);
    try {
      const res: BalanceResponse = await WalletServices.getBalance();
      console.log(res);
      if (res) {
        setWalletBalance(Number(res.wallets[0].balance));
      }
    } catch (error: any) {
      popup.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const checkPinStatus = async () => {
    setIsLoading(true);
    try {
      const res: PinStatusResponse = await WalletServices.checkPinStatus();
      setHasActivePin(res.hasActivePin ?? false);
    } catch (error: any) {
      popup.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deposit = async (
    payload: TransactionPayload,
    modeOfPayment: string
  ) => {
    setIsLoading(true);
    try {
      const res: TransactionResponse = await WalletServices.deposit(
        payload,
        modeOfPayment
      );
      if (res) {
        setWalletBalance(Number(res.transaction.amount));
        getWalletBalance();
        popup.success("Deposit successful");
      }
    } catch (error: any) {
      popup.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const withdraw = async (payload: TransactionPayload) => {
    setIsLoading(true);
    try {
      const res: TransactionResponse = await WalletServices.withdraw(payload);
      if (res) {
        setIswithdrawalSuccess(true);
        getWalletBalance();
        setIsWithdrawSubmitted(true);
      }
    } catch (error: any) {
      popup.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const withdraw_icore_payments = async (payload: WithdrawIcorePayload) => {
  setIsLoading(true);
  try {
    const res: any = await WalletServices.withdraw_icore(payload);
    if (res) {
      setIswithdrawalSuccess(true);
      getWalletBalance();
      setIsWithdrawSubmitted(true);
    }
  } catch (error: any) {
    const errorMessage = 
      error?.response?.data?.message || 
      error?.message || 
      'Withdrawal failed. Please try again.';
    
    popup.error(errorMessage);
    console.error('Withdrawal error:', error);
  } finally {
    setIsLoading(false);
  }
};

  const createWalletPIn = async (payload: PinPayload) => {
    setIsLoading(true);
    try {
      const res: PinResponse = await WalletServices.createWalletPin(payload);
      if (res.message) {
        setShowSuccessPin(true);
      }
    } catch (error: any) {
      popup.error(error);
    } finally {
      setIsLoading(false);
      setPins(["", "", "", ""]);
    }
  };
  const updateWalletPin = async (payload: PinPayload) => {
    setIsLoading(true);
    try {
      const res: PinResponse = await WalletServices.updateWalletPin(payload);
      if (res.message) {
        setShowSuccessUpdatePin(true);
      }
    } catch (error: any) {
      popup.error(error);
    } finally {
      setIsLoading(false);
      setPins(["", "", "", ""]);
    }
  };
  const verifyWalletPin = async (payload: PinPayload) => {
    setIsLoading(true);
    try {
      const res: PinResponse = await WalletServices.verifyWalletPin(payload);
      if (res.message) {
        setIsPinVerified(true);
      }
    } catch (error: any) {
      popup.error(error);
    } finally {
      setIsLoading(false);
      setPins(["", "", "", ""]);
    }
  };

  return {
    isLoading,
    getWalletBalance,
    deposit,
    withdraw,
    withdraw_icore_payments,
    createWalletPIn,
    updateWalletPin,
    verifyWalletPin,
    checkPinStatus,
  };
};
