import { useRef } from "react";

interface GameContainerProps {
  src: string;
  title?: string;
  width?: string;
  height?: string;
  allowFullscreen?: boolean;
  showControls?: boolean;
}

export const GameContainer = ({
  src,
  title = "Game",
  width = "100%",
  height = "600px",
  showControls = true,
}: GameContainerProps) => {
  //   const [isLoading, setIsLoading] = useState(false);
  //   const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const reloadGame = () => {
    const iframe = containerRef.current?.querySelector("iframe");
    if (iframe) {
      const currentSrc = iframe.src;
      iframe.src = "";
      setTimeout(() => {
        iframe.src = currentSrc;
      }, 100);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative bg-gray-900 rounded-lg overflow-hidden border border-gray-700"
      style={{ width, height }}
    >
      {showControls && (
        <div className="absolute top-0 left-0 right-0 z-10 bg-black/80 backdrop-blur-sm text-white p-2 flex justify-between items-center">
          <h3 className="text-sm font-medium truncate flex-1">{title}</h3>
          <button
            onClick={reloadGame}
            className="p-1.5 hover:bg-white/20 rounded transition-colors"
            title="Reload"
          >
            🔄
          </button>
        </div>
      )}

      {/* {isLoading && (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-20">
          <div className="text-center text-white">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-sm">Loading {title}...</p>
          </div>
        </div>
      )}

      {hasError && (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-20">
          <div className="text-center text-white p-6">
            <div className="w-12 h-12 text-red-500 mx-auto mb-4">❌</div>
            <h3 className="text-lg font-semibold mb-2">Failed to Load Game</h3>
            <p className="text-gray-400 mb-4 text-sm">Please check your connection or try again.</p>
            <button
              onClick={reloadGame}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      )} */}

      <iframe
        src={src}
        title={title}
        width="100%"
        height="100%"
        sandbox="allow-scripts allow-same-origin"
        frameBorder="0"
        allowFullScreen
        className="w-full h-full bg-white"
        style={{ paddingTop: showControls ? "2.5rem" : "0" }}
      />
    </div>
  );
};
