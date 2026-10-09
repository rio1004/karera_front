import * as React from "react";
import { cn } from "@/utils/cn";

type InputProps = {
  label?: string;
  inputType?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const inputStyle: React.CSSProperties = {
  height: "56px",
};

function Input({ label, inputType, className, ...props }: InputProps) {
  // const [isFocused, setIsFocused] = React.useState(false);

  if (inputType !== "player") {
    return (
      <input
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus:border-[#2196F3] focus:ring-1 focus:ring-[#2196F3]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        {...props}
      />
    );
  }

  // Floating label input for inputType === "player"
  return (
    <div className="relative w-full">
      <input
        {...props}
        className={cn(
          "peer block w-full rounded-md border border-input bg-transparent px-3 pt-5 pb-2 text-base text-foreground placeholder-transparent transition !pb-[5px]",
          "disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        placeholder={label}
        style={inputStyle}
      />
      {label && (
        <label
          className={cn(
            "pointer-events-none absolute left-3 top-2 text-[11px] text-muted-foreground transition-all",
            "peer-placeholder-shown:top-[16px] peer-placeholder-shown:text-base peer-placeholder-shown:text-muted-foreground",
            "peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-ring"
          )}
        >
          {label}
        </label>
      )}
    </div>
  );
}

export { Input };
