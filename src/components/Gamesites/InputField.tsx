 

type Props = {
  label?: string;
  placeholder?: string;
  type: string;
  errorMsg?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputField = ({ label, placeholder, type, errorMsg, ...rest }: Props) => {
  return (
    <>
      {label && (
        <label className="text-gray-500 mb-1 text-[1.2rem]">{label}</label>
      )}
      <input
        type={type}
        onChange={() => {}}
        className="border border-gray-300 rounded-[10px] py-2 px-4 text-[20px] mb-1 w-full font-sans box-border"
        placeholder={placeholder}
        {...rest}
      />
      {errorMsg && <p className="text-red-500 text-sm mt-1">{errorMsg}</p>}
    </>
  );
};

export default InputField;
