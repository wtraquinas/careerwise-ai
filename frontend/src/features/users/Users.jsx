import { useState } from "react";
import UserDialog from "./UserDialog";

import {
    Box,
    Button,
    Card,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
    useUsers,
    useDeleteUser,
} from "./hooks";

export default function Users() {
    const {
        data: users = [],
        isLoading,
        isError,
    } = useUsers();

    const deleteUser = useDeleteUser();

    const [userToDelete, setUserToDelete] = useState(null);

    const [userToEdit, setUserToEdit] = useState(null);

    const [dialogOpen, setDialogOpen] = useState(false);


    const handleAddUser = () => {
        setUserToEdit(null);
        setDialogOpen(true);
    };

    const handleEditUser = (user) => {
        setUserToEdit(user);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setUserToEdit(null);
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

    const handleDeleteClick = (user) => {
        setUserToDelete(user);
    };

    const handleDeleteCancel = () => {
        setUserToDelete(null);
    };

    const handleDeleteConfirm = () => {
        if (!userToDelete) {
            return;
        }

        deleteUser.mutate(userToDelete.id, {
            onSuccess: () => {
                setUserToDelete(null);
            },
        });
    };

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
                    onClick={handleAddUser}
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
                        </Box>

                        <Box>
                            <IconButton
                                color="primary"
                                aria-label="edit user"
                                onClick={() => handleEditUser(user)}
                            >
                                <EditIcon />
                            </IconButton>

                            <IconButton
                                color="error"
                                aria-label="delete user"
                                onClick={() =>
                                    handleDeleteClick(user)
                                }
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

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={Boolean(userToDelete)}
                onClose={handleDeleteCancel}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle>
                    Delete User
                </DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete{" "}
                        <strong>
                            {userToDelete?.full_name}
                        </strong>
                        ?
                        <br />
                        This action cannot be undone.
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={handleDeleteCancel}
                        disabled={deleteUser.isPending}
                    >
                        Cancel
                    </Button>

                    <Button
                        onClick={handleDeleteConfirm}
                        color="error"
                        variant="contained"
                        disabled={deleteUser.isPending}
                    >
                        {deleteUser.isPending
                            ? "Deleting..."
                            : "Delete"}
                    </Button>
                </DialogActions>
            </Dialog>
            <UserDialog
                open={dialogOpen}
                onClose={handleCloseDialog}
                user={userToEdit}
            />

        </Box>
    );
}