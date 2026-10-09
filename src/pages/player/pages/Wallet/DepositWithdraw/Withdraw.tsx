// WithdrawForm.tsx
import { FormProvider, useForm } from "react-hook-form";
import PaymentMethod from "./PaymentMethod";
import InputField from "@/pages/player/components/Input";
import Text from "@/components/Text";
import { Button } from "@/components/ui/button";
import TermsAndCondition from "./TermsAndCondition";
import WalletDrawer from "../WalletDrawer/WalletDrawer";
import WalletPin from "../WalletDrawer/WalletPin/WalletPin";
import Modal from "@/components/Modal";
import Image from "@/components/Image";
import { creditAmounts, withdrawPaymentMethods } from "@/constant/wallet";
import { useWalletStore } from "@/store/player/useWalletStore";
import { popup } from "@/components/PopupManager";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWallet } from "@/hooks/player/useWallet";

type FormValues = {
  withdrawAmount: number;
  agreeToTerms?: boolean;
  modeOfPayment?: string;
  phoneNo?: number;
};

const WithdrawForm = () => {
  const [showNoPin, setShowNoPin] = useState<boolean>(false);
  const {
    setShowWalletPin,
    setIsWithdrawSubmitted,
    isWithdrawSubmitted,
    setShowDrawer,
    walletBalance,
    setShowConfirmWithdraw,
    hasActivePin,
  } = useWalletStore();
  const { checkPinStatus } = useWallet();

  const navigate = useNavigate();

  const authData = JSON.parse(localStorage.getItem("auth-storage") || "{}");
  const mobile = authData?.state?.user?.mobile;

  const methods = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      withdrawAmount: 0,
      modeOfPayment: "",
      phoneNo: mobile,
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = methods;

  const withdrawAmount = watch("withdrawAmount");

  const onSubmit = () => {
    if (walletBalance < withdrawAmount) {
      popup.error("Insufficient balance");
      return;
    }
    if (!hasActivePin) {
      setShowNoPin(true);
      return;
    }
    setShowWalletPin(true);
  };

  const handleClose = () => {
    setIsWithdrawSubmitted(false);
    setShowDrawer(false);
    setShowConfirmWithdraw(false);
  };

  const handleSubmitModal = () => {
    setShowNoPin(false);
    navigate("pin/create");
  };

  useEffect(() => {
    checkPinStatus();
  }, []);
  return (
    <FormProvider {...methods}>
      <Modal
        type="bare"
        isOpen={showNoPin}
        hasBtn={true}
        headerImage="/icons/info.png"
        textContent="You don't have an Active PIN"
        textContent_2={
          <>
            {" "}
            You can create your PIN in <br />{" "}
            <span
              className="font-medium"
              onClick={() => navigate("pin/create")}
            >
              Account &gt; Create wallet PIN
            </span>{" "}
          </>
        }
        parentStyle="w-[80vw] max-w-[300px] text-[16px] font-[regular]"
        modalAction={() => setShowNoPin(false)}
        btnVariant={"green"}
        btnText="Okay"
        submit={handleSubmitModal}
      />
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
          paymentMethods={withdrawPaymentMethods}
          setValue={setValue}
          watch={watch}
          watchValue="modeOfPayment"
          rowNo={3}
        />

        <label className="block text-md text-gray-800 mb-3">
          Withdraw Amount
        </label>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {creditAmounts.map((amount: number) => (
            <button
              key={amount}
              type="button"
              className={`border border-gray-300 rounded-lg py-3 px-4 text-sm font-medium transition-colors ${
                withdrawAmount === amount
                  ? "bg-[#00A24A] text-white border-[#00A24A]"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() =>
                setValue("withdrawAmount", amount, { shouldValidate: true })
              }
            >
              {amount}
            </button>
          ))}
        </div>
        <InputField
          value={withdrawAmount}
          register={register("withdrawAmount", {
            required: true,
            valueAsNumber: true,
            min: 500,
          })}
          error={errors.withdrawAmount}
          errorMsg="Minimum deposit amount is ₱500 (for first time deposit)"
          variant="currency"
          fieldName="creditAmount"
          placeholder="₱ 500 minimum"
        />

        <InputField
          register={register("phoneNo", { required: true })}
          fieldName="phoneNo"
          label="Account Number"
          disabled={true}
        />

        <Text
          text="Crediting of withdrawals may take 10-30 minutes. For issues, please contact our customer service."
          type="p2"
          color="#1a1a1a"
          align="start"
        />

        <Button
          variant={isValid ? "green" : "disable"}
          disabled={!isValid}
          type="submit"
        >
          Withdraw
        </Button>

        <TermsAndCondition />
        <WalletDrawer amount={withdrawAmount} type="Withdraw" />
        <WalletPin />

        <Modal
          isOpen={isWithdrawSubmitted}
          type="custom"
          modalAction={handleClose}
        >
          <div className="w-[90vw] max-w-[268px] flex flex-col gap-3">
            <Image
              path="/icons/check_2.png"
              className="h-[70px] object-contain"
            />
            <Text
              text="Withdrawal Request Submitted!"
              type="h7"
              weight="bold"
              color="#1a1a1a"
            />
            <Text
              text="Please wait for 10-30 minutes for the approval and crediting. For issues, please contact our customer support."
              type="p2"
              color="#5B5B5B"
            />
          </div>
        </Modal>
      </form>
    </FormProvider>
  );
};

export default WithdrawForm;
