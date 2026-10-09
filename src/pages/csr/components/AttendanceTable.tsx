import Text from "@/components/Text";
import { useAttendance } from "@/hooks/csr/useAttendance";
import { useAttendanceStore } from "@/store/csr/useAttendanceStore";

const AttendanceTable = () => {
  const { attendanceRecords } = useAttendanceStore();
  const { isFetching } = useAttendance();

  return (
    <div className="rounded-lg border border-gray-200 shadow-md overflow-hidden">
      <div className="overflow-y-auto h-[70vh]">
        {isFetching ? (
          <Text type="h2" text="Loading..." />
        ) : attendanceRecords.length > 0 ? (
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-2 font-semibold text-gray-700">Date</th>
                <th className="px-4 py-2 font-semibold text-gray-700">
                  Check In
                </th>
                <th className="px-4 py-2 font-semibold text-gray-700">
                  Check Out
                </th>
                <th className="px-4 py-2 font-semibold text-gray-700">
                  Total Hours
                </th>
                <th className="px-4 py-2 font-semibold text-gray-700">
                  Payable Hours
                </th>
                <th className="px-4 py-2 font-semibold text-gray-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.map((row, idx) => (
                <tr key={idx} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{row.date}</td>
                  <td className="px-4 py-2">{row.checkIn ?? "-"}</td>
                  <td className="px-4 py-2">{row.checkOut ?? "-"}</td>
                  <td className="px-4 py-2 text-green-600 font-medium">
                    {row.totalHours}
                  </td>
                  <td className="px-4 py-2">{row.payableHours}</td>
                  <td className="px-4 py-2">
                    <span className="flex items-center gap-2">
                      <span
                        className={`w-3 h-3 rounded-[5px] ${
                          row.status === "Present"
                            ? "bg-green-600"
                            : "bg-yellow-500"
                        }`}
                      ></span>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <Text type="h2" text="No records" />
        )}
      </div>
    </div>
  );
};

export default AttendanceTable;
