
import Text from "@/components/Text";
import Image from "@/components/Image";

type Props = {
  title?: string;
  description: string;
  icon: string;
  descStyle?: React.CSSProperties;
};

const Card = ({ title, description, icon, descStyle }: Props) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        {title && (
          <Text
            type="p2"
            text={title}
            weight="medium"
            color="black"
            align="left"
          />
        )}
        <div className="w-[80%]">
          <Text
            type="p2"
            text={description}
            style={{ fontSize: "13px", ...descStyle }}
            color="#5B5B5B"
            align="left"
          />
        </div>
      </div>
      <Image path={icon} className="h-[64px] w-[64px] object-contain" />
    </div>
  );
};

export default Card;
