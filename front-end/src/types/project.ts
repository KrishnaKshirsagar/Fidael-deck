// front-end/src/types/project.ts
export enum ProjectStatus {
  open = "Open",
  inProgress = "In Progress",
  completed = "Completed",
  onHold = "On Hold",
  cancelled = "Cancelled",
}

export type InstallationCostType = "fixed_cost" | "lumbsum" | "percentage"; // adjust as per DB ENUM

export interface Project {
  project_id?: number | string;

  project_name?: string;
  location?: string;
  city: string;
  pincode?: string;

  customer_name?: string;
  contact_person?: string;
  contact_number?: string;
  email?: string;
  designation?: string;

  max_floor?: number;

  installation_cost_type?: InstallationCostType;
  installation_cost?: number;

  supervisor_name?: string;
  supervisor_mobile?: string;

  pmc_supervisior_name?: string;
  pmc_supervisior_mobile?: string;

  project_start_date?: string; // ISO date string (YYYY-MM-DD)
  project_end_date?: string; // ISO date string (YYYY-MM-DD)

  status: ProjectStatus;

  created_at?: string; // ISO datetime
  created_by?: number;

  updated_at?: string; // ISO datetime
  updated_by?: number;
}
