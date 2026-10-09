import { useAttendanceStore } from "@/store/csr/useAttendanceStore";
import {
  Document as PDFDocument,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 10,
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 30,
    backgroundColor: "#ccc", // placeholder gray box
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
  },
  infoSection: {
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  table: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#000",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#f0f0f0",
    padding: 4,
    fontWeight: "bold",
  },
  tableCol: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#000",
    padding: 4,
  },
  footer: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 8,
    color: "grey",
  },
});

const AttendancePDF = () => {
  const { attendanceRecords } = useAttendanceStore();
  return (
    <PDFDocument>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logo}>
            <Text>KARERA.LIVE</Text>
          </View>
          <Text style={styles.title}>Attendance Sheet</Text>
        </View>

        {/* Employee Info */}
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Text>Employee Name: Princess Gonzales</Text>
            <Text>Period: January 2025</Text>
          </View>
          <View style={styles.infoRow}>
            <Text>Role: Customer Support</Text>
          </View>
        </View>

        {/* Table */}
        <View style={styles.table}>
          {/* Header Row */}
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>Date</Text>
            <Text style={styles.tableColHeader}>Check In</Text>
            <Text style={styles.tableColHeader}>Check Out</Text>
            <Text style={styles.tableColHeader}>Total Hours</Text>
            <Text style={styles.tableColHeader}>Payable Hours</Text>
            <Text style={styles.tableColHeader}>Status</Text>
          </View>

          {/* Data Rows */}
          {attendanceRecords.map((row, i) => (
            <View style={styles.tableRow} key={i}>
              <Text style={styles.tableCol}>{row.date}</Text>
              <Text style={styles.tableCol}>{row.checkIn}</Text>
              <Text style={styles.tableCol}>{row.checkOut}</Text>
              <Text style={styles.tableCol}>{row.totalHours}</Text>
              <Text style={styles.tableCol}>{row.payableHours}</Text>
              <Text style={styles.tableCol}>{row.status}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.footer}>Page 1 of 1</Text>
      </Page>
    </PDFDocument>
  );
};

export default AttendancePDF;
