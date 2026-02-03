import type { Column } from "./column";

export type DocumentStatus = "pending" | "approved" | "rejected";

export interface ProjectDocument {
  doc_id: string | number;
  title: string;
  type: string;
  details?: string;
  file_url?: string;

  status: DocumentStatus;

  updated_by?: string;
  updated_on?: string;

  reviewed_by?: string;
  reviewed_on?: string;
}

export const documentColumns: Column<ProjectDocument>[] = [
  {
    id: "doc_id",
    label: "Doc ID",
    minWidth: 80,
  },
  {
    id: "title",
    label: "Title",
    minWidth: 160,
  },
  {
    id: "type",
    label: "Type",
    minWidth: 120,
  },
  {
    id: "details",
    label: "Details",
    minWidth: 200,
    renderCell: (row) => row.details ?? "-",
  },
  {
    id: "file_url",
    label: "Files",
    minWidth: 120,
    renderCell: (row) =>
      row.file_url ? (
        <a href={row.file_url} target="_blank" rel="noopener noreferrer">
          View File
        </a>
      ) : (
        "-"
      ),
  },
  {
    id: "status",
    label: "Status",
    minWidth: 120,
  },
  {
    id: "updated_by",
    label: "Updated By",
    minWidth: 140,
  },
  {
    id: "updated_at",
    label: "Updated At",
    minWidth: 160,
    format: (value) => (value ? new Date(value).toLocaleDateString() : "-"),
  },
  {
    id: "reviewed_by",
    label: "Reviewed By",
    minWidth: 140,
  },
  {
    id: "reviewed_at",
    label: "Reviewed At",
    minWidth: 160,
    format: (value) => (value ? new Date(value).toLocaleDateString() : "-"),
  },
];
