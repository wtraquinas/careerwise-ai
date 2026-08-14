import React, { useMemo, useState } from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, ThemeProvider } from "@mui/material";

import App from "./App.jsx";
import QueryProvider from "./app/providers/QueryProvider.jsx";
import { getTheme } from "./theme/theme.js";

import "./index.css";

function Root() {
    const [mode, setMode] = useState("light");

    const theme = useMemo(
        () => getTheme(mode),
        [mode]
    );

    const toggleTheme = () => {
        setMode((currentMode) =>
            currentMode === "light"
                ? "dark"
                : "light"
        );
    };

    return (
        <React.StrictMode>
            <QueryProvider>
                <ThemeProvider theme={theme}>
                    <CssBaseline />

                    <App
                        mode={mode}
                        toggleTheme={toggleTheme}
                    />
                </ThemeProvider>
            </QueryProvider>
        </React.StrictMode>
    );
}

ReactDOM.createRoot(
    document.getElementById("root")
).render(
    <Root />
);