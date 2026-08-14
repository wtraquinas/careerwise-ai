import {
    AppBar,
    Avatar,
    Box,
    Button,
    Toolbar,
    Typography,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthAPI } from "../../shared/services/api";

export default function Header() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadCurrentUser = async () => {
            try {
                const response =
                    await AuthAPI.getCurrentUser();

                setUser(response.data);

            } catch (error) {
                console.error(
                    "Failed to load current user:",
                    error
                );

                localStorage.removeItem("token");

                navigate("/login", {
                    replace: true,
                });
            }
        };

        loadCurrentUser();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");

        navigate("/login", {
            replace: true,
        });
    };

    const userName =
        user?.full_name ||
        user?.email ||
        "User";

    const avatarLetter =
        userName.charAt(0).toUpperCase();

    return (
        <AppBar
            position="static"
            color="transparent"
            elevation={1}
            sx={{
                backgroundColor: "#ffffff",
                color: "text.primary",
            }}
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
                        {userName}
                    </Typography>

                    <Avatar>
                        {avatarLetter}
                    </Avatar>

                    <Button
                        color="inherit"
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>

                </Box>

            </Toolbar>
        </AppBar>
    );
}