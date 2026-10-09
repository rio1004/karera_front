import Text from "@/components/Gamesites/Text";
 
import { useNavigate } from "react-router-dom";

const Drawer = () => {
  const navigate = useNavigate();
  return (
    <div className="absolute bottom-0 left-0 bg-white h-[60vh] w-full rounded-tl-[100px] rounded-tr-[100px] flex flex-col items-center justify-around">
      <Text text="Choose Your Game" type="h1" color="black" weight="bold" />
      <div className="flex justify-center gap-5">
        <img
          src="/homepageAssets/Dos.png"
          alt=""
          className="h-[226px]"
          onClick={() => navigate("/game-site/dos-letra")}
        />
        <img
          src="/homepageAssets/Zodiac Race1.png"
          alt=""
          className="h-[226px]"
        />
      </div>
      <img
        src="/loginAssets/PAGCOR_LOGO.png"
        alt="Your Logo"
        className="w-[28vh]"
      />
    </div>
  );
};

export default Drawer;
