export interface ReportTableProps<T extends Record<string, unknown>> {
  title: string;
  data: T[];
  currentPage?: number;
  rowsPerPage?: number;
  total?: number;
  setData: (data: T[]) => void;
  setCurrentPage?: (page: number) => void;
  setRowsPerPage?: (rows: number) => void;
  nextPage?: () => Promise<void>; 
  prevPage?: () => Promise<void>;
  sampleData?: T[];
  columns: Array<{
    header: string;
    key: string;
    render?: (item: T) => React.ReactNode;
    align?: 'left' | 'center' | 'right';
  }>;
  exportFileName: string;
  dateKey?: string;
  loading?: boolean;
  useServerPagination?: boolean;
  filterSlot?: React.ReactNode; 
}