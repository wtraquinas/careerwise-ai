import { useState } from "react";

import {
    Box,
    Button,
    Card,
    CardContent,
    IconButton,
    Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
    useUsers,
    useUpdateUser,
    useDeleteUser,
} from "./hooks";

import UserDialog from "./UserDialog";

export default function Users() {
    const {
        data: users = [],
        isLoading,
        isError,
    } = useUsers();

    const updateUser = useUpdateUser();
    const deleteUser = useDeleteUser();

    const [editingUser, setEditingUser] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleEdit = (user) => {
        console.log("Editing user:", user);

        setEditingUser(user);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        if (updateUser.isPending) {
            return;
        }

        setDialogOpen(false);
        setEditingUser(null);
    };

    const handleSaveUser = (data) => {
        if (!editingUser) {
            return;
        }

        updateUser.mutate(
            {
                id: editingUser.id,
                data,
            },
            {
                onSuccess: () => {
                    setDialogOpen(false);
                    setEditingUser(null);
                },
            }
        );
    };

    const handleDelete = (user) => {
        const confirmed = window.confirm(
            `Delete user "${user.full_name}"?`
        );

        if (!confirmed) {
            return;
        }

        deleteUser.mutate(user.id);
    };

    if (isLoading) {
        return (
            <Typography>
                Loading users...
            </Typography>
        );
    }

    if (isError) {
        return (
            <Typography color="error">
                Unable to load users.
            </Typography>
        );
    }

    return (
        <Box>

            {/* Header */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                }}
            >
                <Box>
                    <Typography variant="h4">
                        User Management
                    </Typography>

                    <Typography
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                    >
                        Manage CareerWise users and accounts.
                    </Typography>
                </Box>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                >
                    Add User
                </Button>
            </Box>

            {/* Users */}
            {users.map((user) => (
                <Card
                    key={user.id}
                    sx={{
                        mb: 2,
                        borderRadius: 2,
                    }}
                >
                    <CardContent
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >

                        <Box>
                            <Typography
                                variant="h6"
                                sx={{ fontWeight: 500 }}
                            >
                                {user.full_name}
                            </Typography>

                            <Typography color="text.secondary">
                                {user.email}
                            </Typography>

                            <Typography
                                variant="body2"
                                sx={{
                                    mt: 0.5,
                                    fontWeight: 600,
                                    textTransform: "capitalize",
                                }}
                            >
                                Role: {user.role}
                            </Typography>
                        </Box>

                        <Box>
                            <IconButton
                                color="primary"
                                aria-label="edit user"
                                onClick={() => handleEdit(user)}
                            >
                                <EditIcon />
                            </IconButton>

                            <IconButton
                                color="error"
                                aria-label="delete user"
                                onClick={() => handleDelete(user)}
                                disabled={deleteUser.isPending}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Box>

                    </CardContent>
                </Card>
            ))}

            {users.length === 0 && (
                <Typography
                    color="text.secondary"
                    sx={{ mt: 4 }}
                >
                    No users found.
                </Typography>
            )}

            {/* Edit User Dialog */}
            <UserDialog
                open={dialogOpen}
                user={editingUser}
                onClose={handleCloseDialog}
                onSave={handleSaveUser}
                isSaving={updateUser.isPending}
            />

        </Box>
    );
}