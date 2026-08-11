import {
    Box,
    Typography,
} from "@mui/material";

export default function Users() {
    return (
        <Box>
            <Typography
                variant="h4"
                sx={{ mb: 1 }}
            >
                User Management
            </Typography>

            <Typography color="text.secondary">
                Manage CareerWise users and accounts.
            </Typography>
        </Box>
    );
}