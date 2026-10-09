import { GAMES_ICON, ICONS } from "@/constant/image";
import { GameCard } from "../../components/GameCard";
import Headline from "../../components/Headline";
import { UI_COLORS } from "@/constant/colors";
import { useNavigate } from "react-router-dom";

export default function GamePage() {
  const navigate = useNavigate();
  return (
    <div className="my-4 mx-4">
      <Headline
        bgColor={UI_COLORS.LINEAR.yellow}
        text="Live Betting Games"
        icon={ICONS.fire.src}
        type="header"
      />
      <div className="grid grid-cols-1 gap-4 mt-5">
        <GameCard
          variant="banner"
          imageSrc={GAMES_ICON.zodiac.src}
          imageAlt={GAMES_ICON.zodiac.alt}
          title="Zodiac Race"
          subtitle="Get Ready To Roll And Win!"
        />

        <GameCard
          variant="banner"
          imageSrc={GAMES_ICON.dos.src}
          imageAlt={GAMES_ICON.dos.alt}
          title="Dos Letra Karera"
          subtitle="Bet Big, Win Bigger!"
          hot
          ctaButton={{
            text: "₱5 TO PLAY!",
            onClick: () => navigate("/player/dos-letra"),
          }}
        />

        <GameCard
          variant="banner"
          imageSrc={GAMES_ICON.tres.src}
          imageAlt={GAMES_ICON.tres.alt}
          title="Tres Letra Karera"
          subtitle="Winning Is Just A Drop Away!"
        />
      </div>
    </div>
  );
}
