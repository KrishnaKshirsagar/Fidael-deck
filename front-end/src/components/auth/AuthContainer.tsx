import { Box, Container, Typography, useTheme } from "@mui/material";
import type { ReactNode } from "react";

interface AuthContainerProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
}

export const AuthContainer = ({
  title,
  subtitle,
  children,
  maxWidth = "xs",
}: AuthContainerProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.palette.grey[100],
        p: 2,
        overflow: "auto",
      }}
    >
      <Container
        component="main"
        maxWidth={maxWidth}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100%",
          py: 4,
        }}
      >
        <Box
          sx={{
            width: "100%",
            padding: { xs: theme.spacing(3), sm: theme.spacing(4) },
            borderRadius: theme.shape.borderRadius,
            boxShadow: theme.shadows[2],
            backgroundColor: theme.palette.background.paper,
            maxWidth: "100%",
            boxSizing: "border-box",
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            align="center"
            sx={{
              fontWeight: 600,
              color: theme.palette.primary.main,
              mb: 2,
            }}
          >
            {title}
          </Typography>

          {subtitle && (
            <Typography
              variant="body1"
              color="textSecondary"
              align="center"
              sx={{ mb: 4 }}
            >
              {subtitle}
            </Typography>
          )}

          {children}
        </Box>
      </Container>
    </Box>
  );
};
