import LiveGameHeader from "./component/LiveGameHeader";
import LiveGameFooter from "./component/LiveGameFooter";
import SideBar from "@/components/SideBar/SideBar";
import PlayerSideBar from "@/pages/player/components/PlayerSideBar";

type Props = {
  children: React.ReactNode;
};

const LiveGameLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col h-[100dvh]">
      <PlayerSideBar />
      <header className="shrink-0">
        <LiveGameHeader />
      </header>
      <main className="flex-1 overflow-y-auto">{children}</main>
      <footer className="shrink-0">
        <LiveGameFooter />
      </footer>
    </div>
  );
};

export default LiveGameLayout;
