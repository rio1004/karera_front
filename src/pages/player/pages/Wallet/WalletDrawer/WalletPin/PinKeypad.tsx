import { numberKeys } from "@/constant/wallet";

type PinKeypadProps = {
  pins: string[];
  setPins: (value: string[]) => void;
  inputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
};

const KeyButton = ({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className="bg-white rounded-[35px] py-1 text-[32px] border-[#BFBFBF] border-2 font-semibold text-[#5B5B5B] hover:bg-gray-200 active:bg-gray-300"
  >
    {label}
  </button>
);

const IconButton = ({
  icon,
  alt,
  onClick,
}: {
  icon: string;
  alt: string;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className="bg-white rounded-[35px] border-2 border-[#BFBFBF] py-4 flex justify-center items-center hover:bg-gray-200 active:bg-gray-300"
  >
    <img src={icon} alt={alt} className="w-6 h-6" />
  </button>
);

const PinKeypad = ({ pins, setPins, inputRefs }: PinKeypadProps) => {
  const updatePin = (value: string, index: number) => {
    const newPin = [...pins];
    newPin[index] = value;
    setPins(newPin);
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyboardClick = (value: string) => {
    const joinedPin = pins.join("");

    if (value === "clear") {
      setPins(["", "", "", ""]);
      inputRefs.current[0]?.focus();
      return;
    }

    if (value === "backspace") {
      const lastIndex = pins.findLastIndex((d: string) => d !== "");
      if (lastIndex !== -1) {
        const newPin = [...pins];
        newPin[lastIndex] = "";
        setPins(newPin);
        inputRefs.current[lastIndex]?.focus();
      }
      return;
    }

    if (joinedPin.length < 4) {
      const nextIndex = pins.findIndex((d) => d === "");
      if (nextIndex !== -1) updatePin(value, nextIndex);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      {numberKeys.map((key) => (
        <KeyButton
          key={key}
          label={key}
          onClick={() => handleKeyboardClick(key)}
        />
      ))}
      <IconButton
        icon="/icons/keypad_refresh.svg"
        alt="Refresh"
        onClick={() => handleKeyboardClick("clear")}
      />
      <KeyButton label="0" onClick={() => handleKeyboardClick("0")} />
      <IconButton
        icon="/icons/keypad_remove.svg"
        alt="Remove"
        onClick={() => handleKeyboardClick("backspace")}
      />
    </div>
  );
};

export default PinKeypad;
