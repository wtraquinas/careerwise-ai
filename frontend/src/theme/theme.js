import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#00bfa5",
    },
    background: {
      default: "#f5f7fb",
    },
  },

  shape: {
    borderRadius: 12,
  },
});

export default theme;
