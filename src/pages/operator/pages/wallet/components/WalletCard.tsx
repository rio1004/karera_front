import Image from "@/components/Image";
import Text from "@/components/Text";

export const WalletCard = ({
  title,
  icon,
  iconAlt,
  background,
  onClick,
  color,
}: {
  title: string;
  icon: string;
  iconAlt: string;
  background: string;
  color: string;
  onClick: () => void;
}) => {
  return (
    <div
      className="rounded-xl flex items-center  flex-col text-center justify-center w-full h-full cursor-pointer p-6"
      style={{
        background: background,
      }}
      onClick={onClick}
    >
      <Image path={icon} alt={iconAlt} className="w-12 h-full" />
      <Text text={title} type="h8" color={color} />
    </div>
  );
};
