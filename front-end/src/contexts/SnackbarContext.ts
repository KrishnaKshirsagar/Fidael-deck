import { createContext, useContext } from "react";
import { type AlertColor } from "@mui/material";

type SnackbarContextType = {
  showMessage: (message: string, severity?: AlertColor) => void;
};

export const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined,
);

export const useSnackbar = (): SnackbarContextType => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};
