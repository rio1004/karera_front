import { useHostStore } from "@/store/moderator/useHostStore";
import { useHostsStore } from "@/store/moderator/useHostStore";
import { CustomButton } from "../../../../components/Button";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import { UI_COLORS } from "@/constant/colors";
import { useLocation, useParams } from "react-router-dom";

const HostModal = () => {
  const {
    isHostModalOpen,
    toggleHostModal,
    availableHosts,
    hostName,
    setHostName,
    closeHostModal,
  } = useHostStore();
  const {
    updateHostById,
    isUpdating,
    updateError,
    fetchHosts,
    selectHost,
    isLoading,
    currentRoomId, // Add this from the store
  } = useHostsStore();

  const location = useLocation();
  const { id: roomId } = useParams();
  const [selectedHostId, setSelectedHostId] = useState<string | null>(null);

  const gameId = location.state?.gameId || roomId;
  const dynamicRoomId = location.state?.roomId;

  useEffect(() => {
    if (isHostModalOpen) {
      fetchHosts();
      setSelectedHostId(null);
    }
  }, [isHostModalOpen, fetchHosts]);

const handleSelectHost = async (hostId: string) => {
  const roomIdToEnd = currentRoomId || dynamicRoomId || roomId;
  const gameIdToUse = gameId;
  const hostIdToUse = hostId;

  try {
    const selectedHost = availableHosts.find((h) => h.id === hostId);
    if (selectedHost) {
      setSelectedHostId(hostId);
      selectHost(selectedHost.name);
      setHostName(selectedHost.name);
    }
    await updateHostById(roomIdToEnd, gameIdToUse, hostIdToUse);
    closeHostModal();
  } catch (error) {
    console.error("Failed to update host:", error);
    setSelectedHostId(null);
  }
};


  const canSelectHost = !!gameId;

  return (
    <Modal
      isOpen={isHostModalOpen}
      type="custom"
      hasClose={true}
      closeModal={toggleHostModal}
      contentStyle="px-6 py-4"
      parentStyle="w-1/2"
    >
      <div className="flex flex-col gap-4">
        {updateError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {updateError}
          </div>
        )}

        {!canSelectHost && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
            Warning: No game ID found. Please ensure you're on a game page with
            proper navigation state.
          </div>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-gray-500">Loading hosts...</div>
          </div>
        ) : availableHosts.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-gray-500">No hosts available</div>
          </div>
        ) : (
          availableHosts.map((h) => {
            const isSelected =
              selectedHostId === h.id ||
              (h.name === hostName && !selectedHostId) ||
              h.isSelected;
            const isCurrentlyUpdating = isUpdating && selectedHostId === h.id;

            return (
              <div
                key={h.id}
                onClick={() =>
                  canSelectHost && !isUpdating
                    ? handleSelectHost(h.id)
                    : undefined
                }
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
                  canSelectHost && !isUpdating
                    ? "cursor-pointer"
                    : "cursor-not-allowed"
                } ${
                  isSelected
                    ? "bg-[#1A1A1ABF] opacity-75 border-2 border-yellow-400"
                    : "bg-[#1A1A1ABF] border border-gray-300"
                } hover:bg-[#1A1A1ABF] opacity-80 ${
                  isUpdating || !canSelectHost
                    ? "opacity-50 pointer-events-none"
                    : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-black/70 rounded-full" />
                  <div>
                    <p className="font-bold text-white">{h.name}</p>
                    <p className="text-xs text-gray-500">
                      {h.likes.toLocaleString()} likes
                    </p>
                  </div>
                  {h.badge && (
                    <span className="ml-2 text-yellow-500 text-sm font-semibold">
                      {h.badge}
                    </span>
                  )}
                </div>
                <CustomButton
                  text={
                    isCurrentlyUpdating
                      ? "Updating..."
                      : isSelected
                      ? "Selected!"
                      : "Select"
                  }
                  submit={() =>
                    canSelectHost && !isUpdating
                      ? handleSelectHost(h.id)
                      : undefined
                  }
                  bgColor={
                    isSelected
                      ? "bg-tranparent"
                      : UI_COLORS.LINEAR.green
                  }
                  width="100px"
                  disableHoverEffect={isSelected}
                  disabled={isUpdating || !canSelectHost}
                />
              </div>
            );
          })
        )}
      </div>
    </Modal>
  );
};

export default HostModal;
