import { GameContainer } from "./GameContainer";

export const DosLetraPage = () => {
  const dosletra_url = `http://${import.meta.env.VITE_GAME_HOST_DOSLETRA || 'localhost'}:${import.meta.env.VITE_GAME_PORT_DOSLETRA || '3001'}`;
  return (
    <GameContainer
      src={dosletra_url}
      title="Dos Letra Karera"
      width="100%"
      height="100%"
      showControls={false}
    />
  );
};
