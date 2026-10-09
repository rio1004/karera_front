 
import Text from "./Text";

type Props = {
  name: string;
  text: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Radio = ({ name, text, ...rest }: Props) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input type="radio" name={name} className="peer hidden" {...rest} />
      <div className="w-[20px] h-[20px] rounded-full border-3 border-[#D9D9D9] peer-checked:border-[#D9D9D9] peer-checked:bg-green-500 transition-colors" />
      <Text text={text} type="p1" color="#D9D9D9" />
    </label>
  );
};

export default Radio;
