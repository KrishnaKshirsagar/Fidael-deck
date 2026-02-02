import { useState } from "react";
import { Box, Typography, Collapse, IconButton, Paper } from "@mui/material";
import type { PaperProps } from "@mui/material/Paper";
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from "@mui/icons-material";

interface AccordionProps extends PaperProps {
  title: string;
  defaultExpanded?: boolean;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

export const Accordion = ({
  title,
  defaultExpanded = false,
  children,
  actions,
  ...paperProps
}: AccordionProps) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <Paper elevation={2} sx={{ mb: 2, overflow: "hidden" }} {...paperProps}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
          backgroundColor: (theme) =>
            expanded ? theme.palette.primary.main : theme.palette.grey[100],
          color: (theme) =>
            expanded ? theme.palette.primary.contrastText : "inherit",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: (theme) =>
              expanded ? theme.palette.primary.dark : theme.palette.grey[200],
          },
        }}
        onClick={toggleExpanded}
      >
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {actions}
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              toggleExpanded();
            }}
            sx={{
              color: expanded ? "inherit" : "text.primary",
            }}
          >
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>
      </Box>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box sx={{ p: 3 }}>{children}</Box>
      </Collapse>
    </Paper>
  );
};

export default Accordion;
