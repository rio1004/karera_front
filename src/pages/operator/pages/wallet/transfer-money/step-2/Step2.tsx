import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, type FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Text from "@/components/Text";
import FormField from "@/components/form/FormField";
import { Button } from "@/components/ui/button";
import {
  transferMoneySchema,
  type TransferMoneySchema,
} from "@/schema/operator/walletSchema";
import { useTransferMoneyStore } from "@/store/operator/useTransferMoney";
import { useOperatorWalletStore } from "@/store/operator/useWalletStore";
import SendReqWalletPinDrawer from "../../send-request-credits/SendReqWalletPinDrawer";
import { SourceWalletSection } from "../../components/SourceWallet";
import { DestinationWalletsSection } from "../../components/DestinationWallet";
import WithdrawMoneyDrawer from "../TransferMoneyDrawer";

export const TransferMoneyStep2 = () => {
  const navigate = useNavigate();
  const { transferData, updateTransferData } = useTransferMoneyStore();
  const { setShowSendDrawer } = useOperatorWalletStore();

  useEffect(() => {
    if (!transferData.selectedCard) {
      navigate("/operator/wallet/transfer-money/step-1", { replace: true });
    }
  }, [transferData.selectedCard, navigate]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    watch,
  } = useForm({
    resolver: zodResolver(transferMoneySchema),
    defaultValues: {
      amount: transferData.amount ?? undefined,
      agreeToTerms: transferData.agreeToTerms ?? false,
    },
  });

  const watchAmount = watch("amount") as TransferMoneySchema["amount"];

  const handleDestinationSelect = (cardType: string) => {
    updateTransferData({ selectedDestination: cardType });
  };

  const onSubmit = (data: { amount: number; agreeToTerms: boolean }) => {
    updateTransferData({
      amount: Number(data.amount),
      agreeToTerms: data.agreeToTerms,
    });
    setShowSendDrawer(true);
  };

  if (!transferData.selectedCard) {
    return null;
  }

  const isTransferDisabled =
    !isValid || !transferData.selectedDestination || !watchAmount;

  return (
    <div className="p-6 space-y-4">
      <SourceWalletSection selectedCard={transferData.selectedCard} />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col gap-2">
          <Text
            text="Enter transfer amount"
            type="h8"
            className="text-start flex mb-1"
          />
          <FormField
            isPeso={true}
            name="amount"
            register={register}
            placeholder="Enter amount"
            type="number"
            className="text-center py-5 text-[21px] font-medium placeholder:text-gray-400 placeholder:font-normal placeholder:text-base placeholder:text-left"
            control={control}
            errors={errors.amount as FieldError | undefined}
          />
        </div>

        {watchAmount && (
          <DestinationWalletsSection
            selectedDestination={transferData.selectedDestination}
            onDestinationSelect={handleDestinationSelect}
          />
        )}

        {/* Transfer Notice */}
        {transferData.selectedDestination && (
          <div className="text-sm text-gray-600 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <Text
              text="Important Notice"
              type="p1"
              className="font-medium text-yellow-800 mb-1"
            />
            <p className="text-yellow-700">
              Transferring request may take 1-3 minutes. For issues, please
              contact our customer service.
            </p>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="absolute bottom-0 w-full left-0 px-5 py-5 my-4 flex flex-col items-center">
          <Button
            variant="green"
            disabled={isTransferDisabled}
            type="submit"
            className="w-full"
          >
            Transfer
          </Button>
          <FormField
            name="agreeToTerms"
            register={register}
            type="terms"
            errors={errors.agreeToTerms as FieldError | undefined}
          />
        </div>

        <WithdrawMoneyDrawer />
        <SendReqWalletPinDrawer />
      </form>
    </div>
  );
};
