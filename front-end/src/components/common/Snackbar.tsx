import { Alert, Snackbar as MuiSnackbar, type AlertColor } from "@mui/material";
import { useState, type ReactNode } from "react";
import { SnackbarContext } from "../../contexts/SnackbarContext";

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<AlertColor>("success");

  const showMessage = (message: string, severity: AlertColor = "success") => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ showMessage }}>
      {children}
      <MuiSnackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </MuiSnackbar>
    </SnackbarContext.Provider>
  );
};

// useSnackbar hook is now imported from @/contexts/SnackbarContext
