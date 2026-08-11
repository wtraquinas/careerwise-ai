import {
    Box,
    Typography,
} from "@mui/material";

import {
    useUsers,
    useDeleteUser,
} from "../users/hooks";

export default function Settings() {

    const {
        data: users = [],
        isLoading,
        isError,
    } = useUsers();

    const deleteUser = useDeleteUser();

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
            <Typography
                variant="h4"
                sx={{ mb: 1 }}
            >
                User Management
            </Typography>

            <Typography
                color="text.secondary"
                sx={{ mb: 3 }}
            >
                Manage CareerWise users and accounts.
            </Typography>

            {users.map((user) => (
                <Box
                    key={user.id}
                    sx={{
                        p: 2,
                        mb: 2,
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 2,
                    }}
                >
                    <Typography variant="h6">
                        {user.full_name}
                    </Typography>

                    <Typography
                        color="text.secondary"
                    >
                        {user.email}
                    </Typography>
                </Box>
            ))}
        </Box>
    );
}