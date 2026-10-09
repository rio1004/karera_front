 
import Header from "./components/Header";
import Welcome from "./components/Welcome";
import Drawer from "./components/Drawer";

const GameSiteHomePage = () => {
  return (
    <div
      className="h-[100vh]"
      style={{ backgroundImage: "url(/loginAssets/RED_BG.png)" }}
    >
      <Header />
      <Welcome />
      <Drawer />
    </div>
  );
};

export default GameSiteHomePage;
