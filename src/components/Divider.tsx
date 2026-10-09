type Props = {
  width: string;
  type?: "solid" | "dashed";
  borderColor?: string;
  borderWidth?: string;
  className?: string;
};

const Divider = ({
  width = "100%",
  type = "solid",
  borderColor = "#E9E9E9",
  borderWidth,
  className,
}: Props) => {
  return (
    <div className="w-full flex justify-center">
      <div
        className={`border-t ${className} ${
          type === "dashed" ? "border-dashed" : "border-solid"
        }`}
        style={{ width, borderColor, borderWidth }}
      ></div>
    </div>
  );
};

export default Divider;
