import FormField from "@/components/form/FormField";
import Text from "@/components/Text";
import { Button } from "@/components/ui/button";
import { sendCreditsSchema } from "@/schema/operator/walletSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, type FieldError } from "react-hook-form";
import SendCreditDrawer from "./SendReqCreditDrawer";
import SendWalletPinDrawer from "./SendReqWalletPinDrawer";
import { useOperatorWalletStore } from "@/store/operator/useWalletStore";

const amounts = [200, 500, 1000, 5000, 10000, 50000];

const registeredNumbers = [
  "09198877676",
  "09171234567",
  "09195554444",
  "09998887777",
  "09223334444",
];

const SendReqCredits = () => {
  const [showNumberDetails, setShowNumberDetails] = useState<boolean>(false);
  const [showNumbers, setShowNumbers] = useState<boolean>(false);
  const { setShowSendDrawer } = useOperatorWalletStore();

  const {
    register,
    setValue,
    watch,
    formState: { errors, isValid },
    control,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(sendCreditsSchema),
    defaultValues: {
      agreeToTerms: false,
      mobile: "",
    },
  });

  const sendAmount = watch("amount");
  const mobile = watch("mobile");

  useEffect(() => {
    if (mobile.length > 0) {
      setShowNumbers(true);
      setShowNumberDetails(false);
    } else {
      setShowNumbers(false);
    }
  }, [mobile]);

  const handleSelectNumber = (number: string) => {
    setValue("mobile", number, { shouldValidate: true });
    setShowNumberDetails(true);
    setShowNumbers(false);
  };

  const handleSelectAmount = (amount: number) => {
    setValue("amount", amount, { shouldValidate: true });
  };

  const onSubmit = (data: any) => {
    setShowSendDrawer(true);
  };

  return (
    <form
      className="mt-5 flex flex-col pb-[100px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <Text type="p1" text="Credit Amount" align="left" className="!mb-5" />

        <div className="grid grid-cols-3 gap-3 mb-4">
          {amounts.map((amount: number) => (
            <button
              key={amount}
              type="button"
              className={`border border-gray-300 rounded-lg py-2 px-4 text-sm font-medium transition-colors ${
                sendAmount === amount
                  ? "bg-[#00A24A] text-white border-[#00A24A]"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => handleSelectAmount(amount)}
            >
              {amount}
            </button>
          ))}
        </div>

        <FormField
          isPeso={true}
          name="amount"
          register={register}
          placeholder="Enter amount"
          type="number"
          className="text-center py-5 text-[21px] font-medium 
            placeholder:text-gray-400 placeholder:font-normal placeholder:text-base placeholder:text-left"
          control={control}
          errors={errors.amount as FieldError | undefined}
        />

        <div className="flex flex-col gap-2 mt-5">
          {showNumberDetails && (
            <div className="mb-3">
              <p className="font-medium">
                Name:<span className="font-normal ml-1">Jose Matalo</span>
              </p>
              <p className="font-medium">
                Role:<span className="font-normal ml-1">Operator</span>
              </p>
              <p className="font-medium">
                Balance:
                <span className="font-medium text-success ml-1">₱ 0.00</span>
              </p>
            </div>
          )}

          <Text type="p1" text="Registered mobile number" align="left" />
          <FormField
            name="mobile"
            register={register}
            placeholder="Enter mobile number"
          />

          {showNumbers && (
            <div className="drop-shadow-[0_0_3px_#00000040] p-4 rounded-[10px] bg-white w-full max-h-[200px] overflow-y-auto">
              <ul>
                {Array.from(new Set(registeredNumbers)).map((number) => (
                  <li
                    key={number}
                    className="border-b-1 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSelectNumber(number)}
                  >
                    {number}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {showNumberDetails && (
            <div>
              <p className="text-primary text-[10px]">
                Crediting of request may take 1-3 minutes. For issues, please
                contact our customer service.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 w-full left-0 px-5 pb-5 space-y-3 flex flex-col items-center">
        <Button variant="green" disabled={!isValid} type="submit">
          Send
        </Button>
        <FormField name="agreeToTerms" register={register} type="terms" />
      </div>
      <SendCreditDrawer />
      <SendWalletPinDrawer />
    </form>
  );
};

export default SendReqCredits;
