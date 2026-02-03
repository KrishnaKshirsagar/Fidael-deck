import { useParams, useNavigate } from "react-router-dom";
import {
  useCreateProjectMutation,
  useGetProjectByIdQuery,
  useUpdateProjectMutation,
} from "../../store/features/projects/projectsApi";
import { Box, CircularProgress } from "@mui/material";
import * as Yup from "yup";

import AppAccordion from "../../components/common/Accordion";
import { DynamicForm, type Field } from "../../components/forms/DynamicForm";
import { ProjectStatus, type Project } from "../../types/project";
import { useState } from "react";
import MaterialsTable from "../../components/tables/MaterialsTable";
import LaboursTable from "../../components/tables/LaboursTable";
import ToolsTicketsTable from "../../components/tables/ToolsTicketsTable";
import DocumentsTable from "../../components/tables/DocumentsTable";

/* ---------------------------------- */
/* Initial Values */
/* ---------------------------------- */
const emptyProject: Project = {
  customer_name: "",
  contact_person: "",
  contact_number: "",
  email: "",
  designation: "",

  project_name: "",
  location: "",
  city: "",
  pincode: "",

  max_floor: 1,

  installation_cost_type: "fixed_cost",
  installation_cost: 0,

  supervisor_name: "",
  supervisor_mobile: "",

  pmc_supervisior_name: "",
  pmc_supervisior_mobile: "",

  project_start_date: "",
  project_end_date: "",

  status: ProjectStatus.open,
};

/* ---------------------------------- */
/* Fields config */
/* ---------------------------------- */
const fields: Field[] = [
  { name: "customer_name", label: "Customer Name", required: true },
  { name: "contact_person", label: "Contact Person", required: true },
  { name: "contact_number", label: "Contact Number" },
  { name: "email", label: "Email ID", type: "email" },
  { name: "designation", label: "Designation" },

  { name: "project_name", label: "Project Name", required: true },
  { name: "location", label: "Location" },
  { name: "city", label: "City" },
  { name: "pincode", label: "Pincode" },

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
    required: true,
    options: Object.values(ProjectStatus).map((s) => ({
      label: s,
      value: s,
    })),
  },
];

/* ---------------------------------- */
/* Validation */
/* ---------------------------------- */
const validationSchema = Yup.object({
  customer_name: Yup.string().required("Customer Name is required"),
  contact_person: Yup.string().required("Contact Person is required"),
  project_name: Yup.string().required("Project Name is required"),
  status: Yup.string().required("Status is required"),
});

/* ---------------------------------- */
/* Page */
/* ---------------------------------- */
export default function AddEditProject() {
  const { project_id } = useParams<{ project_id: string }>();
  const navigate = useNavigate();

  const [expanded, setExpanded] = useState<string | false>("materials");

  const handleToggle = (id: string) => {
    setExpanded((prev) => (prev === id ? false : id));
  };

  const { data: project, isLoading: isFetching } = useGetProjectByIdQuery(
    project_id!,
    { skip: !project_id },
  );

  const [createProject, { isLoading: isCreating }] = useCreateProjectMutation();
  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();

  const handleSubmit = async (values: Project) => {
    if (project_id) {
      await updateProject({ id: project_id, changes: values }).unwrap();
    } else {
      await createProject(values).unwrap();
    }
    navigate("/projects");
  };

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <h2>{project_id ? "Edit Project" : "Add Project"}</h2>

      {/* -------- FORM (UNCHANGED) -------- */}
      <DynamicForm<Project>
        fields={fields}
        initialValues={project ?? emptyProject}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        isLoading={isCreating || isUpdating}
        submitText={project_id ? "UPDATE PROJECT" : "ADD PROJECT"}
      />

      {/* -------- ACCORDION GROUP (EDIT MODE ONLY) -------- */}
      {project_id && (
        <Box mt={4}>
          <AppAccordion
            id="materials"
            title="MATERIALS"
            expanded={expanded === "materials"}
            onToggle={handleToggle}
            children={
              <MaterialsTable
                projectId={project_id!}
                expanded={expanded === "materials"}
              />
            }
          ></AppAccordion>

          <AppAccordion
            id="labours"
            title="LABOURS"
            expanded={expanded === "labours"}
            onToggle={handleToggle}
            children={
              <LaboursTable
                projectId={project_id!}
                expanded={expanded === "labours"}
              />
            }
          >
            {/* Labours content */}
          </AppAccordion>

          <AppAccordion
            id="toolsTickets"
            title="TOOLS & TACKLES"
            expanded={expanded === "toolsTickets"}
            onToggle={handleToggle}
            children={
              <ToolsTicketsTable
                projectId={project_id!}
                expanded={expanded === "toolsTickets"}
              />
            }
          ></AppAccordion>

          <AppAccordion
            id="documents"
            title="DOCUMENTS & CERTIFICATES"
            expanded={expanded === "documents"}
            onToggle={handleToggle}
          >
            <DocumentsTable
              projectId={project_id!}
              expanded={expanded === "documents"}
            />
          </AppAccordion>
        </Box>
      )}
    </Box>
  );
}
