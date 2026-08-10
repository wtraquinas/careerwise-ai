import {
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";

import { Link, useLocation } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import BusinessIcon from "@mui/icons-material/Business";
import WorkIcon from "@mui/icons-material/Work";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import SettingsIcon from "@mui/icons-material/Settings";

const drawerWidth = 165;

const menuItems = [
    {
        label: "Dashboard",
        path: "/",
        icon: <DashboardIcon />,
    },
    {
        label: "Companies",
        path: "/companies",
        icon: <BusinessIcon />,
    },
    {
        label: "Applications",
        path: "/applications",
        icon: <WorkIcon />,
    },
    {
        label: "Recruiters",
        path: "/recruiters",
        icon: <PeopleIcon />,
    },
    {
        label: "Tasks",
        path: "/tasks",
        icon: <AssignmentIcon />,
    },
    {
        label: "AI Coach",
        path: "/ai",
        icon: <SmartToyIcon />,
    },
    {
        label: "Settings",
        path: "/settings",
        icon: <SettingsIcon />,
    },
];

export default function Sidebar() {

    const location = useLocation();

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,

                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                    overflowX: "hidden",
                },
            }}
        >

            <List
                sx={{
                    px: 0.75,
                    pt: 1,
                }}
            >

                {menuItems.map((item) => {

                    const isActive =
                        location.pathname === item.path;

                    return (
                        <ListItemButton
                            key={item.path}
                            component={Link}
                            to={item.path}
                            selected={isActive}
                            sx={{
                                minHeight: 36,
                                px: 1,
                                mb: 0.5,
                                borderRadius: 1,

                                "&.Mui-selected": {
                                    backgroundColor:
                                        "rgba(25, 118, 210, 0.10)",
                                },

                                "&.Mui-selected:hover": {
                                    backgroundColor:
                                        "rgba(25, 118, 210, 0.15)",
                                },
                            }}
                        >

                            <ListItemIcon
                                sx={{
                                    minWidth: 26,
                                    color: isActive
                                        ? "primary.main"
                                        : "inherit",

                                    "& svg": {
                                        fontSize: 17,
                                    },
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>

                            <ListItemText
                                primary={item.label}
                                primaryTypographyProps={{
                                    fontSize: "0.72rem",
                                    fontWeight: isActive
                                        ? 500
                                        : 400,
                                    whiteSpace: "nowrap",
                                }}
                            />

                        </ListItemButton>
                    );
                })}

            </List>

        </Drawer>
    );
}