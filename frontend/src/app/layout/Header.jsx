import {
  AppBar,
  Avatar,
  Box,
  Toolbar,
  Typography,
} from "@mui/material";

export default function Header() {
  return (
    <AppBar
      position="fixed"
      color="inherit"
      elevation={1}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1 }}
        >
          CareerWise
        </Typography>

        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
            }}
        >
          <Typography>
            Antonio
          </Typography>

          <Avatar>
            A
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}