import * as Yup from "yup";
import { Box } from "@mui/material";
import { DynamicForm, type Field } from "../../components/forms/DynamicForm";
import { ProjectStatus, type Project } from "../../types/project";

interface Props {
  initialValues: Project;
  onSubmit: (values: Project) => Promise<void>;
  isLoading?: boolean;
  isEdit?: boolean;
}

export function ProjectForm({
  initialValues,
  onSubmit,
  isLoading,
  isEdit,
}: Props) {
  const fields: Field[] = [
    { name: "customer_name", label: "Customer Name", required: true },
    { name: "contact_person", label: "Contact Person", required: true },
    { name: "contact_number", label: "Contact Number", required: true },
    { name: "email", label: "Email ID", type: "email" },

    { name: "designation", label: "Designation" },
    { name: "project_name", label: "Project Name", required: true },
    { name: "location", label: "Location", required: true },
    { name: "city", label: "City", required: true },

    { name: "max_floor", label: "Floor Count", type: "number" },

    {
      name: "installation_cost_type",
      label: "Installation Cost Type",
      type: "select",
      options: [
        { label: "Fixed Cost", value: "fixed_cost" },
        { label: "Lump Sum", value: "lumbsum" },
        { label: "Percentage", value: "percentage" },
      ],
    },
    { name: "installation_cost", label: "Installation Cost", type: "number" },

    { name: "supervisor_name", label: "Supervisor Name" },
    { name: "supervisor_mobile", label: "Supervisor Mobile" },
    { name: "pmc_supervisior_name", label: "PMC Supervisor Name" },
    { name: "pmc_supervisior_mobile", label: "PMC Supervisor Mobile" },

    { name: "project_start_date", label: "Start Date", type: "date" },
    { name: "project_end_date", label: "End Date", type: "date" },

    {
      name: "status",
      label: "Status",
      type: "select",
      options: Object.values(ProjectStatus).map((s) => ({
        label: s,
        value: s,
      })),
    },
  ];

  const validationSchema = Yup.object({
    customer_name: Yup.string().required(),
    contact_person: Yup.string().required(),
    project_name: Yup.string().required(),
    status: Yup.string().required(),
  });

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <h2>{isEdit ? "Edit Project" : "Add Project"}</h2>
      <DynamicForm<Project>
        fields={fields}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        isLoading={isLoading}
        submitText={isEdit ? "UPDATE PROJECT" : "ADD PROJECT"}
      />
    </Box>
  );
}
