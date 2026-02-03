import React, { useState } from "react";
import { useGetProjectsQuery } from "../../store/features/projects/projectsApi";
import DynamicTable from "../../components/tables/DynamicTable";
import Filters from "../../components/common/Filters";
import { type Project, ProjectStatus } from "../../types/project";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

const Projects: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // const [statusFilter, setStatusFilter] = useState<ProjectStatus | "all">(
  //   "all",
  // );

  const [statusFilter, setStatusFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: projects = [],
    isLoading,
    isError,
  } = useGetProjectsQuery({
    status: statusFilter !== "all" ? statusFilter : undefined,
    search: searchQuery,
  });

  const navigate = useNavigate();

  const columns = [
    { id: "project_id", label: "Project ID", minWidth: 100 },

    { id: "project_name", label: "Project Name", minWidth: 180 },

    { id: "location", label: "Client", minWidth: 160 },

    { id: "city", label: "City", minWidth: 120 },

    {
      id: "status",
      label: "Status",
      minWidth: 120,
      align: "center" as const,
      renderCell: (row: Project) => (
        <span
          style={{
            backgroundColor: getStatusColor(row.status),
            color: "white",
            padding: "4px 10px",
            borderRadius: "12px",
            fontSize: "0.75rem",
            fontWeight: 500,
          }}
        >
          {row.status}
        </span>
      ),
    },

    {
      id: "project_start_date",
      label: "Start Date",
      minWidth: 120,
      renderCell: (row: Project) =>
        row.project_start_date
          ? new Date(row.project_start_date).toLocaleDateString()
          : "-",
    },

    {
      id: "project_end_date",
      label: "End Date",
      minWidth: 120,
      renderCell: (row: Project) =>
        row.project_end_date
          ? new Date(row.project_end_date).toLocaleDateString()
          : "-",
    },

    {
      id: "supervisor_name",
      label: "Supervisor",
      minWidth: 150,
    },

    {
      id: "installation_cost",
      label: "Installation Cost",
      minWidth: 150,
      align: "right" as const,
      renderCell: (row: Project) =>
        row.installation_cost
          ? `₹ ${row.installation_cost.toLocaleString()}`
          : "-",
    },

    {
      id: "created_at",
      label: "Created At",
      minWidth: 140,
      renderCell: (row: Project) =>
        row.created_at ? new Date(row.created_at).toLocaleDateString() : "-",
    },

    {
      id: "actions",
      label: "Actions",
      minWidth: 120,
      align: "right" as const,
      renderCell: (row: Project) => (
        <Button
          variant="outlined"
          size="small"
          onClick={() => navigate(`/projects/${row.project_id}`)}
        >
          View
        </Button>
      ),
    },
  ];

  const getStatusColor = (status: ProjectStatus) => {
    const statusColors: Record<ProjectStatus, string> = {
      Open: "#4caf50",
      "In Progress": "#1976d2",
      Completed: "#9c27b0",
      "On Hold": "#ff9800",
      Cancelled: "#f44336",
    };
    return statusColors[status] || "#757575";
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading projects</div>;

  // Status options for the filter
  const statusOptions = Object.values(ProjectStatus).map((status) => ({
    label: status,
    value: status,
  }));

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <h2 style={{ margin: 0 }}>Projects</h2>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate("/projects/new")}
          sx={{ whiteSpace: "nowrap" }}
        >
          Add Project
        </Button>
      </div>

      {/* Filters */}
      <Filters
        search={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={(value) =>
          setStatusFilter(value as ProjectStatus | "all")
        }
        statusOptions={statusOptions}
        showAllStatusOption
      />

      <DynamicTable<Project>
        columns={columns}
        rows={projects}
        page={page}
        rowsPerPage={rowsPerPage}
        count={projects.length}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        noRecordsMessage="No projects found. Click 'Add Project' to create one."
      />
    </div>
  );
};

export default Projects;
