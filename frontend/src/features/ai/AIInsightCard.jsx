import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";

import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function AIInsightCard({
    insight,
    isLoading,
    error,
    onRefresh,
}) {
    if (isLoading) {
        return (
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                        }}
                    >
                        <CircularProgress size={24} />

                        <Typography>
                            CareerWise AI is analyzing your
                            application pipeline...
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Alert
                severity="error"
                sx={{ mb: 3 }}
                action={
                    <Button
                        color="inherit"
                        size="small"
                        startIcon={<RefreshIcon />}
                        onClick={onRefresh}
                    >
                        Retry
                    </Button>
                }
            >
                Unable to load your AI career insight.
            </Alert>
        );
    }

    if (!insight) {
        return null;
    }

    const priority = insight.priority || "low";

    return (
        <Card
            sx={{
                mb: 3,
                border: 1,
                borderColor:
                    priority === "high"
                        ? "warning.main"
                        : "divider",
            }}
        >
            <CardContent>
                {/* Header */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: 2,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                        }}
                    >
                        <AutoAwesomeIcon color="primary" />

                        <Typography
                            variant="h6"
                            fontWeight={600}
                        >
                            AI Career Insight
                        </Typography>
                    </Box>

                    <Button
                        size="small"
                        startIcon={<RefreshIcon />}
                        onClick={onRefresh}
                    >
                        Refresh
                    </Button>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Headline */}
                <Typography
                    variant="h6"
                    sx={{ mb: 1 }}
                >
                    {insight.headline}
                </Typography>

                {/* Summary */}
                <Typography
                    color="text.secondary"
                    sx={{ mb: 2 }}
                >
                    {insight.summary}
                </Typography>

                {/* Actions */}
                {insight.actions?.length > 0 && (
                    <>
                        <Typography
                            variant="subtitle2"
                            sx={{ mb: 1 }}
                        >
                            Recommended actions
                        </Typography>

                        <List dense>
                            {insight.actions.map(
                                (action, index) => (
                                    <ListItem
                                        key={index}
                                        disableGutters
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 32,
                                            }}
                                        >
                                            <CheckCircleOutlineIcon
                                                fontSize="small"
                                                color="primary"
                                            />
                                        </ListItemIcon>

                                        <ListItemText
                                            primary={action}
                                        />
                                    </ListItem>
                                )
                            )}
                        </List>
                    </>
                )}
            </CardContent>
        </Card>
    );
}