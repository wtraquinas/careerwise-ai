import ReactDOM from "react-dom/client";

import "./index.css";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import theme from "./theme/theme";

import AppQueryProvider from "./app/providers/QueryProvider";

import AppRouter from "./app/router/AppRouter";

import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AppQueryProvider>

        <AppRouter />

        <Toaster position="top-right" />

    </AppQueryProvider>
  </ThemeProvider>
);
