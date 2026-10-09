import Text from "@/components/Text";

type BadgeCardProps = {
  badgeIcon: string;
  title: string;
  description: React.ReactNode; 
  chatBoxDuration?: string;
  frameDuration?: string;
  profileFrameIcon?: string;
  username?: string;
  bgHighligthColor?: string;
  textColor: string;
};

const BadgeCard = ({
  badgeIcon,
  title,
  description,
  chatBoxDuration,
  frameDuration,
  profileFrameIcon,
  username = "Let's go!",
  bgHighligthColor = "#4F2787A6",
  textColor,
}: BadgeCardProps) => {
  return (
    <div className="flex items-center flex-col justify-center py-5 px-5 bg-white rounded-[15px] shadow-[0px_0px_7px_-4px_rgba(0,0,0,0.74)]">
      <div className="flex flex-col gap-3 items-center justify-center">
        <img src={badgeIcon} className="h-[76px]" alt={title} />

        <Text text={title} type="h7" weight="semiBold" color={textColor} />

        <p className="text-center">{description}</p>

        {chatBoxDuration && (
          <p>
            Colored chat box:{" "}
            <span style={{ color: textColor }}>{chatBoxDuration}</span>
          </p>
        )}

        <div
          className={`flex gap-1 items-center px-2 py-1 rounded-[12px]`}
          style={{ background: bgHighligthColor }}
        >
          <img src={badgeIcon} className="h-[30px]" alt="chat badge" />
          <p className="text-[#FFE400]">
            Username: <span className="text-white">{username}</span>
          </p>
        </div>

        {frameDuration && (
          <p>
            Exclusive Avatar Frame:{" "}
            <span className="text-[#4F2787]">{frameDuration}</span>
          </p>
        )}

        {profileFrameIcon && (
          <img
            src={profileFrameIcon}
            className="h-[72px]"
            alt="profile frame"
          />
        )}
      </div>
    </div>
  );
};

export default BadgeCard;
