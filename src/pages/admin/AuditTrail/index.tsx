import { AdminAuditTrail } from "@/api/services/admin/auditTrailApi.service";
import { ReportTable } from "@/components/ReportTable";
import type { ApiResponse, GetMethodBaseQueryParams } from "@/types";
import type { AuditResponse } from "@/types/admin/auditTrail";
import { formatDateReport } from "@/utils/utils.helper";
import { useEffect, useState } from "react";

const AuditTrail = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowPerPage, setRowPerPage] = useState<number>(20);
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const [totalRows, setTotalRows] = useState<number>(0);

  const fetchAuditData = async (
    params: GetMethodBaseQueryParams
  ): Promise<ApiResponse<AuditResponse>> => {
    const { limit = 50, offset = 0 } = params;

    const res = await AdminAuditTrail.getAuditTrails({ limit, offset });
    setTotalRows(res.totalRows)
    return {
      data: res.audits.map((audit) => ({
        ...audit,
        user: audit.meta.User,
        module: audit.meta.Module,
        action: audit.meta.ActionType,
        target: audit.meta.Target,
        timestamp: audit.meta.Timestamp,
      })),
      totalRows: res.totalRows ?? res.audits.length,
      limit: res.limit,
      offset: res.offset,
    };
  };

  const columns = [
    {
      header: "Timestamp",
      key: "createdAt",
      render: (row: any) => formatDateReport(row.createdAt),
    },
    { header: "User ID", key: "userId" },
    { header: "Username", key: "user" },
    { header: "Module", key: "module" },
    { header: "Action", key: "action" },
    { header: "Target", key: "target" },
    { header: "Status", key: "status", render: () => <p>Success</p> },
  ];

  return (
    <ReportTable
      columns={columns}
      currentPage={currentPage}
      data={data}
      exportFileName="Audit Trail"
      rowsPerPage={rowPerPage}
      setCurrentPage={setCurrentPage}
      setData={setData}
      setRowsPerPage={setRowPerPage}
      title="Audit Trail"
      totalRows={totalRows}
      fetchData={fetchAuditData}
      total={totalRows}
    />
  );
};

export default AuditTrail;
