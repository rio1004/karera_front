import { useState, type InputHTMLAttributes, type ReactNode } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
  onIconClick?: () => void;
  prefix?: string;
  registration?: UseFormRegisterReturn;
}

const InputFieldRegister = ({
  label,
  error,
  icon,
  onIconClick,
  prefix,
  type,
  registration,
  ...rest
}: InputFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === "password" && showPassword ? "text" : type;

  const handleIconClick = () => {
    if (onIconClick) return onIconClick();
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex flex-col mb-4">
      {label && <label className="mb-2 font-semibold">{label}</label>}

      <div className="relative flex items-center w-full rounded-md">
        {prefix && (
          <span className="absolute left-4 text-sm text-gray-600">
            {prefix}
          </span>
        )}

        <input
          type={inputType}
          className={`w-full py-3 px-4 border border-gray-300 rounded-md text-base font-light text-black placeholder:text-gray-400 focus:outline-none focus:border-blue-500 font-display ${
            prefix ? "pl-14" : ""
          } ${icon ? "pr-12" : ""}`}
          {...registration}
          {...rest}
        />

        {icon && (
          <span
            className="absolute right-4 cursor-pointer flex items-center"
            onClick={handleIconClick}
          >
            {icon}
          </span>
        )}
      </div>

      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputFieldRegister;

interface InputFieldPropsLogin extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  prefix?: string;
  error?: string;
  isPassword?: boolean;
  icon?: React.ReactNode;
  onIconClick?: () => void;
}

export function InputFieldLogin({
  label,
  prefix,
  error,
  isPassword,
  className,
  icon,
  type,
  onIconClick,
  ...rest
}: InputFieldPropsLogin) {
  const [showPassword, setShowPassword] = useState(false);
  const inputTypeLogin = type === "password" && showPassword ? "text" : type;

  const handleIconClick = () => {
    if (onIconClick) return onIconClick();
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex flex-col mb-4">
      {label && <label className="mb-2 font-semibold">{label}</label>}

      <div className="relative flex items-center w-full rounded-md">
        {prefix && (
          <span className="absolute left-4 text-sm text-gray-600">
            {prefix}
          </span>
        )}

        <input
          type={inputTypeLogin}
          className={`w-full py-3 px-4 border border-gray-300 rounded-md text-base font-light text-black placeholder:text-gray-400 focus:outline-none focus:border-blue-500 font-display ${
            prefix ? "pl-14" : ""
          } ${icon ? "pr-12" : ""} ${className ?? ""}`}
          {...rest}
        />

        {isPassword && icon && (
          <span
            className="absolute right-4 cursor-pointer flex items-center"
            onClick={handleIconClick}
          >
            {icon}
          </span>
        )}
      </div>

      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
}
