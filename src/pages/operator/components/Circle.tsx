type Props = {
  total: number;
  borderColor: string;
  active: number;
};

const Circle = ({ total, borderColor, active }: Props) => {
  const percentage = total > 0 ? Math.round((active / total) * 100) : 0;

  return (
    <div className="w-[95px] h-[95px] relative flex items-center justify-center">
      <div
        className={`absolute inset-1.5 rounded-full border-2 border-[${borderColor}]`}
        style={{ borderColor }}
      ></div>
      <div
        className={`absolute inset-3 rounded-full border-2 border-[${borderColor}]`}
        style={{ borderColor }}
      ></div>
      <div
        className={`absolute inset-4.5 rounded-full border-1 border-[${borderColor}]`}
        style={{ borderColor }}
      ></div>
      <div className="relative text-[15px] font-semibold text-gray-700">
        {percentage}%
      </div>
    </div>
  );
};

export default Circle;
