import { useEffect, useState, type SetStateAction } from "react";
import { Box, CircularProgress, IconButton, Stack } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import DynamicTable from "./DynamicTable";
import { documentColumns } from "../../types/documents";
import type { ProjectDocument } from "../../types/documents";

import { useLazyGetProjectDocumentsQuery } from "../../store/features/documents/documentsApi";

interface Props {
  projectId: string | number;
  expanded?: boolean;
}

export default function DocumentsTable({ projectId, expanded = true }: Props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [trigger, { data, isFetching }] = useLazyGetProjectDocumentsQuery();

  useEffect(() => {
    if (!expanded) return;
    trigger({ project_id: projectId });
  }, [expanded, projectId, trigger]);

  const rows: ProjectDocument[] = data ?? [];

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" py={3}>
        <CircularProgress size={28} />
      </Box>
    );
  }

  const handleEdit = (row: ProjectDocument) => {
    console.log("Edit document:", row);
  };

  const handleDelete = (row: ProjectDocument) => {
    console.log("Delete document:", row);
  };

  return (
    <DynamicTable<ProjectDocument>
      columns={documentColumns}
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
      noRecordsMessage="No documents & certificates found"
      actions={(row) => (
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
