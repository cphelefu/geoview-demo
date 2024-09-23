import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  RouterProvider,
} from "react-router-dom";
import { router } from './routes';
import { SnackbarProvider } from './providers/snackbarProvider';


createRoot(document.getElementById('root')!).render(
  <SnackbarProvider>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </SnackbarProvider>,
)
