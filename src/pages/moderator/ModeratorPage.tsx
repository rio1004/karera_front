import { useState } from "react";
import { useAuthStore } from "@/store/auth/useAuth";
import { IMAGES } from "@/constant/image";
import Image from "@/components/Image";
import { UI_COLORS } from "@/constant/colors";
import ExistingRoomModal from "./components/ExistingRoomModal";
import { CreateGameRoomModal } from "./components/CreateRoomModal";

const ModeratorPage = () => {
  const [showCreate, setShowCreate] = useState<boolean>(false);
  const [showExisting, setShowExisting] = useState<boolean>(false);
  const Username = useAuthStore((state) => state.user);

  const handleCreateRoom = () => {
    setShowCreate(true);
  };

  const handleCloseCreate = () => {
    setShowCreate(false);
  };

  const handleCloseExisting = () => {
    setShowExisting(false);
  };

  const handleShowExisting = () => {
    setShowExisting(true);
  };

  return (
    <div>
      <div className="flex flex-col items-center">
        <img
          src={IMAGES.csrGirl.src}
          alt="Avatar"
          className="w-24 h-24 rounded-full border-4 border-yellow-400"
        />
        <h2 className="text-2xl mt-4 text-white/80">
          Welcome, {Username?.userName}!
        </h2>
        <p className="text-sm text-white/80">User ID: {Username?.id}</p>
      </div>

      <div className="absolute top-[120%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-10">
        <h3 className=" mt-0 lg:mt-10 font-display text-center leading-[1.5] text-[#333333] text-5xl md:text-[64px] font-semibold">
          Let’s Get Started!
        </h3>
        <div className="flex gap-4 mt-4">
          <button
            className=" p-2 flex-row  flex items-center justify-center xl:p-6 w-[190px] md:w-[332px] xl:w-[623px] md:h-[130px] h-[107px] rounded-xl text-white font-display shadow-lg md:text-2xl text-md xl:text-[50px]"
            style={{ background: UI_COLORS.LINEAR.green }}
            onClick={handleCreateRoom}
          >
            <Image
              path={IMAGES.room.src}
              alt={IMAGES.room.alt}
              className="xl:w-[85px] w-[50px] xl:h-[85px]"
            />
            CREATE ROOM
          </button>

          <button
            className="xl:p-6  p-2 flex-row flex items-center justify-center rounded-xl  w-[190px] md:w-[332px] xl:w-[623px]  md:h-[130px] h-[107px] text-white font-display shadow-lg md:text-2xl text-md xl:text-[50px]"
            style={{ background: UI_COLORS.LINEAR.blue }}
            onClick={handleShowExisting}
          >
            <Image
              path={IMAGES.existingRoom.src}
              alt={IMAGES.existingRoom.alt}
              className="xl:w-[85px] w-[50px] xl:h-[85px]"
            />
            EXISTING GAME ROOM
          </button>
        </div>
      </div>

      {showCreate && (
        <CreateGameRoomModal
          onClose={handleCloseCreate}
          onCreated={() => {
            handleCloseCreate();
            handleShowExisting();
          }}
        />
      )}
      {showExisting && <ExistingRoomModal onClose={handleCloseExisting} />}
    </div>
  );
};

export default ModeratorPage;
