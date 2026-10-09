import { useState } from "react";
import type { BalanceResponse } from "../../types/player/wallet";
import { WalletServices } from "@/api/services/wallet.service";
import { popup } from "@/components/PopupManager";
import { useOperatorWalletStore } from "@/store/operator/useWalletStore";
import { mapWallets } from "@/utils/utils.helper";
export const useWalletOp = () => {
  const { setWallets, wallets, totalBalance, setTotalBalance } =
    useOperatorWalletStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getOperatorWalletBalannce = async () => {
    setIsLoading(true);
    try {
      const res: BalanceResponse = await WalletServices.getBalance();
      console.log(res);
      if (res.wallets.length > 0) {
        const mappedWallets = mapWallets(res.wallets);
        setWallets(mappedWallets);

        const total = Object.values(mappedWallets).reduce(
          (sum, wallet) => sum + parseFloat(wallet.balance),
          0
        );
        setTotalBalance(total);
      }
      console.log(wallets);
    } catch (error: any) {
      popup.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    getOperatorWalletBalannce,
  };
};
