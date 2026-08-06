import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
} from "@mui/material";

import { Link } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import BusinessIcon from "@mui/icons-material/Business";

const drawerWidth = 240;

export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />

      <List>
        <ListItemButton component={Link} to="/">
            <DashboardIcon sx={{ mr: 2 }} />
            <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton component={Link} to="/companies">
            <BusinessIcon sx={{ mr: 2 }} />
            <ListItemText primary="Companies" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}