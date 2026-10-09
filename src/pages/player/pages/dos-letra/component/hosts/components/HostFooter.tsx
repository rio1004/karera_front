import Image from "@/components/Image";
import { ICONS } from "@/constant/image";

export const HostFooter = () => {
  return (
    <footer className="flex justify-center flex-col items-center">
      <div className="flex items-center justify-center">
        <Image path={ICONS.gift.src} alt={ICONS.gift.alt} className="w-4 h-4" />
        <span>Monthly Givers</span>
      </div>
      <div className="flex items-center justify-center">
        <Image
          path={ICONS.flag_host.src}
          alt={ICONS.flag_host.alt}
          className="w-4 h-4"
        />
        <span>Overall Top Givers for this Month</span>
      </div>
    </footer>
  );
};
