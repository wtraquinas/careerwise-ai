import {
    Box,
    Button,
    Paper,
    TextField,
    Typography,
} from "@mui/material";

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { AuthAPI } from "../../shared/services/api";

export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (event) => {
        event.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await AuthAPI.login({
                email,
                password,
            });

            localStorage.setItem(
                "token",
                response.data.access_token
            );

            const destination =
                location.state?.from?.pathname || "/";

            navigate(destination, {
                replace: true,
            });

        } catch (err) {
            setError(
                err.response?.data?.detail ||
                "Invalid email or password"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 2,
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    width: "100%",
                    maxWidth: 420,
                    p: 4,
                }}
            >
                <Typography
                    variant="h4"
                    sx={{ mb: 1 }}
                >
                    CareerWise
                </Typography>

                <Typography
                    color="text.secondary"
                    sx={{ mb: 3 }}
                >
                    Sign in to your account
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleLogin}
                >
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        sx={{ mb: 2 }}
                        required
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        sx={{ mb: 2 }}
                        required
                    />

                    {error && (
                        <Typography
                            color="error"
                            sx={{ mb: 2 }}
                        >
                            {error}
                        </Typography>
                    )}

                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        disabled={loading}
                    >
                        {loading
                            ? "Signing in..."
                            : "Sign In"}
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}