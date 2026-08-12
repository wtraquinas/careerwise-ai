import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Divider,
    Typography,
} from "@mui/material";

import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function AIInsightCard({
    insight,
    isLoading,
    error,
    onRefresh,
}) {
    if (isLoading) {
        return (
            <Card sx={{ mt: 3 }}>
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
                sx={{ mt: 3 }}
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
                mt: 3,
                borderRadius: 2,
                border: "1px solid",
                borderColor: "primary.main",
                boxShadow:
                    "0 2px 6px rgba(0,0,0,0.06)",
            }}
        >
            <CardContent>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent:
                            "space-between",
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
                        <AutoAwesomeIcon
                            color="primary"
                        />

                        <Typography
                            variant="h6"
                            fontWeight={600}
                        >
                            AI Career Insight
                        </Typography>
                    </Box>

                    <Button
                        size="small"
                        startIcon={
                            <RefreshIcon />
                        }
                        onClick={onRefresh}
                    >
                        Refresh
                    </Button>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Typography
                    variant="body1"
                    sx={{
                        whiteSpace: "pre-line",
                        lineHeight: 1.7,
                    }}
                >
                    {insight.answer}
                </Typography>

            </CardContent>
        </Card>
    );
}