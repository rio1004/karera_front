import { ReportTable } from "@/components/ReportTable";
import { Button } from "@/components/ui/button";
import { useGameRoomStore } from "@/store/moderator/useGameRoom";
import { formatDateReport } from "@/utils/formattedDate";
import { useEffect, useState } from "react";
import StatusModal from "./StatusModal";

export const GameOfferingTable = () => {
  const { fetchGames, games, setGameData, isLoading, total } =
    useGameRoomStore();

  const [showStatusModal, setShowStatusModal] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<any | null>(null);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  const handleRefreshData = () => {
    fetchGames();
  };

  const columns = [
    { header: "ID", key: "id" },
    { header: "Name", key: "name" },
    {
      header: "Choices",
      key: "choices",
      render: (row: any) => (
        <div className="flex gap-1">
          {row.choices.map((choice: string, index: number) => (
            <span key={index} className="bg-gray-100 px-2 py-1 rounded text-sm">
              {choice}
            </span>
          ))}
        </div>
      ),
    },
    {
      header: "Commission",
      key: "commission",
      render: (row: any) => <span>{(row.commission * 100).toFixed(1)}%</span>,
    },
    {
      header: "Date Created",
      key: "createdAt",
      render: (row: Record<string, unknown>) =>
        formatDateReport(row.createdAt as string),
    },
    {
      header: "Date Updated",
      key: "updatedAt",
      render: (row: Record<string, unknown>) =>
        formatDateReport(row.updatedAt as string),
    },
    {
      header: "Status",
      key: "status",
      render: (row: any) => (
        <span
          className={`px-2 py-1 rounded text-sm font-medium ${
            row.status === "enable"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {row.status === "enable" ? "Enable" : "Disabled"}
        </span>
      ),
    },
    {
      header: "Actions",
      key: "actions",
      render: (row: any) => {
        const isActive = row.status === "enable";

        return (
          <div className="flex gap-2 justify-center">
            <Button
              variant={isActive ? "outline" : "success"}
              onClick={() => {
                setShowStatusModal(true);
                setEditingUser(row);
              }}
            >
              {isActive ? "Disabled" : "Enable"}
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <ReportTable
        title="Game Offering"
        data={games}
        setData={setGameData}
        exportFileName="Game Offering"
        columns={columns}
        totalRows={total}
        loading={isLoading}
      />

      <StatusModal
        open={showStatusModal}
        onOpenChange={setShowStatusModal}
        game={editingUser}
        onSaved={handleRefreshData}
      />
    </div>
  );
};
