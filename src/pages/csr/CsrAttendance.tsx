import Image from "@/components/Image";
import Text from "@/components/Text";
import { ICONS } from "@/constant/image";
import AttendanceTable from "./components/AttendanceTable";
import { PDFDownloadLink } from "@react-pdf/renderer";
import AttendancePDF from "./components/PDFDownload";
import ProfileCard from "./components/ProfileCard";
import { useEffect } from "react";
import { useAttendance } from "@/hooks/csr/useAttendance";

const CsrAttendance = () => {
  const { getAttendanceById } = useAttendance();
  useEffect(() => {
    getAttendanceById();
  }, []);

  return (
    <div className="px-10 py-5 h-full">
      <div className="flex gap-6 h-full">
        <ProfileCard />
        <div className="flex-9 flex flex-col">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Image path={ICONS.profile.src} className="h-[40px]" />
              <Text text="My Attendance" type="h2" color="primary" />
            </div>
            <PDFDownloadLink
              document={<AttendancePDF />}
              fileName="attendance-sheet.pdf"
            >
              <>
                {({ loading }: { loading: boolean }) =>
                  loading ? "Loading document..." : "Download PDF"
                }

                <Image path={ICONS.excel_dl.src} className="h-[35px]" />
              </>
            </PDFDownloadLink>
          </div>
          <div className="flex-1">
            <AttendanceTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CsrAttendance;
