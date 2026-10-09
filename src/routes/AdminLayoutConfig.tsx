import { ArchiveTransactionTable } from "@/pages/admin/ArchiveTransactions/ArchiveTransactions";
import ArchiveUser from "@/pages/admin/ArchiveUsers";
import AuditTrail from "@/pages/admin/AuditTrail";
import { GameOfferingTable } from "@/pages/admin/game-offering/GameOfferingTable";
import { GiftReport } from "@/pages/admin/gifts/GiftReportTable";
import { Accounting } from "@/pages/admin/reports/Accounting";
import { Operator } from "@/pages/admin/reports/Operator";
import { Pagcor } from "@/pages/admin/reports/Pagcor";
import { RolesAndPermissions } from "@/pages/admin/roles-and-permission/RolesAndPermissions";
import { TransactionReportTable } from "@/pages/admin/transactions/TransactionReportTable";
import { UserReportTable } from "@/pages/admin/users/UserManagement";
import { FileText, GiftIcon, LockIcon, User2 } from "lucide-react";
import type { ReactNode } from "react";

type SubRoutes = {
  title: string;
  icon: ReactNode;
  path: string;
  element: ReactNode;
};

type AuthTypes = {
  title?: string;
  element?: ReactNode;
  icon: ReactNode;
  path: string;
  type?: string;
  subRoutes?: SubRoutes[];
};
export const AdminLayoutConfig: AuthTypes[] = [
  {
    path: "user-management",
    title: "User Management",
    icon: <User2 />,
    element: <UserReportTable />,
  },
  {
    path: "reports",
    title: "Reports",
    icon: <FileText />,
    type: "subpages",
    subRoutes: [
      {
        icon: <FileText />,
        path: "reports/ggr-operator",
        title: "GGR ACCOUNTING",
        element: <Operator />,
      },
      {
        icon: <FileText />,
        path: "reports/ggr-accounting",
        title: "GGR ACCOUNTING",
        element: <Accounting />,
      },
      {
        icon: <FileText />,
        path: "reports/ggr-pagcor",
        title: "GGR PAGCOR",
        element: <Pagcor />,
      },
    ],
  },
  {
    path: "transaction-reports",
    title: "Transaction Reports",
    icon: <FileText />,
    element: <TransactionReportTable />,
  },
  {
    path: "archive-transaction-reports",
    title: "Archive Transaction Reports",
    icon: <FileText />,
    element: <ArchiveTransactionTable />,
  },
  {
    path: "role-permissions",
    title: "Role and Permissions",
    icon: <LockIcon />,
    element: <RolesAndPermissions />,
  },
  {
    path: "gift-reports",
    title: "Gift Reports",
    icon: <GiftIcon />,
    element: <GiftReport />,
  },
  {
    path: "game-offering",
    title: "Game Offering",
    icon: <FileText />,
    element: <GameOfferingTable />,
  },
  {
    path: "user-archive",
    title: "Archive User Management",
    icon: <FileText />,
    element: <ArchiveUser />,
  },
  {
    path: "audit-trail",
    title: "Audit trail",
    icon: <FileText />,
    element: <AuditTrail />,
  },
];
