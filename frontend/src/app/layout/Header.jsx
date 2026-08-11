import {
    AppBar,
    Avatar,
    Box,
    Button,
    Toolbar,
    Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
    };

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
                        Antonio
                    </Typography>

                    <Avatar>
                        A
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