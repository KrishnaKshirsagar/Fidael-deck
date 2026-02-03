import type { Column } from "./column";

export interface Product {
  material_id: number;
  material_name: string;
  installation_cost: number;
  consumed_qty: number;
  total_qty: number;
  consumed_percent: number;
  updated_by: string;
  updated_at: string;
  project_id?: string;
}

export const materialColumns: Column<Product>[] = [
  {
    id: "material_id",
    label: "Material ID",
    minWidth: 120,
  },

  {
    id: "material_name",
    label: "Material Name",
    minWidth: 180,
  },
  {
    id: "installation_cost",
    label: "Installation Cost",
    align: "right",
    format: (value: number) => `₹ ${value.toLocaleString()}`,
  },
  {
    id: "consumed_qty",
    label: "Consumed Qty",
    align: "right",
  },
  {
    id: "total_qty",
    label: "Total Qty",
    align: "right",
  },
  {
    id: "consumed_percent",
    label: "Consumed %",
    align: "right",
    format: (value: number) => `${value}%`,
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
    format: (value: string) => new Date(value).toLocaleDateString(),
  },
];
