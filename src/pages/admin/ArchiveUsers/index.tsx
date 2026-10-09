import { ReportTable } from "@/components/ReportTable";
import type { UserState } from "@/store/types/auth/UserTypes";
import { buildParams } from "@/utils/buildParams";
import { formatDateReport } from "@/utils/utils.helper";
import axios from "axios";
import { useState } from "react";

const API_ARCHIVE_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_API_ARCHIVE_URL_PROD
    : import.meta.env.VITE_API_ARCHIVE_URL;

const ArchiveUser = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [data, setData] = useState<UserState[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);

  const fetchUserData = async ({
    limit,
    offset,
    searchQuery,
  }: {
    limit: number;
    offset: number;
    searchQuery?: string;
  }) => {
    const res = await axios.get<{
      users: UserState[];
      total: number;
      limit: number;
      offset: number;
    }>(`${API_ARCHIVE_URL}/users`, {
      params: buildParams({ limit, offset, searchQuery }),
    });

    setTotal(res.data.total);
    return {
      users: res.data.users,
      totalRows: res.data.total,
      limit: res.data.limit,
      offset: res.data.offset,
    };
  };

  const columns = [
    { header: "Full Name", key: "firstName" },
    { header: "Username", key: "userName" },
    { header: "Email", key: "email" },
    { header: "Mobile", key: "mobile" },
    { header: "User Type", key: "type" },
    {
      header: "Date Created",
      key: "createdAt",
      render: (row: Record<string, unknown>) =>
        formatDateReport(row.createdAt as string),
    },
  ];

  return (
    <div>
      <ReportTable
        columns={columns}
        currentPage={currentPage}
        data={data}
        exportFileName="Users"
        rowsPerPage={rowsPerPage}
        setCurrentPage={setCurrentPage}
        setData={setData}
        setRowsPerPage={setRowsPerPage}
        title="Archived Users"
        totalRows={total}
        fetchData={fetchUserData}
      />
    </div>
  );
};

export default ArchiveUser;
