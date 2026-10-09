import { popup } from "@/components/PopupManager";
import { Button } from "@/components/ui/button";
import { UI_COLORS } from "@/constant/colors";
import { useRoomStore } from "@/store/host/useRoomStore";
import { useGameRoomStore } from "@/store/moderator/useGameRoom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormField from "@/components/form/FormField";
import { useHostsStore } from "@/store/moderator/useHostStore";
import ExistingRoomModal from "./ExistingRoomModal";

type CreateGameRoomModalProps = {
  onClose: () => void;
  onCreated: () => void;
};

type FormData = {
  roomId: string;
  selectedGame: string;
  selectedHost: string;
  selectedStudioNo: string;
  date: string;
};

export const CreateGameRoomModal = ({
  onClose,
  onCreated,
}: CreateGameRoomModalProps) => {
  const { games, fetchGames } = useGameRoomStore();
  const {
    createRoom,
    isLoading,
    error,
    clearError,
    studios,
    fetchStudios,
    fetchRooms,
  } = useRoomStore();

  const { hosts, fetchHosts } = useHostsStore();
  const [showExisting, setShowExisting] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      roomId: "3",
      selectedGame: "",
      selectedHost: "",
      selectedStudioNo: "",
      date: new Date().toISOString().split("T")[0],
    },
  });

  useEffect(() => {
    fetchGames();
    fetchHosts();
    fetchStudios();
  }, []);

  const handleCloseExisting = () => {
    setShowExisting(false);
  };

  const onSubmit = async (data: FormData) => {
    try {
      clearError();
      await createRoom(
        data.selectedGame,
        data.selectedHost,
        data.selectedStudioNo
      );
      await fetchRooms();
      popup.success("Room created successfully!");
      onCreated()
    } catch (error) {
      console.error("Failed to create room:", error);
      let errorMessage = "Failed to create room. Please try again.";

      if (error instanceof Error) {
        try {
          const errorData = JSON.parse(error.message);
          if (errorData.error) {
            errorMessage = errorData.error;
          }
        } catch {
          errorMessage = error.message;
        }
      }
      if (errorMessage.includes("Host already has an active room session")) {
        popup.info("Host already has an active room session.");
      } else {
        popup.error(errorMessage);
      }
    }
  };

  const gameOptions =
    games?.map((game) => ({
      value: game.id,
      label: game.name,
    })) || [];

  const hostOptions =
    hosts?.map((host) => ({
      value: host.id,
      label: host.name,
    })) || [];

  const studioOptions =
    studios?.map((studio) => ({
      value: studio.studioNo,
      label: studio.studioNo,
    })) || [];

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000BF]"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <div className="flex items-center space-x-2 mb-4">
          <div className="bg-green-500 p-2 rounded-full">
            <span className="text-white text-xl">🏠</span>
          </div>
          <h2 className="text-xl font-semibold">Create Game Room</h2>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <p className="text-sm">{error}</p>
            <Button
              onClick={clearError}
              className="text-red-600 hover:text-red-800 underline text-xs mt-1"
            >
              Dismiss
            </Button>
          </div>
        )}

        <div className="space-y-4">
          {/* Room ID - Read Only */}
          <FormField
            name="roomId"
            register={register}
            errors={errors.roomId}
            type="text"
            className="bg-gray-200"
          />

          {/* Select Game */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Game
            </label>
            <FormField
              name="selectedGame"
              register={register}
              control={control}
              errors={errors.selectedGame}
              type="select"
              placeholder="-- Choose Game --"
              options={gameOptions}
              validate={(value) => (value ? true : "Please select a game")}
              className={isLoading ? "opacity-50" : ""}
            />
          </div>

          {/* Select Host */}
          <FormField
            name="selectedHost"
            register={register}
            control={control}
            errors={errors.selectedHost}
            type="select"
            placeholder="-- Choose Host --"
            options={hostOptions}
            validate={(value) => (value ? true : "Please select a host")}
            className={isLoading ? "opacity-50" : ""}
          />

          {/* Select Studio */}
          <FormField
            name="selectedStudioNo"
            register={register}
            control={control}
            errors={errors.selectedStudioNo}
            type="select"
            placeholder="-- Choose Studio --"
            options={studioOptions}
            validate={(value) => (value ? true : "Please select a studio")}
            className={isLoading ? "opacity-50" : ""}
          />

          {/* Date - Read Only */}
          <FormField
            name="date"
            register={register}
            control={control}
            errors={errors.date}
            type="date"
            className="bg-gray-200"
          />

          <div className="flex gap-2">
            <Button
              type="button"
              onClick={handleSubmit(onSubmit)}
              className={`w-full py-3 text-white rounded-lg font-bold flex items-center justify-center ${
                isLoading ? "opacity-75 cursor-not-allowed" : ""
              }`}
              style={{ background: UI_COLORS.LINEAR.green }}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating...
                </>
              ) : (
                "Create"
              )}
            </Button>
          </div>

          {showExisting && <ExistingRoomModal onClose={handleCloseExisting} />}
        </div>
      </div>
    </div>
  );
};
