export const ModInfoBox = ({
  boxLabel,
  value,
  color,
}: {
  boxLabel: string;
  value: string;
  color: "green" | "yellow";
}) => {
  const bgColor =
    color === "green" ? "bg-green-600 text-white" : "bg-yellow-400 text-black";

  return (
    <div className="rounded-lg border border-gray-300 overflow-hidden text-sm w-full h-24">
      <div
        className={`${bgColor} h-8 flex items-center justify-center text-xs font-bold uppercase`}
      >
        {boxLabel}
      </div>
      <div className="bg-white h-16 flex items-center justify-center text-lg font-semibold text-gray-800">
        {value}
      </div>
    </div>
  );
};
