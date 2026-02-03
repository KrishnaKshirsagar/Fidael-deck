// components/tables/ToolsTicketsTable.tsx
import { useEffect, useState, type SetStateAction } from "react";
import { Box, CircularProgress, IconButton, Stack } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import DynamicTable from "./DynamicTable";
import { toolColumns, type ToolTickets } from "../../types/toolsTickets";

import {
  useLazyGetToolsQuery,
  // useDeleteToolMutation,
} from "../../store/features/toolsTickets/toolsTicketsApi";

interface Props {
  projectId?: string | number;
  expanded?: boolean;
}

export default function ToolsTicketsTable({
  projectId,
  expanded = true,
}: Props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [trigger, { data, isFetching }] = useLazyGetToolsQuery();
  // const [deleteTool] = useDeleteToolMutation();

  /* 🔥 Fetch tools (all OR project-wise) */
  useEffect(() => {
    if (!expanded) return;

    trigger(projectId ? { project_id: projectId } : {});
  }, [expanded, projectId, trigger]);

  const rows: ToolTickets[] = data ?? [];

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" py={3}>
        <CircularProgress size={28} />
      </Box>
    );
  }

  /* 🛠️ Action handlers */
  const handleEdit = (row: ToolTickets) => {
    console.log("Edit tool:", row);
    // open edit dialog
  };

  const handleDelete = (row: ToolTickets) => {
    console.log("Delete tool:", row);
    // open confirmation dialog
  };

  return (
    <DynamicTable<ToolTickets>
      columns={toolColumns}
      rows={rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
      count={rows.length}
      page={page}
      rowsPerPage={rowsPerPage}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onPageChange={(_: any, newPage: SetStateAction<number>) =>
        setPage(newPage)
      }
      onRowsPerPageChange={(e: { target: { value: string } }) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
      }}
      noRecordsMessage={
        projectId
          ? "No tools & tackles found for this project"
          : "No tools & tackles found"
      }
      actions={(row: ToolTickets) => (
        <Stack direction="row" spacing={0.5}>
          <IconButton size="small" onClick={() => handleEdit(row)}>
            <EditOutlinedIcon fontSize="small" />
          </IconButton>

          <IconButton
            size="small"
            color="error"
            onClick={() => handleDelete(row)}
          >
            <DeleteOutlineOutlinedIcon fontSize="small" />
          </IconButton>
        </Stack>
      )}
    />
  );
}
