import * as XLSX from "xlsx";

export function exportToExcel<T>(
  data: T[],
  filename: string,
  columns?: {
    header: string;
    key: keyof T | string;
    render?: (item: T) => any;
  }[]
) {
  let exportData: Record<string, any>[] = [];

  if (columns && columns.length > 0) {
    exportData = data.map((item) => {
      const row: Record<string, any> = {};
      columns.forEach((col) => {
        const value = col.render ? col.render(item) : (item as any)[col.key];
        row[col.header] = value;
      });
      return row;
    });
  } else {
    exportData = data as Record<string, any>[];
  }

  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet);

  XLSX.writeFile(workbook, `${filename}.xlsx`);
}
