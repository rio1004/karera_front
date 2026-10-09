interface HeaderInfoProps {
  title: string;
  totalRows: number;
  start: number;
  end: number;
  searchQuery?: string;
}

export function HeaderInfo({ title, totalRows, start, end, searchQuery }: HeaderInfoProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-sm text-muted-foreground mt-1">
        Total Records: {totalRows} | Showing {start}-{end}
        {searchQuery?.trim() && (
          <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
            Filtered by: "{searchQuery}"
          </span>
        )}
      </p>
    </div>
  );
}