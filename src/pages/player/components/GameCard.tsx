import { ICONS } from "@/constant/image";
import type { GameCardProps } from "@/types/game.types";

interface ExtendedGameCardProps extends GameCardProps {
  variant?: "banner" | "compact";
  subtitle?: string;
  ctaButton?: {
    text: string;
    onClick?: () => void;
  };
}

const BadgeIcon = ({ src }: { src: string }) => (
  <img
    src={src}
    alt="Badge"
    className="absolute -top-2 -left-[10px] h-[39px] object-contain z-10"
  />
);

const CTAButton = ({
  text,
  onClick,
}: {
  text: string;
  onClick?: () => void;
}) => (
  <button
    onClick={(e) => {
      e.stopPropagation();
      onClick?.();
    }}
    className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-bold py-2 px-6 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
  >
    {text}
  </button>
);

export const GameCard = ({
  imageSrc,
  imageAlt,
  title,
  onClick,
  variant = "compact",
  subtitle,
  ctaButton,
  hot,
}: ExtendedGameCardProps) => {
  const badgeIcon = hot ? ICONS.hot.src : ICONS.soon.src;
  const labelIcon = hot ? ICONS.fire.src : ICONS.soon_fire.src;

  if (variant === "compact") {
    return (
      <div
        className="relative cursor-pointer rounded-[10px] border bg-white shadow transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
        onClick={onClick}
      >
        <BadgeIcon src={badgeIcon} />
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full rounded-t-[10px] object-cover md:object-cover"
        />
        <div className="flex justify-between text-[12px] px-1 py-1 pt-2">
          {title} <img src={labelIcon} alt="" className="h-4" />
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative cursor-pointer overflow-hidden rounded-2xl 
                 transition-all duration-200 hover:scale-[1.01]"
      onClick={onClick}
    >
      <div className="absolute inset-0">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20" />
      </div>

      <div className="relative flex min-h-[120px] items-center gap-4 p-4">
        <div className="relative flex-shrink-0">
          {badgeIcon && <BadgeIcon src={badgeIcon} />}
          <div className="h-24 w-24 overflow-hidden rounded-2xl border-2 border-yellow-400 shadow-lg">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="flex-1 leading-none">
          <h3 className="text-2xl font-bold text-white drop-shadow-lg">
            {title}
          </h3>
          {subtitle && <p className="mb-3 text-lg text-white">{subtitle}</p>}
          {ctaButton && <CTAButton {...ctaButton} />}
        </div>
      </div>
    </div>
  );
};
