import Image from "@/components/Image";
import { ICONS } from "@/constant/image";
import { Eye, EyeOff} from "lucide-react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface PasswordFieldProps {
  field: UseFormRegisterReturn;
  error?: FieldError;
  placeholder: string;
  show: boolean;
  toggleShow: () => void;
  value?: string;
  isValid?: boolean;
}

const PasswordField = ({
  field,
  error,
  placeholder,
  show,
  toggleShow,
  value = "",
  isValid = false,
}: PasswordFieldProps) => {
  return (
    <div>
      <div className="relative">
        <input
          {...field}
          type={show ? "text" : "password"}
          placeholder={placeholder}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                     outline-none transition-all pr-16"
        />

        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
          <button
            type="button"
            onClick={toggleShow}
            className="text-gray-500 hover:text-gray-700"
          >
            {show ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>

          {value.length > 0 && (
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center`}
            >
              {isValid ? (
                <Image
                  path={ICONS.checkPassword.src}
                  alt={ICONS.checkPassword.alt}
                  className=""
                />
              ) : (
                <Image
                  path={ICONS.xPassword.src}
                  alt={ICONS.xPassword.alt}
                  className=""
                />
              )}
            </div>
          )}
        </div>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default PasswordField;
