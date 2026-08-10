import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Stack,
    Typography,
} from "@mui/material";

import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CheckIcon from "@mui/icons-material/Check";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function AIInsightCard({
    insight,
    isLoading,
    error,
    onRefresh,
}) {
    if (isLoading) {
        return (
            <Card sx={{ mb: 2 }}>
                <CardContent>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            mt: 2,
                            borderRadius: 4,
                            border: "0px solid",
                            borderColor: "primary.main",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
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

    return (
        <Card
            sx={{
                mt: 2,
                borderRadius: 2,
                border: "1px solid",
                borderColor: "primary.main",
                boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
            }}
        >
            <CardContent>

                {/* Header */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
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

                {/* Summary */}
                <Typography
                    variant="body1"
                    sx={{ mb: 3 }}
                >
                    {insight.summary}
                </Typography>

                {/* Priorities */}
                {insight.priorities?.length > 0 && (
                    <>
                        <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            sx={{ mb: 2 }}
                        >
                            Application Priorities
                        </Typography>

                        <Stack spacing={2}>
                            {insight.priorities.map(
                                (item) => (
                                    <Box
                                        key={
                                            item.application_id
                                        }
                                        sx={{
                                            p: 2,
                                            border: 1,
                                            borderColor:
                                                "divider",
                                            borderRadius: 2,
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent:
                                                    "space-between",
                                                alignItems:
                                                    "flex-start",
                                                gap: 2,
                                                mb: 1,
                                            }}
                                        >
                                            <Typography
                                                variant="subtitle2"
                                                fontWeight={600}
                                            >
                                                Application #
                                                {
                                                    item.application_id
                                                }
                                            </Typography>

                                            <Chip
                                                label={
                                                    item.priority
                                                }
                                                size="small"
                                                color={
                                                    item.priority ===
                                                    "high"
                                                        ? "error"
                                                        : item.priority ===
                                                          "medium"
                                                        ? "warning"
                                                        : "default"
                                                }
                                            />
                                        </Box>

                                        <Typography
                                            variant="body2"
                                            sx={{ mb: 1 }}
                                        >
                                            <strong>
                                                Why:
                                            </strong>{" "}
                                            {item.reason}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                        >
                                            <strong>
                                                Next action:
                                            </strong>{" "}
                                            {item.action}
                                        </Typography>
                                    </Box>
                                )
                            )}
                        </Stack>
                    </>
                )}

                {/* Recommendations */}
                {insight.recommendations?.length > 0 && (
                    <>
                        <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            sx={{
                                mt: 3,
                                mb: 1,
                            }}
                        >
                            Recommendations
                        </Typography>

                        <List dense>
                            {insight.recommendations.map(
                                (
                                    recommendation,
                                    index
                                ) => (
                                    <ListItem
                                        key={index}
                                        disableGutters
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 32,
                                            }}
                                        >
                                            <CheckIcon
                                                fontSize="small"
                                                color="primary"
                                            />
                                        </ListItemIcon>

                                        <ListItemText
                                            primary={
                                                recommendation
                                            }
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