import { ICONS } from "@/constant/image";
import { useAuthStore } from "@/store/auth/useAuth";
import { usePlayerStore } from "@/store/player/usePlayerStore";

const Header = () => {
  const user = useAuthStore((state) => state.user);
  const { setShowSideBar } = usePlayerStore();

  const handleShowSidebar = () => {
    console.log("test");
    setShowSideBar(true);
  };

  return (
    <div>
      {" "}
      <header
        className="bg-red-600 px-4 py-3 flex justify-between items-center min-h-[100px] bg-cover bg-center mt-[-18px]"
        style={{ backgroundImage: "url('/Header/header_background.png')" }}
      >
        <button className="text-white" onClick={handleShowSidebar}>
          <img src={ICONS.hamburger.src} className="w-8 h-8" />
        </button>
        <div className="flex items-center space-x-3">
          <div className="relative flex items-center space-x-2">
            <span className="text-white text-lg text-[20px] font-bold">
              Hi, {user?.userName}!
            </span>
          </div>
          <div className="relative flex items-center space-x-2">
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              <img src={ICONS.userProfile.src} className="w-8 h-8" alt="User" />
            </div>
            <div className="w-8 h-8 rounded-full flex items-center justify-center">
              <img
                src={ICONS.notificationMessage.src}
                className="w-8 h-8"
                alt="Chat"
              />
            </div>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full border-2 border-red-600 flex items-center justify-center">
              <span className="text-black text-xs font-bold">2</span>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
