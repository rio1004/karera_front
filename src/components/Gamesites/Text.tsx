type ColorKeys = keyof typeof colorType;

type Props = {
  type:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "h7"
    | "h8"
    | "p1"
    | "p2"
    | "p3"
    | "p4"
    | "p5";
  text: string;
  weight?: "bold" | "medium" | "regular" | "light" | "thin";
  color?: ColorKeys | string;
  style?: React.CSSProperties;
  align?: React.CSSProperties["textAlign"];
  className?: string;
} & React.InputHTMLAttributes<HTMLParagraphElement>;

const textSize = {
  h1: "text-[48px]",
  h2: "text-[40px]",
  h3: "text-[36px]",
  h4: "text-[32px]",
  h5: "text-[30px]",
  h6: "text-[24px]",
  h7: "text-[22px]",
  h8: "text-[18px]",
  p1: "text-[16px]",
  p2: "text-[12px]",
  p3: "text-[10px]",
  p4: "text-[8px]",
  p5: "text-[6px]",
};

const fontWeight = {
  bold: "font-bold",
  medium: "font-medium",
  regular: "font-regular",
  light: "font-light",
  thin: "font-thin",
};

const colorType = {
  primary: "#1A1A1A",
  disabled: "#5B5B5B",
  success: "#00A24A",
};

const Text = ({
  type,
  text,
  weight = "regular",
  color = "white",
  style,
  align = "center",
  className,
}: Props) => {
  const resolvedColor = colorType[color as ColorKeys] ?? color;

  return (
    <p
      className={`${textSize[type]} ${fontWeight[weight]} ${className || ""}`}
      style={{
        color: resolvedColor,
        textAlign: align,
        ...style,
      }}
    >
      {text}
    </p>
  );
};

export default Text;
