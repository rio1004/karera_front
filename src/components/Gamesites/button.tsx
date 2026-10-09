 

type Props = {
  bgColor: string;
  text: string;
  submit?: () => void;
  type?: "box" | "round";
  disabled?: boolean;
} & React.InputHTMLAttributes<HTMLButtonElement>;

const CustomButton = ({
  bgColor,
  text,
  submit,
  type = "round",
  disabled,
  ...rest
}: Props) => {
  return (
    <button
      className={`text-white border-none py-2 text-[1.3rem] font-sans cursor-pointer transition-colors mt-2 ${
        type === "round" ? "rounded-[25px]" : "rounded-[10px] w-full"
      }`}
      style={{
        background: disabled ? "#00000040" : bgColor,
      }}
      {...rest}
      onClick={submit}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default CustomButton;
