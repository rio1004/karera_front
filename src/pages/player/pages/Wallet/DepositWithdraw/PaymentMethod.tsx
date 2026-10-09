import type { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type payment = {
  bankName: string;
  icon: string;
  to?: string;
};

type FormValues = {
  withdrawAmount?: number;
  agreeToTerms?: boolean;
  modeOfPayment?: string;
  phoneNo?: number;
};

type Props = {
  paymentMethods: payment[];
  watch: UseFormWatch<FormValues>;
  watchValue: keyof FormValues;
  setValue: UseFormSetValue<FormValues>;
  rowNo?: number;
};

const PaymentMethod = ({
  paymentMethods,
  watch,
  watchValue,
  setValue,
  rowNo = 4,
}: Props) => {

  console.log('MODE', paymentMethods)
  const navigate = useNavigate();
  return (
    <div className={`grid grid-cols-${rowNo} gap-3 mb-4`}>
      {paymentMethods.map((item) => {
        const isSelected = watch(watchValue) === item.bankName;

        return (
          <img
            key={item.bankName}
            src={item.icon}
            alt={item.bankName}
            className={`cursor-pointer rounded-md p-1 transition-all 
          ${
            isSelected
              ? "border-2 border-green-500"
              : "border border-transparent"
          }`}
            onClick={() => {
              if (item.to) {
                navigate("link-bank");
                return;
              }
              setValue(watchValue, item.bankName, {
                shouldValidate: true,
              });
            }}
          />
        );
      })}
    </div>
  );
};

export default PaymentMethod;
