import Text from "@/components/Gamesites/Text";
 

type Props = {
  countdown: number;
  betColor?: string;
};

const colorMap: { [key: string]: string } = {
  success: "border-success",
  warning: "border-warning",
};

const Countdown = ({ countdown, betColor = "border-green" }: Props) => {
  return (
    <>
      <div
        data-testid="countdown"
        className={`w-[45px] h-[45px] border-[5px] ${
          colorMap[betColor] || "border-green"
        } flex justify-center items-center text-white bg-[rgba(15,42,52,0.65)] rounded-full`}
      >
        <Text text={countdown.toString()} type="h6"/>
      </div>
    </>
  );
};

export default Countdown;
