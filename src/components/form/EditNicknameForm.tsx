import { cn } from "@/utils/cn";
import { Input } from "../ui/input";
import { Calendar, X } from "lucide-react";
import type { UpdateProfileFormData } from "@/types";
import type { FieldError, UseFormRegister } from "react-hook-form";

interface FormFieldProps {
  name: keyof UpdateProfileFormData;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  type?: "text" | "tel";
  showCalendarIcon?: boolean;
  borderColor?: "gray" | "blue" | "red";
  register: UseFormRegister<UpdateProfileFormData>;
  error?: FieldError | { message: string };
  onClear?: () => void;
  customErrorMessage?: string;
}

export const FormField = ({
  name,
  label,
  placeholder,
  disabled = false,
  type = "text",
  showCalendarIcon = false,
  borderColor = "gray",
  register,
  error,
  onClear,
  customErrorMessage,
}: FormFieldProps) => {
  const getBorderColorClass = () => {
    switch (borderColor) {
      case "blue":
        return "border-blue-400 focus-visible:border-blue-500 focus-visible:ring-blue-500/50";
      case "red":
        return "border-red-400 focus-visible:border-red-500 focus-visible:ring-red-500/50 aria-invalid:border-red-400 aria-invalid:ring-red-500/20";
      default:
        return "";
    }
  };

  const displayError = customErrorMessage || error?.message;

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-xs text-gray-500 mb-2 ml-1 uppercase tracking-wide font-medium">
          {label}
        </label>
      )}
      <div className="relative">
        <Input
          {...register(name)}
          type={type}
          className={cn(
            "h-12 px-4 text-base",
            disabled && "bg-gray-100 text-gray-700",
            getBorderColorClass()
          )}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={!!displayError}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          {showCalendarIcon ? (
            <Calendar className="h-5 w-5 text-gray-400" />
          ) : (
            !disabled && (
              <X
                className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
                onClick={onClear}
              />
            )
          )}
        </div>
      </div>
      {displayError && (
        <p className="text-red-500 text-xs mt-1 ml-1">{displayError}</p>
      )}
    </div>
  );
};
