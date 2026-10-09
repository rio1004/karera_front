

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  submit: () => void;
  bgColor?: string;
  isDisabled?: boolean;
  disableHoverEffect?: boolean;
  text: string;
  width?: string;
  btnClassName?: string;
  fontSize?: string;
}

export const CustomButton: React.FC<ButtonProps> = ({
  submit,
  bgColor = "#00a24a",
  isDisabled,
  text,
  width = "auto",
  btnClassName = "",
  disableHoverEffect = false,
  fontSize,
  ...rest
}) => {
  return (
    <button
      onClick={submit}
      disabled={isDisabled}
      className={`
        flex-1 
        rounded-full 
        text-white 
        font-bold 
        text-xl
        py-2 
        px-2
        ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
        ${!disableHoverEffect && !isDisabled ? "hover:opacity-90" : ""}
        ${btnClassName}
        font-[baloo 2]
      `}
      style={{
        background: bgColor,
        width: width || "auto",
        flex: "unset",
        minWidth: width || "auto",
        fontSize: fontSize,
      }}
      {...rest}
    >
      {text}
    </button>
  );
};
