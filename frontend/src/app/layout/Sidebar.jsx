import {
    Drawer,
    List,
    ListItemButton,
    ListItemText,
} from "@mui/material";

import { Link } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import BusinessIcon from "@mui/icons-material/Business";
import WorkIcon from "@mui/icons-material/Work";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import SettingsIcon from "@mui/icons-material/Settings";

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

            <List>

                <ListItemButton component={Link} to="/">
                    <DashboardIcon sx={{ mr: 2 }} />
                    <ListItemText primary="Dashboard" />
                </ListItemButton>

                <ListItemButton component={Link} to="/companies">
                    <BusinessIcon sx={{ mr: 2 }} />
                    <ListItemText primary="Companies" />
                </ListItemButton>

                <ListItemButton component={Link} to="/applications">
                    <WorkIcon sx={{ mr: 2 }} />
                    <ListItemText primary="Applications" />
                </ListItemButton>

                <ListItemButton component={Link} to="/recruiters">
                    <PeopleIcon sx={{ mr: 2 }} />
                    <ListItemText primary="Recruiters" />
                </ListItemButton>

                <ListItemButton component={Link} to="/tasks">
                    <AssignmentIcon sx={{ mr: 2 }} />
                    <ListItemText primary="Tasks" />
                </ListItemButton>

                <ListItemButton component={Link} to="/ai">
                    <SmartToyIcon sx={{ mr: 2 }} />
                    <ListItemText primary="AI Coach" />
                </ListItemButton>

                <ListItemButton component={Link} to="/settings">
                    <SettingsIcon sx={{ mr: 2 }} />
                    <ListItemText primary="Settings" />
                </ListItemButton>

            </List>

        </Drawer>

    );
}