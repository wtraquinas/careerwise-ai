import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Header() {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6">
          CareerWise
        </Typography>
      </Toolbar>
    </AppBar>
  );
}