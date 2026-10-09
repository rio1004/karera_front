import { GAMES_ICON, ICONS } from "@/constant/image";
import { GameCard } from "./GameCard";
import { useNavigate } from "react-router-dom";

const GameSection = () => {
  const navigate = useNavigate();

  return (
    <section>
      <div className="grid grid-cols-3 gap-1">
        <GameCard
          imageSrc={GAMES_ICON.zodiac.src}
          imageAlt={GAMES_ICON.zodiac.alt}
          title="Zodiac Race"
        />
        <GameCard
          imageSrc={GAMES_ICON.dos.src}
          imageAlt={GAMES_ICON.dos.alt}
          title="Dos Letra Karera"
          hot={true}
          onClick={() => navigate("/player/dos-letra")}
        />
        <GameCard
          imageSrc={GAMES_ICON.tres.src}
          imageAlt={GAMES_ICON.tres.alt}
          title="Tres Letra Karera"
        />
      </div>
    </section>
  );
};

export default GameSection;
