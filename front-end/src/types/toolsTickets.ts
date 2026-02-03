// types/tools.ts
export interface ToolTickets {
  tool_id: number;
  equipment_name: string;
  equipment_type: string;
  make: string;
  usage: "Existing" | "New" | "Rented";
  quantity: number;
  updated_by: string;
  updated_at: string;
  project_id?: string | number;
}

export const toolColumns = [
  { id: "tool_id", label: "Eq ID" },
  { id: "equipment_name", label: "Equipment Name" },
  { id: "equipment_type", label: "Equipment Type" },
  { id: "make", label: "Make" },
  { id: "usage", label: "Usage" },
  { id: "quantity", label: "Quantity" },
  { id: "updated_by", label: "Updated By" },
  { id: "updated_at", label: "Updated At" },
];
