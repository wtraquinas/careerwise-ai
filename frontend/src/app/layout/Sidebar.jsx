import {
    Box,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import BusinessIcon from "@mui/icons-material/Business";
import WorkIcon from "@mui/icons-material/Work";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import SettingsIcon from "@mui/icons-material/Settings";

import { Link } from "react-router-dom";

import { useCurrentUser } from "../../features/auth/hooks";

const drawerWidth = 240;

export default function Sidebar() {
    const { data: user } = useCurrentUser();

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                },
            }}
        >
            <Toolbar />

            <Box sx={{ overflow: "auto" }}>
                <List>

                    {/* Dashboard */}
                    <ListItemButton
                        component={Link}
                        to="/"
                    >
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>

                        <ListItemText primary="Dashboard" />
                    </ListItemButton>


                    {/* Companies */}
                    <ListItemButton
                        component={Link}
                        to="/companies"
                    >
                        <ListItemIcon>
                            <BusinessIcon />
                        </ListItemIcon>

                        <ListItemText primary="Companies" />
                    </ListItemButton>


                    {/* Applications */}
                    <ListItemButton
                        component={Link}
                        to="/applications"
                    >
                        <ListItemIcon>
                            <WorkIcon />
                        </ListItemIcon>

                        <ListItemText primary="Applications" />
                    </ListItemButton>


                    {/* Recruiters */}
                    <ListItemButton
                        component={Link}
                        to="/recruiters"
                    >
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>

                        <ListItemText primary="Recruiters" />
                    </ListItemButton>


                    {/* Tasks */}
                    <ListItemButton
                        component={Link}
                        to="/tasks"
                    >
                        <ListItemIcon>
                            <AssignmentIcon />
                        </ListItemIcon>

                        <ListItemText primary="Tasks" />
                    </ListItemButton>


                    {/* AI Coach */}
                    <ListItemButton
                        component={Link}
                        to="/ai"
                    >
                        <ListItemIcon>
                            <SmartToyIcon />
                        </ListItemIcon>

                        <ListItemText primary="AI Coach" />
                    </ListItemButton>


                    {/* Users - ADMIN ONLY */}
                    {user?.role === "admin" && (
                        <ListItemButton
                            component={Link}
                            to="/users"
                        >
                            <ListItemIcon>
                                <PeopleIcon />
                            </ListItemIcon>

                            <ListItemText primary="Users" />
                        </ListItemButton>
                    )}


                    {/* Settings */}
                    <ListItemButton
                        component={Link}
                        to="/settings"
                    >
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>

                        <ListItemText primary="Settings" />
                    </ListItemButton>

                </List>
            </Box>
        </Drawer>
    );
}