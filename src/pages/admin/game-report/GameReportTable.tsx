// import { ReportTable } from "@/components/ReportTable";
// import { sampleGameReports } from "@/constant/reportFakeData";
// import { useReportStore } from "@/store/admin/useAdminStore";
// import { formatDateReport } from "@/utils/formatDateReport";

// export const GameReportTable = () => {
//   const {
//     gameReportData,
//     gameCurrentPage,
//     gameRowsPerPage,
//     setGameReportData,
//     setGameCurrentPage,
//     setGameRowsPerPage,
//   } = useReportStore();

//   return (
//     <ReportTable
//       title="Game Reports"
//       data={gameReportData}
//       currentPage={gameCurrentPage}
//       rowsPerPage={gameRowsPerPage}
//       setData={setGameReportData}
//       setCurrentPage={setGameCurrentPage}
//       setRowsPerPage={setGameRowsPerPage}
//       sampleData={sampleGameReports}
//       exportFileName="game_reports"
//       columns={[
//         { header: "Game Name", key: "gameName" },
//         { header: "Match ID", key: "matchId" },
//         {
//           header: "Total Bets",
//           key: "totalBets",
//           render: (row) => row.totalBets.toFixed(4),
//           align: "right",
//         },
//         {
//           header: "Total Wins",
//           key: "totalWins",
//           render: (row) => row.totalWins.toFixed(4),
//           align: "right",
//         },
//         {
//           header: "Service Fee",
//           key: "serviceFee",
//           render: (row) => row.serviceFee.toFixed(4),
//           align: "right",
//         },
//         {
//           header: "Date Created",
//           key: "createdAt",
//           render: (row) => formatDateReport(row.createdAt),
//         },
//       ]}
//     />
//   );
// };
