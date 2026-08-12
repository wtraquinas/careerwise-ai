import { useState } from "react";

import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import toast from "react-hot-toast";

import { AuthAPI } from "../../shared/services/api";


export default function Settings() {

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [isChanging, setIsChanging] = useState(false);

    const [error, setError] = useState("");


    const handleChangePassword = async (event) => {
        event.preventDefault();

        setError("");

        // Basic validation
        if (!currentPassword || !newPassword || !confirmPassword) {
            setError("Please complete all password fields.");
            return;
        }

        if (newPassword.length < 8) {
            setError(
                "New password must be at least 8 characters long."
            );
            return;
        }

        if (newPassword !== confirmPassword) {
            setError(
                "New password and confirmation do not match."
            );
            return;
        }

        if (currentPassword === newPassword) {
            setError(
                "New password must be different from your current password."
            );
            return;
        }

        try {
            setIsChanging(true);

            await AuthAPI.changePassword({
                current_password: currentPassword,
                new_password: newPassword,
            });

            toast.success(
                "Password changed successfully."
            );

            // Clear the form
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");

        } catch (error) {

            const message =
                error?.response?.data?.detail ||
                "Unable to change password.";

            setError(message);

            toast.error(message);

        } finally {
            setIsChanging(false);
        }
    };


    return (
        <Box
            sx={{
                maxWidth: 700,
            }}
        >

            {/* Page header */}

            <Typography
                variant="h4"
                sx={{ mb: 1 }}
            >
                Settings
            </Typography>

            <Typography
                color="text.secondary"
                sx={{ mb: 4 }}
            >
                Manage your CareerWise account settings.
            </Typography>


            {/* Security */}

            <Card
                sx={{
                    borderRadius: 2,
                }}
            >

                <CardContent sx={{ p: 3 }}>

                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 600,
                            mb: 1,
                        }}
                    >
                        Security
                    </Typography>

                    <Typography
                        color="text.secondary"
                        sx={{ mb: 3 }}
                    >
                        Change your CareerWise account password.
                    </Typography>

                    <Divider sx={{ mb: 3 }} />


                    {error && (
                        <Alert
                            severity="error"
                            sx={{ mb: 3 }}
                        >
                            {error}
                        </Alert>
                    )}


                    <Box
                        component="form"
                        onSubmit={handleChangePassword}
                    >

                        {/* Current password */}

                        <TextField
                            fullWidth
                            label="Current password"
                            type={
                                showCurrent
                                    ? "text"
                                    : "password"
                            }
                            value={currentPassword}
                            onChange={(event) =>
                                setCurrentPassword(
                                    event.target.value
                                )
                            }
                            sx={{ mb: 2 }}
                            autoComplete="current-password"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() =>
                                                setShowCurrent(
                                                    !showCurrent
                                                )
                                            }
                                            edge="end"
                                            aria-label="show current password"
                                        >
                                            {showCurrent ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />


                        {/* New password */}

                        <TextField
                            fullWidth
                            label="New password"
                            type={
                                showNew
                                    ? "text"
                                    : "password"
                            }
                            value={newPassword}
                            onChange={(event) =>
                                setNewPassword(
                                    event.target.value
                                )
                            }
                            sx={{ mb: 2 }}
                            autoComplete="new-password"
                            helperText="Minimum 8 characters"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() =>
                                                setShowNew(
                                                    !showNew
                                                )
                                            }
                                            edge="end"
                                            aria-label="show new password"
                                        >
                                            {showNew ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />


                        {/* Confirm password */}

                        <TextField
                            fullWidth
                            label="Confirm new password"
                            type={
                                showConfirm
                                    ? "text"
                                    : "password"
                            }
                            value={confirmPassword}
                            onChange={(event) =>
                                setConfirmPassword(
                                    event.target.value
                                )
                            }
                            sx={{ mb: 3 }}
                            autoComplete="new-password"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() =>
                                                setShowConfirm(
                                                    !showConfirm
                                                )
                                            }
                                            edge="end"
                                            aria-label="show confirm password"
                                        >
                                            {showConfirm ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />


                        {/* Submit */}

                        <Button
                            type="submit"
                            variant="contained"
                            disabled={isChanging}
                        >
                            {isChanging
                                ? "Changing password..."
                                : "Change Password"}
                        </Button>

                    </Box>

                </CardContent>

            </Card>

        </Box>
    );
}