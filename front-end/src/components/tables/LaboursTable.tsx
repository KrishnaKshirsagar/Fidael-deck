// components/tables/LaboursTable.tsx
import { useEffect, useState, type SetStateAction } from "react";
import { Box, CircularProgress, IconButton, Stack } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import DynamicTable from "./DynamicTable"; // ✅ FIXED PATH
import { labourColumns } from "../../types/labours";
import type { Labour } from "../../types/labours";
import {
  useLazyGetLaboursQuery,
  // useDeleteLabourMutation,
} from "../../store/features/labours/laboursApi";

interface Props {
  projectId?: string | number;
  expanded?: boolean;
}

export default function LaboursTable({ projectId, expanded = true }: Props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [trigger, { data, isFetching }] = useLazyGetLaboursQuery();
  // const [deleteLabour] = useDeleteLabourMutation();

  /* 🔥 This WILL run now */
  useEffect(() => {
    if (!expanded) return;

    trigger(projectId ? { project_id: projectId } : {});
  }, [expanded, projectId, trigger]);

  const rows: Labour[] = data ?? [];

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" py={3}>
        <CircularProgress size={28} />
      </Box>
    );
  }

  /* 🛠️ Action handlers */
  const handleEdit = (row: Labour) => {
    console.log("Edit material:", row);
    // open edit dialog / navigate
  };

  const handleDelete = (row: Labour) => {
    console.log("Delete material:", row);
    // open confirmation dialog
  };

  return (
    <DynamicTable<Labour>
      columns={labourColumns}
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
        projectId ? "No labours found for this project" : "No labours found"
      }
      actions={(row: Labour) => (
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
