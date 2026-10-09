import { useTransferMoneyStore } from "@/store/operator/useTransferMoney";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const TransferMoneyContainer = () => {
  const navigate = useNavigate();
  const { resetTransferData } = useTransferMoneyStore();

  useEffect(() => {
    resetTransferData();
    navigate('/operator/wallet/transfer-money/step-1', { replace: true });
  }, [navigate, resetTransferData]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div>Loading...</div>
    </div>
  );
};
