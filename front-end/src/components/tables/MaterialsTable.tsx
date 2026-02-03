/* eslint-disable @typescript-eslint/no-explicit-any */
// components/materials/MaterialsTable.tsx
import { useEffect, useState, type SetStateAction } from "react";
import { Box, CircularProgress, IconButton, Stack } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import DynamicTable from "./DynamicTable";
import { materialColumns } from "../../types/product";
import { useLazyGetMaterialsQuery } from "../../store/features/materials/materialsApi";
import type { Product } from "../../types/product";

interface Props {
  projectId?: string | number;
  expanded?: boolean;
}

export default function MaterialsTable({ projectId, expanded = true }: Props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [trigger, { data, isFetching }] = useLazyGetMaterialsQuery();

  /* 🔥 Lazy Fetch Logic */
  useEffect(() => {
    if (!expanded) return;

    trigger(projectId ? { project_id: projectId } : {});
  }, [expanded, projectId, trigger]);

  /* 🛠️ Action handlers */
  const handleEdit = (row: Product) => {
    console.log("Edit material:", row);
    // open edit dialog / navigate
  };

  const handleDelete = (row: Product) => {
    console.log("Delete material:", row);
    // open confirmation dialog
  };

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" py={3}>
        <CircularProgress size={28} />
      </Box>
    );
  }

  const rows: Product[] = data ?? [];

  return (
    <DynamicTable<Product>
      columns={materialColumns}
      rows={rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
      count={rows.length}
      page={page}
      rowsPerPage={rowsPerPage}
      onPageChange={(_: any, newPage: SetStateAction<number>) =>
        setPage(newPage)
      }
      onRowsPerPageChange={(e: { target: { value: string } }) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
      }}
      noRecordsMessage={
        projectId ? "No materials found for this project" : "No materials found"
      }
      actions={(row: Product) => (
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
