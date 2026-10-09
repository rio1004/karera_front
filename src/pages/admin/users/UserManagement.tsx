import { ReportTable } from "@/components/ReportTable";
import { formatDateReport } from "@/utils/formatDateReport";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/DateRangePicker";
import { useDateFilter } from "@/store/admin/useDateFilter";
import dayjs from "dayjs";
import { useAdminUserStore } from "@/store/admin/useAdminUserStore";
import type { User } from "@/store/types/auth/UserTypes";
import EditTypeModal from "./EditTypeModal";
import BanUserModal from "./BanUserModal";
import StatusModal from "./StatusModal";

export const UserReportTable = () => {
  const {
    users,
    userCurrentPage,
    userRowsPerPage,
    setUsersData,
    setUserCurrentPage,
    setUserRowsPerPage,
    fetchUsers,
    isDialogOpen,
    setIsDialogOpen,
    totalRows,
    isLoading,
  } = useAdminUserStore();

  const { setDateRange } = useDateFilter();
  const [showBanModal, setShowBanModal] = useState<boolean>(false);
  const [showStatusModal, setShowStatusModal] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    setDateRange(null, null);
    fetchUsers();
  }, [setDateRange]);

  const columns = [
    { header: "Full Name", key: "firstName" },
    { header: "Username", key: "userName" },
    { header: "Email", key: "email" },
    { header: "Mobile", key: "mobile" },
    { header: "User Type", key: "type" },
    {
      header: "Status",
      key: "status",
      render: (row: User) => (
        <p
          className={`${
            row.status === "active" ? "text-success" : "text-destructive"
          }`}
        >
          {row.status === "active" ? "Active" : "Inactive"}
        </p>
      ),
    },
    {
      header: "Date Created",
      key: "createdAt",
      render: (row: Record<string, unknown>) =>
        formatDateReport(row.createdAt as string),
    },
    {
      header: "Actions",
      key: "actions",
      render: (row: User) => (
        <div className="flex gap-2 justify-center">
          {row.type === "player" ? (
            <>
              <Button
                variant={row.status === "active" ? "outline" : "success"}
                onClick={() => {
                  setShowStatusModal(true);
                  setEditingUser(row);
                }}
              >
                {row.status === "active" ? "Deactivate" : "Activate"}
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  setEditingUser(row);
                  setIsDialogOpen(true);
                }}
              >
                Edit
              </Button>
              <Button
                variant={"destructive"}
                onClick={() => {
                  setShowBanModal(true);
                  setEditingUser(row);
                }}
              >
                Ban
              </Button>
            </>
          ) : (
            <>
              <Button
                variant={"disabledSquare"}
                disabled
                onClick={() => {
                  setShowStatusModal(true);
                  setEditingUser(row);
                }}
              >
                has no actions
              </Button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <ReportTable
        title="User Management"
        data={users}
        currentPage={userCurrentPage}
        rowsPerPage={userRowsPerPage}
        setData={setUsersData}
        setCurrentPage={setUserCurrentPage}
        setRowsPerPage={setUserRowsPerPage}
        exportFileName="user_reports"
        columns={columns}
        totalRows={totalRows}
        loading={isLoading}
        filterSlot={
          <DateRangePicker
            key={`user-date-picker-${Date.now()}`}
            label="Filter by date"
            target="user"
            startDate={null}
            endDate={null}
            onChange={({ start, end }) => {
              fetchUsers({
                startDate: start ? dayjs(start).format("YYYYMMDD") : undefined,
                endDate: end ? dayjs(end).format("YYYYMMDD") : undefined,
              });
              setUserCurrentPage(1);
            }}
          />
        }
      />
      <EditTypeModal
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        user={editingUser}
        onSaved={fetchUsers}
      />
      <BanUserModal
        open={showBanModal}
        onOpenChange={setShowBanModal}
        user={editingUser}
        onSaved={fetchUsers}
      />
      <StatusModal
        open={showStatusModal}
        onOpenChange={setShowStatusModal}
        user={editingUser}
        onSaved={fetchUsers}
      />
    </>
  );
};
