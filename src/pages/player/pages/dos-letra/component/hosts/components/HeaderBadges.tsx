import Image from "@/components/Image";
import { ICONS } from "@/constant/image";

type IconType = "givers" | "host" | "topGivers";

interface HeaderBadgeProps {
  icon: IconType;
  className?: string;
  onClick?: () => void;
}

export const HeaderBadge = ({
  icon,
}: HeaderBadgeProps) => {
  const getIconComponent = (iconType: IconType) => {
    switch (iconType) {
      case "givers":
        return (
          <Image
            path={ICONS.givers.src}
            alt="Givers"
            className="w-full h-full"
          />
        );
      case "host":
        return <Image path={ICONS.hostRanking.src} alt="Host" className="w-full h-full"/>;
      case "topGivers":
        return (
          <Image
            path={ICONS.topGivers.src}
            alt="Top Givers"
            className="w-full h-full"
          />
        );
      default:
        return null;
    }
  };

  return (
    <figure className="absolute top-[-91px] h-[138px] left-0 w-full flex justify-center ">
      {getIconComponent(icon)}
    </figure>
  );
};
