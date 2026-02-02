import { Box, CssBaseline, useTheme, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { TopBar } from "../components/layout/Header";
import { Sidebar } from "../components/layout/Sidebar";
import { useState, useEffect, useCallback } from "react";

export const Layout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen(!mobileOpen);
  }, [mobileOpen]);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    if (!isMobile && mobileOpen) {
      // Use a microtask to defer the state update
      Promise.resolve().then(() => {
        setMobileOpen(false);
      });
    }
  }, [isMobile, mobileOpen]);

  return (
    <Box>
      <CssBaseline />
      <TopBar onMenuClick={handleDrawerToggle} />
      <Sidebar open={mobileOpen} onClose={handleDrawerToggle} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: "100%",
          ml: { sm: "220px" },
          mt: { xs: "56px", sm: "64px" },
          p: 3,
          minHeight: { xs: "calc(100vh - 56px)", sm: "calc(100vh - 64px)" },
          maxWidth: { sm: `calc(100% - 220px)` },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
