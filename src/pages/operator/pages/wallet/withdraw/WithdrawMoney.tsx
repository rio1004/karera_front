import { useTransferMoneyStore } from "@/store/operator/useTransferMoney";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const WithdrawMoneyContainer = () => {
  const navigate = useNavigate();
  const { resetTransferData } = useTransferMoneyStore();

  useEffect(() => {
    resetTransferData();
    navigate('/operator/wallet/withdraw-money/step-1', { replace: true });
  }, [navigate, resetTransferData]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div>Loading...</div>
    </div>
  );
};
