import { useEffect, useState } from "react";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    TextField,
} from "@mui/material";

export default function UserDialog({
    open,
    user,
    onClose,
    onSave,
    isSaving = false,
}) {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("user");

    useEffect(() => {
        if (user) {
            setFullName(user.full_name || "");
            setEmail(user.email || "");
            setRole(user.role || "user");
        }
    }, [user]);

    const handleSubmit = (event) => {
        event.preventDefault();

        onSave({
            full_name: fullName,
            email,
            role,
        });
    };

    return (
        <Dialog
            open={open}
            onClose={isSaving ? undefined : onClose}
            fullWidth
            maxWidth="sm"
        >
            <form onSubmit={handleSubmit}>
                <DialogTitle>
                    Edit User
                </DialogTitle>

                <DialogContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        pt: 2,
                    }}
                >
                    <TextField
                        label="Full name"
                        value={fullName}
                        onChange={(event) =>
                            setFullName(event.target.value)
                        }
                        fullWidth
                        required
                    />

                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(event) =>
                            setEmail(event.target.value)
                        }
                        fullWidth
                        required
                    />

                    <TextField
                        select
                        label="Role"
                        value={role}
                        onChange={(event) =>
                            setRole(event.target.value)
                        }
                        fullWidth
                        required
                    >
                        <MenuItem value="user">
                            User
                        </MenuItem>

                        <MenuItem value="admin">
                            Admin
                        </MenuItem>
                    </TextField>
                </DialogContent>

                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button
                        onClick={onClose}
                        disabled={isSaving}
                    >
                        Cancel
                    </Button>

                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isSaving}
                    >
                        {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}