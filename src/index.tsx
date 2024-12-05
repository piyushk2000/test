import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.scss";
import reportWebVitals from "./reportWebVitals";
import { SnackbarProvider } from "notistack";
import routes from "./route";
import { LoadingProvider } from "./atoms/full-page-loading/loadingContext";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import 'dayjs/locale/en-gb';
import { useSnackbar, SnackbarKey } from 'notistack';
import { IconButton } from "@mui/material";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import * as Sentry from "@sentry/react";
import {
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType,
} from "react-router-dom";

Sentry.init({
  dsn: "https://47a311acfc4f199da37989f910b561ab@o4508164235788288.ingest.us.sentry.io/4508164795334656",
  integrations: [
    Sentry.reactRouterV6BrowserTracingIntegration({
      useEffect: React.useEffect,
      useLocation,
      useNavigationType,
      createRoutesFromChildren,
      matchRoutes,
    }),
    Sentry.replayIntegration(),
  ],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost"],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});


const sentryCreateBrowserRouter = Sentry.wrapCreateBrowserRouter(
  createBrowserRouter,
);

const router = sentryCreateBrowserRouter([routes]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3} action={snackbarKey => <SnackbarCloseButton snackbarKey={snackbarKey} />}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
        <LoadingProvider>
          <RouterProvider router={router} />
        </LoadingProvider>
      </LocalizationProvider>
    </SnackbarProvider>
  </React.StrictMode>
);

reportWebVitals();




function SnackbarCloseButton({ snackbarKey }: { snackbarKey: SnackbarKey }) {
  const { closeSnackbar } = useSnackbar();

  return (
    <IconButton onClick={() => closeSnackbar(snackbarKey)}>
      <CloseOutlinedIcon sx={{ color: "#FFF" }} fontSize="small" />
    </IconButton>
  );
}