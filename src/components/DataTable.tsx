import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface DataTableProps<T extends Record<string, unknown>> {
  columns: any[];
  data: T[];
  loading?: boolean;
  searchQuery?: string;
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  loading,
  searchQuery,
}: DataTableProps<T>) {
  const renderEmptyState = () => {
    const message = searchQuery?.trim()
      ? `No records match "${searchQuery}"`
      : "No records found";

    return (
      <TableRow>
        <TableCell
          colSpan={columns.length}
          className="py-8 text-center text-muted-foreground"
        >
          {message}
        </TableCell>
      </TableRow>
    );
  };

  const renderLoadingState = () => (
    <TableRow>
      <TableCell
        colSpan={columns.length}
        className="py-8 text-center text-muted-foreground"
      >
        Loading...
      </TableCell>
    </TableRow>
  );

  const renderDataRows = () =>
    data.map((item, i) => (
      <TableRow key={i}>
        {columns.map((col, idx) => (
          <TableCell key={idx} className="text-center">
            {col.render ? col.render(item) : (item as any)[col.key]}
          </TableCell>
        ))}
      </TableRow>
    ));

  return (
    <div className="rounded-lg border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col, idx) => (
              <TableHead key={idx} className="text-center">
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading
            ? renderLoadingState()
            : data?.length > 0
            ? renderDataRows()
            : renderEmptyState()}
        </TableBody>
      </Table>
    </div>
  );
}
