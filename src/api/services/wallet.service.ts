import type {
  BalanceResponse,
  TransactionResponse,
  TransactionPayload,
  PinPayload,
  PinResponse,
  PinStatusResponse,
  DepositIcorePayload,
  IcoreDepositResponse,
  WithdrawIcorePayload,
} from "../../types/player/wallet";
import { axiosInstance } from "../axiosInstance";
import { API_ENDPOINTS } from "../endpoints";

export const WalletServices = {
  getBalance: async (): Promise<BalanceResponse> => {
    const res = await axiosInstance.get(API_ENDPOINTS.WALLET.BALANCE);
    return res.data;
  },
  checkPinStatus: async (): Promise<PinStatusResponse> => {
    const res = await axiosInstance.get(API_ENDPOINTS.WALLET.ACTIVE_PIN);
    return res.data;
  },

  deposit: async (
    payload: TransactionPayload
  ): Promise<TransactionResponse> => {
    const res = await axiosInstance.post(
      API_ENDPOINTS.WALLET.DEPOSIT("default"),
      {
        amount: payload.amount,
      }
    );
    return res.data;
  },

  depositIcore: async (
    payload: DepositIcorePayload,
    userData?: any
  ): Promise<IcoreDepositResponse> => {
    const res = await axiosInstance.post(
      API_ENDPOINTS.WALLET.DEPOSIT("icore"),
      {
        amount: payload.amount,
        fullName: payload.fullName || userData?.fullName || "",
        email: payload.email || userData?.email || "",
        phoneNumber: payload.phoneNumber || userData?.phoneNumber || "",
        address: payload.address || userData?.address || "",
        remark: payload.remark || "Deposit via iCore",
      }
    );
    return res.data;
  },

  depositByMode: async (
    modeOfPayment: string,
    payload: TransactionPayload | DepositIcorePayload,
    userData?: any
  ): Promise<TransactionResponse> => {
    let requestBody;

    if (modeOfPayment === "icore") {
      const icorePayload = payload as DepositIcorePayload;
      requestBody = {
        amount: icorePayload.amount,
        fullName: icorePayload.fullName || userData?.fullName || "",
        email: icorePayload.email || userData?.email || "",
        phoneNumber: icorePayload.phoneNumber || userData?.phoneNumber || "",
        address: icorePayload.address || userData?.address || "",
        remark: icorePayload.remark || "Deposit via iCore",
      };
    } else {
      requestBody = {
        amount: payload.amount,
      };
    }

    const res = await axiosInstance.post(
      API_ENDPOINTS.WALLET.DEPOSIT(modeOfPayment),
      requestBody
    );
    return res.data;
  },

  withdraw: async (
    payload: TransactionPayload
  ): Promise<TransactionResponse> => {
    const res = await axiosInstance.post(API_ENDPOINTS.WALLET.WITHDRAW, {
      amount: payload.amount,
    });
    return res.data;
  },

  withdraw_icore: async (
    payload: WithdrawIcorePayload
  ): Promise<any> => {
    const res = await axiosInstance.post(API_ENDPOINTS.WALLET.WITHDRAW_ICORE, payload);
    return res.data;
  },

  
  createWalletPin: async (payload: PinPayload): Promise<PinResponse> => {
    const res = await axiosInstance.post(API_ENDPOINTS.WALLET.CREATE_PIN, {
      pin: payload.pin,
    });
    return res.data;
  },
  updateWalletPin: async (payload: PinPayload): Promise<PinResponse> => {
    const res = await axiosInstance.patch(API_ENDPOINTS.WALLET.CHANGE_PIN, {
      pin: payload.pin,
    });
    return res.data;
  },
  verifyWalletPin: async (payload: PinPayload): Promise<PinResponse> => {
    const res = await axiosInstance.post(API_ENDPOINTS.WALLET.VERIFY_PIN, {
      pin: payload.pin,
    });
    return res.data;
  },
};
