import { useEffect, useState } from "react";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";

import {
    useCreateUser,
    useUpdateUser,
} from "./hooks";

export default function UserDialog({
    open,
    onClose,
    user = null,
}) {
    const isEditing = Boolean(user);

    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        password: "",
    });

    const createUser = useCreateUser();
    const updateUser = useUpdateUser();

    useEffect(() => {
        if (user) {
            setFormData({
                full_name: user.full_name || "",
                email: user.email || "",
                password: "",
            });
        } else {
            setFormData({
                full_name: "",
                email: "",
                password: "",
            });
        }
    }, [user, open]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (isEditing) {
            updateUser.mutate(
                {
                    id: user.id,
                    data: {
                        full_name: formData.full_name,
                        email: formData.email,
                    },
                },
                {
                    onSuccess: onClose,
                }
            );
        } else {
            createUser.mutate(
                formData,
                {
                    onSuccess: onClose,
                }
            );
        }
    };

    const isSaving =
        createUser.isPending ||
        updateUser.isPending;

    return (
        <Dialog
            open={open}
            onClose={isSaving ? undefined : onClose}
            maxWidth="sm"
            fullWidth
        >
            <form onSubmit={handleSubmit}>
                <DialogTitle>
                    {isEditing
                        ? "Edit User"
                        : "Add User"}
                </DialogTitle>

                <DialogContent>
                    <TextField
                        fullWidth
                        label="Full Name"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        margin="normal"
                        required
                        autoFocus
                    />

                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />

                    {!isEditing && (
                        <TextField
                            fullWidth
                            label="Password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            margin="normal"
                            required
                        />
                    )}
                </DialogContent>

                <DialogActions>
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
                        {isSaving
                            ? "Saving..."
                            : isEditing
                                ? "Save Changes"
                                : "Create User"}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}