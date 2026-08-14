import { useState } from "react";

import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    TextField,
    Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import { AuthAPI, AccessRequestsAPI } from "../../shared/services/api";


export default function Login() {

    const navigate = useNavigate();

    // -----------------------------------------
    // Login state
    // -----------------------------------------

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);


    const [requestName, setRequestName] = useState("");
    const [requestEmail, setRequestEmail] = useState("");
    const [requestLoading, setRequestLoading] =
        useState(false);
    // -----------------------------------------
    // Access request state
    // -----------------------------------------

    const [visitorName, setVisitorName] = useState("");

    const [visitorEmail, setVisitorEmail] = useState("");

    const [accessLoading, setAccessLoading] =
        useState(false);


    // -----------------------------------------
    // Login
    // -----------------------------------------

    const handleSubmit = async (event) => {

        event.preventDefault();

        try {

            setLoading(true);

            const response =
                await AuthAPI.login({
                    email,
                    password,
                });

            localStorage.setItem(
                "token",
                response.data.access_token
            );

            toast.success(
                "Login successful"
            );

            navigate(
                "/",
                {
                    replace: true,
                }
            );

        } catch (error) {

            const message =
                error?.response?.data?.detail ||
                "Invalid email or password";

            toast.error(message);

        } finally {

            setLoading(false);

        }

    };


    // -----------------------------------------
    // Request access
    // -----------------------------------------

    const handleAccessRequest = async (event) => {
        event.preventDefault();

        try {
            setRequestLoading(true);

            const response =
                await AccessRequestsAPI.create({
                    name: requestName,
                    email: requestEmail,
                });

            toast.success(
                `Thanks, ${response.data.name}! Your access request has been received.`
            );

            setRequestName("");
            setRequestEmail("");

        } catch (error) {

            const message =
                error?.response?.data?.detail ||
                "Unable to submit your access request.";

            toast.error(message);

        } finally {
            setRequestLoading(false);
        }
    };


    return (

        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f5f7fb",
                px: 2,
                py: 6,
            }}
        >

            {/* -----------------------------------------
                CareerWise introduction
            ----------------------------------------- */}

            <Box
                sx={{
                    textAlign: "center",
                    maxWidth: 800,
                    mb: 4,
                }}
            >

                <Typography
                    variant="h3"
                    component="h1"
                    sx={{
                        fontWeight: 700,
                        mb: 2,
                        color: "primary.main",
                    }}
                >
                    CareerWise AI 💡
                </Typography>


                <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{
                        lineHeight: 1.6,
                    }}
                >
                    An AI-powered Career Operating System that
                    combines a Career CRM, personalized career
                    intelligence, and a LangGraph-based
                    multi-agent architecture.
                </Typography>

            </Box>


            {/* -----------------------------------------
                Login card
            ----------------------------------------- */}

            <Card
                sx={{
                    width: "100%",
                    maxWidth: 420,
                    mb: 3,
                }}
            >

                <CardContent
                    sx={{
                        p: 4,
                    }}
                >

                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 600,
                            mb: 1,
                        }}
                    >
                        Welcome back
                    </Typography>


                    <Typography
                        color="text.secondary"
                        sx={{
                            mb: 3,
                        }}
                    >
                        Sign in to your account
                    </Typography>


                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                    >

                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(event) =>
                                setEmail(
                                    event.target.value
                                )
                            }
                            margin="normal"
                            required
                        />


                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(
                                    event.target.value
                                )
                            }
                            margin="normal"
                            required
                        />


                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3,
                            }}
                            disabled={loading}
                        >
                            {loading
                                ? "Signing in..."
                                : "Sign In"}
                        </Button>

                    </Box>


                    <Box
                        sx={{
                            mt: 4,
                            pt: 3,
                            borderTop: "1px solid",
                            borderColor: "divider",
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 600,
                                mb: 1,
                            }}
                        >
                            Register for Access
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 2 }}
                        >
                            Interested in trying CareerWise AI?
                            Submit your details and request access.
                        </Typography>

                        <Box
                            component="form"
                            onSubmit={handleAccessRequest}
                        >
                            <TextField
                                fullWidth
                                label="Name"
                                value={requestName}
                                onChange={(event) =>
                                    setRequestName(event.target.value)
                                }
                                margin="normal"
                                required
                            />

                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                value={requestEmail}
                                onChange={(event) =>
                                    setRequestEmail(event.target.value)
                                }
                                margin="normal"
                                required
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="outlined"
                                sx={{ mt: 2 }}
                                disabled={requestLoading}
                            >
                                {requestLoading
                                    ? "Submitting Request..."
                                    : "Request Access"}
                            </Button>
                        </Box>
                    </Box>

                </CardContent>

            </Card>


            
            {/* -----------------------------------------
                Footer
            ----------------------------------------- */}

            <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                    mt: 4,
                    textAlign: "center",
                }}
            >
                CareerWise AI · Your intelligent career companion
            </Typography>

        </Box>

    );

}

