export interface Column<T> {
  id: string;
  label: string;
  minWidth?: number;
  align?: "left" | "right" | "center";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  format?: (value: any) => string | React.ReactNode;
  renderCell?: (row: T) => React.ReactNode;
}
