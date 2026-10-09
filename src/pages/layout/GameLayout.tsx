import   { type ReactNode, useState, useEffect } from 'react';
import { ArrowLeft, Maximize2, Minimize2, RotateCcw, Home, Volume2, VolumeX, Settings } from 'lucide-react';
import { Outlet } from 'react-router-dom';

interface GameLayoutProps {
  children: ReactNode;
  gameTitle?: string;
  showBackButton?: boolean;
  showGameControls?: boolean;
  onBack?: () => void;
  backgroundColor?: string;
  fullScreenMode?: boolean;
}

// Custom hook for screen size detection
const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenSize;
};

function GameLayout({
  children,
  gameTitle = "Game",
  showBackButton = true,
  showGameControls = true,
  onBack,
  backgroundColor = "bg-gray-900",
  fullScreenMode = true
}: GameLayoutProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const screenSize = useScreenSize();

  // Handle fullscreen toggle
  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (error) {
      console.warn('Fullscreen API not supported:', error);
    }
  };

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Handle ESC key for fullscreen exit
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isFullscreen]);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      // Default back behavior
      window.history.back();
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const reloadGame = () => {
    window.location.reload();
  };

  // Check if it's a mobile device
  const isMobile = screenSize.width <= 768;

  return (
    <div className={`
      min-h-screen w-full ${backgroundColor} text-white relative overflow-hidden
      ${isFullscreen ? 'fixed inset-0 z-50' : ''}
    `}>
      {/* Top Game Header */}
      <div className={`
        absolute top-0 left-0 right-0 z-40
        bg-black/80 backdrop-blur-sm border-b border-gray-700
        transition-transform duration-300
        ${isFullscreen ? 'translate-y-0' : 'translate-y-0'}
      `}>
        <div className="flex items-center justify-between px-4 py-3">
          {/* Left section */}
          <div className="flex items-center gap-3">
            {showBackButton && (
              <button
                onClick={handleBack}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
                title="Back"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <h1 className="text-lg font-bold text-white">{gameTitle}</h1>
              <p className="text-xs text-gray-400">Live Game Session</p>
            </div>
          </div>

          {/* Right section - Game Controls */}
          {showGameControls && (
            <div className="flex items-center gap-2">
              {/* Mute/Unmute */}
              <button
                onClick={toggleMute}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>

              {/* Settings */}
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
                title="Settings"
              >
                <Settings className="w-5 h-5" />
              </button>

              {/* Reload */}
              <button
                onClick={reloadGame}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
                title="Reload Game"
              >
                <RotateCcw className="w-5 h-5" />
              </button>

              {/* Fullscreen */}
              {fullScreenMode && (
                <button
                  onClick={toggleFullscreen}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
                  title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-5 h-5" />
                  ) : (
                    <Maximize2 className="w-5 h-5" />
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="absolute top-16 right-4 z-50 bg-black/90 backdrop-blur-sm rounded-lg border border-gray-600 p-4 min-w-64">
          <h3 className="text-lg font-semibold mb-3">Game Settings</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-300">Sound</label>
              <button
                onClick={toggleMute}
                className={`
                  w-12 h-6 rounded-full transition-colors duration-200
                  ${isMuted ? 'bg-gray-600' : 'bg-blue-600'}
                `}
              >
                <div className={`
                  w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200
                  ${isMuted ? 'translate-x-1' : 'translate-x-6'}
                `}></div>
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-300">Graphics Quality</label>
              <select className="bg-gray-700 text-white rounded px-2 py-1 text-sm">
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
          </div>

          <button
            onClick={() => setShowSettings(false)}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition-colors duration-200"
          >
            Close Settings
          </button>
        </div>
      )}

      {/* Main Game Content Area */}
      <div className={`
        w-full h-screen pt-16 relative
        ${isFullscreen ? 'pt-0' : ''}
      `}>
       {children ?? <Outlet />}
      </div>

      {/* Fullscreen Instructions */}
      {isFullscreen && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-lg text-sm z-30 animate-fade-in">
          Press ESC to exit fullscreen
        </div>
      )}

      {/* Mobile-specific bottom controls */}
      {isMobile && !isFullscreen && (
        <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-3 flex justify-center gap-4 z-40">
          <button
            onClick={toggleMute}
            className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            <span className="text-xs">{isMuted ? 'Unmute' : 'Mute'}</span>
          </button>
          
          {fullScreenMode && (
            <button
              onClick={toggleFullscreen}
              className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
            >
              <Maximize2 className="w-5 h-5" />
              <span className="text-xs">Fullscreen</span>
            </button>
          )}
          
          <button
            onClick={handleBack}
            className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
          >
            <Home className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default GameLayout;