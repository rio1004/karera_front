import Text from "@/components/Text";

type Props = {
  icon: string;
  text: string;
  type: "header" | "announcement";
  bgColor: string;
  textColor?: string;
};

const Headline = ({ icon, text, type, bgColor, textColor }: Props) => {
  return (
    <div
      className="rounded-[5px] h-[31px] w-full flex items-center px-[8px]"
      style={{
        background: bgColor,
      }}
    >
      <img src={icon} alt="" className="h-[18px] mr-2 shrink-0" />

      {type === "announcement" ? (
        <div className="relative overflow-hidden flex-1">
          <div className="whitespace-nowrap animate-marquee">
            <Text
              text={text}
              type="p2"
              weight="regular"
              color={textColor ? textColor : "primary"}
            />
          </div>
        </div>
      ) : (
        <Text
          text={text}
          type="p1"
          weight="bold"
          color={textColor ? textColor : "primary"}
        />
      )}
    </div>
  );
};

export default Headline;
