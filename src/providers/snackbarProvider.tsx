import React, { createContext, useContext, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface SnackbarOptions {
  message?: string;
  variant?: AlertProps['severity'];
  autoHideDuration?: number;
}

interface SnackbarContextValue {
  enqueueSnackbar: (message: string, options?: SnackbarOptions) => void;
}

const SnackbarContext = createContext<SnackbarContextValue | undefined>(undefined);

export function SnackbarProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [snackbarOptions, setSnackbarOptions] = useState<SnackbarOptions>({ message: '' });

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const enqueueSnackbar = (message: string, options: SnackbarOptions = { message }) => {
    setSnackbarOptions({ ...options, message });
    setOpen(true);
  };

  return (
    <SnackbarContext.Provider value={{ enqueueSnackbar }}>
      {children}
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={snackbarOptions.autoHideDuration || 3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={snackbarOptions.variant || "success"}>
          {snackbarOptions.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}

export function useSnackbar() {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
}
