import React, { type InputHTMLAttributes } from "react";
import clsx from "clsx";
import { useFormContext } from "react-hook-form";
import type { UseFormRegisterReturn, FieldError } from "react-hook-form";

type Props = {
  value?: number | string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  variant?: "default" | "currency";
  fieldName: string;
  placeholder?: string;
  label?: string;
  errorMsg?: string;
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "name" | "ref" | "onChange"
>;
const InputField: React.FC<Props> = ({
  value,
  register,
  error,
  variant = "default",
  fieldName,
  placeholder = "",
  label,
  errorMsg,
  ...rest
}) => {
  const { setValue } = useFormContext();

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^\d]/g, "");
    const parsed = parseInt(raw, 10);
    setValue(fieldName, isNaN(parsed) ? 0 : parsed, {
      shouldValidate: true,
    });
  };

  const formattedValue =
    variant === "currency" && typeof value === "number"
      ? `₱ ${value.toLocaleString()}`
      : value;

  const { onChange, ...restRegister } = register;

  return (
    <div>
      {label && <p className="mb-2">{label}</p>}
      <input
        type="text"
        value={formattedValue}
        onChange={
          variant === "currency" ? handleCurrencyChange : onChange
        }
        {...restRegister}
        placeholder={placeholder}
        className={clsx(
          "w-full h-14 border-1 rounded-[10px] outline-none px-5",
          variant === "currency"
            ? "text-center text-2xl font-medium"
            : "text-left text-base font-normal",
          error ? "border-red-500" : "border-gray-300 focus:border-blue-500",
          rest.disabled && "bg-[#C4C4C4] text-[#5B5B5B] cursor-not-allowed"
        )}
        {...rest}
      />
      {error && <p className="text-red-500 text-sm mt-1">{errorMsg}</p>}
    </div>
  );
};

export default InputField;
