import clsx from "clsx";
import { Asterisk } from "lucide-react";


type Props = {
  pins: string[];
  inputRefs: React.RefObject<(HTMLInputElement | null)[]>;
  classname?: string;
};

const PinInputFields = ({ pins, inputRefs, classname }: Props) => (
  <div className={`flex justify-center space-x-3 mb-6 ${classname}`}>
    {pins.map((digit, index) => {
      const hasValue = digit !== "";

      return (
        <div
          key={index}
          className={clsx(
            "w-14 h-14 border-2 rounded-lg flex items-center justify-center",
            hasValue
              ? "bg-green-500 border-green-600"
              : "bg-white border-gray-300"
          )}
          onClick={() => inputRefs.current?.[index]?.focus()}
        >
          <input
            ref={(el) => {
              if (el && inputRefs.current) inputRefs.current[index] = el;
            }}
            type="text"
            maxLength={1}
            readOnly
            value=""
            className="sr-only" // hide input visually but keep it focusable
          />
          <span
            className={clsx(
              "text-3xl font-bold",
              hasValue ? "text-white" : "text-black"
            )}
          >
            {hasValue ? <Asterisk /> : ""}
          </span>
        </div>
      );
    })}
  </div>
);

export default PinInputFields;
