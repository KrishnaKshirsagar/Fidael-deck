/* eslint-disable @typescript-eslint/no-explicit-any */
// front-end/src/components/common/DynamicTable.tsx
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Box,
  IconButton,
  Tooltip,
  TableSortLabel,
} from "@mui/material";
import * as XLSX from "xlsx";
import type { Column } from "../../types/column";

interface DynamicTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  page: number;
  rowsPerPage: number;
  count: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  actions?: (row: T) => React.ReactNode;
  noRecordsMessage?: string;
  size?: "small" | "medium";
  orderBy?: string;
  order?: "asc" | "desc";
  onSort?: (property: string) => void;
}

const DynamicTable = <T extends { [key: string]: any }>({
  columns,
  rows,
  page,
  rowsPerPage,
  count,
  onPageChange,
  onRowsPerPageChange,
  actions,
  noRecordsMessage = "No records found",
  size = "medium",
  orderBy = "",
  order = "asc",
  onSort,
}: DynamicTableProps<T>) => {
  const handleExportExcel = () => {
    const data = rows.map((row) =>
      columns.reduce((acc, column) => {
        const value = column.renderCell
          ? column.renderCell(row)
          : row[column.id];
        return {
          ...acc,
          [column.label]: value?.toString() || "",
        };
      }, {}),
    );

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "table_data.xlsx");
  };

  const handleSort = (property: string) => {
    if (onSort) {
      onSort(property);
    }
  };

  return (
    <Box width="100%">
      {rows.length > 0 && (
        <Box display="flex" justifyContent="flex-end" mb={1}>
          <Tooltip title="Export to Excel" arrow>
            <IconButton
              onClick={handleExportExcel}
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: "50%",
                p: 1.2,
                transition: "0.2s",
                "&:hover": {
                  backgroundColor: "primary.main",
                  color: "#fff",
                },
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </IconButton>
          </Tooltip>
        </Box>
      )}

      <TableContainer
        component={Paper}
        sx={{
          width: "100%",
          overflowX: "auto",
          "& .MuiTable-root": {
            minWidth: "100%",
            tableLayout: "fixed",
          },
          "& .MuiTableCell-root": {
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          },
        }}
      >
        <Table stickyHeader size={size} style={{ width: "100%" }}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontWeight: "bold" }}
                  sortDirection={orderBy === column.id ? order : false}
                >
                  {onSort ? (
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : "asc"}
                      onClick={() => handleSort(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
              {actions && (
                <TableCell style={{ fontWeight: "bold" }}>Actions</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (actions ? 1 : 0)}
                  align="center"
                  style={{ padding: "40px 16px" }}
                >
                  {noRecordsMessage}
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row, index) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={index}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": { backgroundColor: "action.hover" },
                  }}
                >
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.renderCell
                          ? column.renderCell(row)
                          : column.format
                            ? column.format(value)
                            : value}
                      </TableCell>
                    );
                  })}
                  {actions && (
                    <TableCell align="right">{actions(row)}</TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {count > 0 && (
        <Box
          sx={{
            width: "100%",
            overflowX: "auto",
            mt: 2,
            "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
              {
                marginBottom: 0,
              },
          }}
        >
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            component="div"
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={onPageChange}
            onRowsPerPageChange={onRowsPerPageChange}
            sx={{
              "& .MuiTablePagination-toolbar": {
                paddingLeft: 0,
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default DynamicTable;
