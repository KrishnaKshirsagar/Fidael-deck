import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface AppAccordionProps {
  id: string;
  title: string;
  expanded: boolean;
  onToggle: (id: string) => void;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

const AppAccordion: React.FC<AppAccordionProps> = ({
  id,
  title,
  expanded,
  onToggle,
  actions,
  children,
}) => {
  return (
    <Accordion
      expanded={expanded}
      onChange={() => onToggle(id)}
      elevation={2}
      sx={{
        mb: 2,
        "&:before": { display: "none" },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />} // ✅ NOT IconButton
        sx={{
          backgroundColor: expanded ? "primary.main" : "grey.200",
          color: expanded ? "primary.contrastText" : "text.primary",
          "&:hover": {
            backgroundColor: expanded ? "primary.dark" : "grey.300",
          },
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <Typography variant="h6">{title}</Typography>

          {actions && (
            <Box
              display="flex"
              gap={1}
              onClick={(e) => e.stopPropagation()} // ✅ keep accordion from toggling
            >
              {actions}
            </Box>
          )}
        </Box>
      </AccordionSummary>

      <AccordionDetails sx={{ p: 3 }}>{children}</AccordionDetails>
    </Accordion>
  );
};

export default AppAccordion;
