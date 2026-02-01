import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

interface Option {
  label: string;
  value: string;
}

interface FilterProps {
  search: string;
  onSearchChange: (value: string) => void;

  // ✅ Optional status filter
  statusFilter?: string;
  onStatusChange?: (value: string) => void;
  statusOptions?: Option[];
  showAllStatusOption?: boolean; // new

  // ✅ Optional date filter
  dateFilter?: string;
  onDateFilterChange?: (value: string) => void;
  dateOptions?: Option[];
  showAllDateOption?: boolean; // new

  startDate?: string | null;
  onStartDateChange?: (value: string | null) => void;

  endDate?: string | null;
  onEndDateChange?: (value: string | null) => void;
}

const Filters: React.FC<FilterProps> = ({
  search,
  onSearchChange,

  statusFilter,
  onStatusChange,
  statusOptions = [],
  showAllStatusOption,

  dateFilter,
  onDateFilterChange,
  dateOptions = [],
  showAllDateOption,
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        mb: 2,
        flexWrap: "wrap",
      }}
    >
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        {/* 🔍 Search */}
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          sx={{ width: 160 }}
        />

        {/* ✅ Status filter (optional) */}
        {onStatusChange && (
          <FormControl size="small" sx={{ width: 160 }}>
            <InputLabel shrink>Status</InputLabel>
            <Select
              label="Status"
              value={statusFilter ?? ""}
              displayEmpty
              onChange={(e) => onStatusChange(e.target.value)}
            >
              {showAllStatusOption && <MenuItem value="">All</MenuItem>}
              {statusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {/* ✅ Date filter (optional) */}
        {onDateFilterChange && (
          <FormControl size="small" sx={{ width: 160 }}>
            <InputLabel shrink>Date</InputLabel>
            <Select
              label="Date"
              value={dateFilter ?? ""}
              displayEmpty
              onChange={(e) => onDateFilterChange(e.target.value)}
            >
              {showAllDateOption && <MenuItem value="">All</MenuItem>}
              {dateOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {/* 📅 Custom date pickers (only if dateFilter is "custom") */}
        {dateFilter === "custom" && onStartDateChange && onEndDateChange && (
          <>
            <TextField
              label="Start Date"
              type="date"
              size="small"
              InputLabelProps={{ shrink: true }}
              value={startDate ?? ""}
              onChange={(e) => onStartDateChange(e.target.value || null)}
              inputProps={{ max: endDate ?? undefined }}
            />
            <TextField
              label="End Date"
              type="date"
              size="small"
              InputLabelProps={{ shrink: true }}
              value={endDate ?? ""}
              onChange={(e) => onEndDateChange(e.target.value || null)}
              inputProps={{ min: startDate ?? undefined }}
            />
          </>
        )}
      </Box>
    </Box>
  );
};

export default Filters;
