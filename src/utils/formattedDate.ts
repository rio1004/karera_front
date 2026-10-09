import dayjs from "dayjs";


export function formattedDate(date: string | Date): string {
  return dayjs(date).format("MMMM D, YYYY").toUpperCase();
}

export const formatDateReport = (dateString: string) => {
  return dayjs(dateString).format('YYYY-MM-DD');
};