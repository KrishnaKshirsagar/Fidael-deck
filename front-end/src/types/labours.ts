import type { Column } from "./column";

export interface Labour {
  id: number;
  name: string;
  mobile_number: string;
  type: string;
  updated_by: string;
  updated_at: string;
}

export const labourColumns: Column<Labour>[] = [
  { id: "labour_id", label: "ID", minWidth: 60 },
  { id: "name", label: "Name", minWidth: 150 },
  { id: "mobile_number", label: "Mobile Number", minWidth: 140 },
  { id: "type", label: "Type", minWidth: 120 },
  { id: "updated_by", label: "Updated By", minWidth: 120 },
  { id: "updated_at", label: "Updated At", minWidth: 120 },
];
