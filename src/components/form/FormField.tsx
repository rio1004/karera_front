import { Input } from "@/components/ui/input";
import { Eye, EyeClosed, CalendarDays, PhilippinePeso } from "lucide-react";
import { useState, type CSSProperties } from "react";
import type {
  FieldValues,
  Path,
  UseFormRegister,
  FieldError,
  Control,
} from "react-hook-form";
import { Controller } from "react-hook-form";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import {
  Select,
  SelectItem,
  SelectGroup,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/utils/cn";
import { Textarea } from "../ui/textarea";
import { popup } from "../PopupManager";

export type SelectOption = {
  value: string;
  label: string;
};

export type FormFieldProps<T extends FieldValues> = {
  name: Path<T>;
  register: UseFormRegister<T>;
  errors?: FieldError;
  placeholder?: string;
  type?:
    | "select"
    | "text"
    | "date"
    | "password"
    | "number"
    | "terms"
    | "textarea";
  className?: string;
  control?: Control<T>;
  options?: SelectOption[];
  prefix?: string;
  validate?: (value: string) => true | string;
  showValidUI?: boolean;
  typeInput?: string;
  label?: string;
  isPeso?: boolean;
  disabled?: boolean;
  disabledDate?: (date: Date) => boolean;
};

const passwordRules = [
  {
    label: "Between 8-16 characters",
    test: (val: string) => val.length >= 8 && val.length <= 16,
  },
  {
    label: "At least (1) uppercase letter (A-Z)",
    test: (val: string) => /[A-Z]/.test(val),
  },
  {
    label: "At least (1) lowercase letter (a-z)",
    test: (val: string) => /[a-z]/.test(val),
  },
  { label: "At least (1) number (0-9)", test: (val: string) => /\d/.test(val) },
  {
    label: "At least (1) special character (!, @, #, $, %, ^, &, *)",
    test: (val: string) => /[!@#$%^&*]/.test(val),
  },
];

const inputStyle: CSSProperties = {
  height: "56px",
  borderColor: "#C4C4C4",
};

const FormField = <T extends FieldValues>({
  name,
  register,
  errors,
  placeholder,
  type = "text",
  className = "",
  control,
  options = [],
  prefix,
  validate,
  showValidUI,
  typeInput,
  label,
  isPeso,
  disabled,
  disabledDate,
}: FormFieldProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [openDate, setOpenDate] = useState(false);

  const inputType = type === "password" && showPassword ? "text" : type;
  const registration = register(name, validate ? { validate } : {});

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
    registration.onChange(e);
  };

  if (type === "select" && control) {
    return (
      <div className="flex flex-col gap-2">
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select onValueChange={onChange} value={value}>
              <SelectTrigger
                className={`w-full ${className} ${
                  errors &&
                  "border border-[#FF2020] focus:border-[#FF2020] focus:ring-[#FF2020]"
                }`}
                inputType={typeInput}
                label={label}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {options.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        {errors && (
          <span className="text-[#9C0000] text-xs p-[10px] rounded-[5px] bg-[#FFD9DA]">
            {errors.message}
          </span>
        )}
      </div>
    );
  }
  if (type === "terms") {
    return (
      <div className="flex flex-col items-start space-y-1">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id={name}
            {...register(name, {
              required: "You must agree to the terms and conditions",
            })}
            className="mt-1"
          />
          <label
            htmlFor={name}
            className="text-xs text-gray-600 leading-relaxed"
          >
            I agree to the{" "}
            <span className="text-blue-500 cursor-pointer underline">
              Terms and Conditions
            </span>{" "}
            and{" "}
            <span className="text-blue-500 cursor-pointer underline">
              Privacy Policy
            </span>
            .
          </label>
        </div>

        {errors && (
          <p className="text-red-500 text-xs mt-1">{errors.message}</p>
        )}
      </div>
    );
  }
  if (type === "date" && control) {
    return (
      <div className="flex flex-col gap-2">
        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            const isPlayer = typeInput === "player";

            return (
              <div className={`relative w-full ${isPlayer ? "" : "gap-2"}`}>
                {isPlayer && (
                  <span className="absolute left-3 top-2 text-[11px] text-muted-foreground transition-all pointer-events-none">
                    {label}
                  </span>
                )}

                <Popover open={openDate} onOpenChange={setOpenDate}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id={isPlayer ? "date" : undefined}
                      className={cn(
                        "w-full justify-between rounded-md border text-sm shadow-xs",
                        isPlayer
                          ? "font-normal px-3 pt-5 pb-2 text-left"
                          : "py-4 text-[#1a1a1a] !h-[42px]",
                        errors &&
                          "border border-[#FF2020] focus:border-[#FF2020] focus:ring-[#FF2020]"
                      )}
                      style={isPlayer ? inputStyle : undefined}
                    >
                      <span
                        className={cn(
                          isPlayer
                            ? !field.value && "text-muted-foreground"
                            : undefined
                        )}
                      >
                        {field.value
                          ? isPlayer
                            ? new Date(field.value).toLocaleDateString()
                            : format(new Date(field.value), "PPP")
                          : isPlayer
                          ? "Select date"
                          : placeholder}
                      </span>
                      <CalendarDays
                        className={cn(
                          isPlayer
                            ? "ml-auto h-[23px] w-[23px] opacity-50 self-start"
                            : "ml-2 h-5 w-5 text-gray-500"
                        )}
                        strokeWidth={isPlayer ? 2 : undefined}
                        size={isPlayer ? 23 : undefined}
                      />
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent
                    className={cn(
                      "w-auto p-0",
                      isPlayer ? "overflow-hidden" : ""
                    )}
                    align={isPlayer ? "start" : undefined}
                  >
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      defaultMonth={
                        field.value ? new Date(field.value) : undefined
                      }
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        if (date) {
                          field.onChange(
                            isPlayer ? date : format(date, "yyyy-MM-dd")
                          );
                        }
                        setOpenDate(false);
                      }}
                      onMonthChange={(date) => {
                        if (field.name == "birthDate") {
                          const today = new Date();
                          const selectedYear = date.getFullYear();
                          const age = today.getFullYear() - selectedYear;
                          if (age < 21) {
                            popup.error(
                              "You must be 21 and above to play this game"
                            );
                          } else {
                            popup.close();
                          }
                        }
                        console.log(field);
                        console.log("test", date);
                      }}
                      disabled={(date) => {
                        if (typeof disabledDate === "function")
                          return disabledDate(date);
                        return disabledDate || false;
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            );
          }}
        />

        {errors && (
          <span className="text-[#9C0000] text-xs p-[10px] rounded-[5px] bg-[#FFD9DA]">
            {errors.message}
          </span>
        )}
      </div>
    );
  }

  if (type === "textarea") {
    return (
      <div className="flex flex-col gap-2">
        <Textarea
          placeholder={placeholder}
          disabled={disabled}
          {...register(name, validate ? { validate } : {})}
          className={` ${className} ${
            errors
              ? "border border-[#FF2020] focus:border-[#FF2020] focus:ring-[#FF2020]"
              : ""
          }`}
        />
        {errors && (
          <span className="text-[#9C0000] text-xs p-[10px] rounded-[5px] bg-[#FFD9DA]">
            {errors.message}
          </span>
        )}
      </div>
    );
  }

  if (isPeso && control) {
    return (
      <div className="flex flex-col gap-2">
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <div className="relative">
              <Input
                {...field}
                value={
                  field.value
                    ? `₱${field.value
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                    : ""
                }
                onChange={(e) => {
                  const raw = e.target.value.replace(/[₱,]/g, "");
                  if (/^\d*$/.test(raw)) {
                    field.onChange(raw);
                  }
                }}
                placeholder={placeholder || "₱0"}
                className={`py-[20px] pr-10 ${className} ${
                  errors
                    ? "border border-[#FF2020] focus:border-[#FF2020] focus:ring-[#FF2020]"
                    : ""
                }`}
              />
              <div className="absolute top-0 right-[10px] h-full flex items-center">
                <PhilippinePeso color="#999999" className="h-[16px]" />
              </div>
            </div>
          )}
        />

        {errors && (
          <span className="text-[#9C0000] text-xs p-[10px] rounded-[5px] bg-[#FFD9DA]">
            {errors.message}
          </span>
        )}
      </div>
    );
  }

  if (type === "password") {
    return (
      <div className="flex flex-col gap-2">
        <div className="relative">
          <Input
            type={inputType}
            placeholder={placeholder}
            {...registration}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={handlePasswordChange}
            className={`py-[20px] pr-10 ${className} ${
              errors
                ? "border border-[#FF2020] focus:border-[#FF2020] focus:ring-[#FF2020]"
                : ""
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <Eye size={18} /> : <EyeClosed size={18} />}
          </button>
        </div>

        {focused && showValidUI && (
          <div className="rounded-md border p-3 bg-white shadow-md text-sm">
            <p className="font-semibold mb-2 text-[#999999]">
              YOUR PASSWORD MUST CONTAIN
            </p>
            <ul className="flex flex-col gap-1">
              {passwordRules.map((rule, idx) => {
                const valid = rule.test(passwordValue);
                return (
                  <li
                    key={idx}
                    className={`flex items-center gap-2 ${
                      valid ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        valid ? "bg-green-600" : "bg-red-600"
                      }`}
                    ></span>
                    {rule.label}
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {errors && (
          <span className="text-[#9C0000] text-xs p-[10px] rounded-[5px] bg-[#FFD9DA]">
            {errors.message}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="relative flex items-center">
        {prefix && (
          <span className="absolute left-4 text-gray-600">{prefix}</span>
        )}
        <Input
          type={inputType}
          inputType={typeInput}
          placeholder={placeholder}
          disabled={disabled}
          label={label}
          {...registration}
          style={{ paddingLeft: prefix ? "50px" : "" }}
          className={`py-[20px] pr-10 focus:border-[#2196F3] focus:ring-[#2196F3] ${className} ${
            errors
              ? "border border-[#FF2020] focus:border-[#FF2020] focus:ring-[#FF2020]"
              : ""
          }`}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <Eye size={18} /> : <EyeClosed size={18} />}
          </button>
        )}
      </div>
      {errors && (
        <span className="text-[#9C0000] text-xs p-[10px] rounded-[5px] bg-[#FFD9DA]">
          {errors.message}
        </span>
      )}
    </div>
  );
};

export default FormField;
