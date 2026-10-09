import { FormProvider, useForm } from "react-hook-form";
import { Button } from "../../../../../components/ui/button";
import TermsAndCondition from "./TermsAndCondition";
import WalletDrawer from "../WalletDrawer/WalletDrawer";
import InputField from "../../../components/Input";

import { creditAmounts, depositPaymentMethods } from "@/constant/wallet";
import PaymentMethod from "./PaymentMethod";
import { useWalletStore } from "../../../../../store/player/useWalletStore";

type FormValues = {
  amount: number;
  agreeToTerms?: boolean;
  modeOfPayment?: string;
  phoneNo?: number;
};
const DepositForm = () => {
  const { setShowDrawer, setShowGenerateQR } = useWalletStore();

  const methods = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      amount: 0,
      agreeToTerms: false,
      modeOfPayment: "",
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = methods;

  const depositAmount = watch("amount");

  const onSubmit = () => {
    setShowGenerateQR(false);
    setShowDrawer(true);
  };


  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pb-5">
        <input
          type="hidden"
          {...register("modeOfPayment", {
            required: "Please select a payment method",
          })}
        />

        <label className="block text-md text-gray-800 mb-3">
          Payment Method
        </label>
        <PaymentMethod
          paymentMethods={depositPaymentMethods}
          setValue={setValue}
          watch={watch}
          watchValue="modeOfPayment"
        />

        <label className="block text-md text-gray-800 mb-3">
          Deposit Amount
        </label>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {creditAmounts.map((amount: number) => (
            <button
              key={amount}
              type="button"
              className={`border border-gray-300 rounded-lg py-3 px-4 text-sm font-medium transition-colors ${
                depositAmount === amount
                  ? "bg-[#00A24A] text-white border-[#00A24A]"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() =>
                setValue("amount", amount, { shouldValidate: true })
              }
            >
              {amount}
            </button>
          ))}
        </div>

        <InputField
          value={depositAmount}
          register={register("amount", {
            required: true,
            valueAsNumber: true,
            min: 500,
          })}
          error={errors.amount}
          errorMsg="Minimum deposit amount is ₱500 (for first time deposit)"
          variant="currency"
          fieldName="creditAmount"
          placeholder="₱ 500 minimum"
        />

        <Button
          variant={isValid ? "green" : "disable"}
          disabled={!isValid}
          type="submit"
        >
          Deposit
        </Button>

        <TermsAndCondition />
        <WalletDrawer amount={depositAmount} type="Deposit" />
      </form>
    </FormProvider>
  );
};

export default DepositForm;
