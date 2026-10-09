type Props = {
  countdown: number;
  betColor: string;
};

const colorMap: { [key: string]: string } = {
  success: "border-success",
  warning: "border-warning",
  // Add your own colors as needed
};

const Countdown = ({ countdown, betColor }: Props) => {
  return (
    <>
      <div
        data-testid="countdown"
        className={`w-[83px] h-[83px] border-[5px] ${
          colorMap[betColor] || "border-success"
        } flex justify-center items-center text-white bg-[rgba(15,42,52,0.65)] rounded-full absolute top-[160px] right-[12px]`}
      >
        <span className="text-[48px] font-normal">{countdown}</span>
      </div>
    </>
  );
};

export default Countdown;
