import Image from "@/components/Image";
import { LOGIN_ASSETS } from "@/constant/image";

export const Footer = () => {
  return (
    <footer>
      <Image
        path={LOGIN_ASSETS.pagcorLogoModerator.src}
        alt="pagcor"
        className="h-[86px] mb-10"
      />
    </footer>
  );
};
