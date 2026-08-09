import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    Chip,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@mui/material";

import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const priorityColor = {
    high: "error",
    medium: "warning",
    low: "success",
};

export default function AIAnalysisDialog({
    open,
    onClose,
    analysis,
    application,
    loading = false,
}) {
    if (!analysis && !loading) {
        return null;
    }

    const priority =
        analysis?.priority?.toLowerCase() || "medium";

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
        >
            <DialogTitle
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                }}
            >
                <AutoAwesomeIcon color="primary" />

                AI Application Analysis
            </DialogTitle>

            <DialogContent dividers>

                {application && (
                    <Box sx={{ mb: 3 }}>
                        <Typography
                            variant="h6"
                            fontWeight="bold"
                        >
                            {application.position}
                        </Typography>

                        <Typography
                            color="text.secondary"
                        >
                            Application #{application.id}
                        </Typography>
                    </Box>
                )}

                {loading && (
                    <Box sx={{ py: 5, textAlign: "center" }}>
                        <AutoAwesomeIcon
                            color="primary"
                            sx={{
                                fontSize: 40,
                                mb: 2,
                            }}
                        />

                        <Typography>
                            CareerWise AI is analyzing
                            this application...
                        </Typography>
                    </Box>
                )}

                {!loading && analysis && (
                    <>
                        {/* Priority */}

                        <Box sx={{ mb: 3 }}>
                            <Typography
                                variant="subtitle2"
                                color="text.secondary"
                                sx={{ mb: 1 }}
                            >
                                Priority
                            </Typography>

                            <Chip
                                label={priority.toUpperCase()}
                                color={
                                    priorityColor[priority] ||
                                    "default"
                                }
                                sx={{
                                    fontWeight: "bold",
                                }}
                            />
                        </Box>

                        <Divider sx={{ mb: 3 }} />

                        {/* Summary */}

                        <Box sx={{ mb: 3 }}>
                            <Typography
                                variant="h6"
                                sx={{ mb: 1 }}
                            >
                                Summary
                            </Typography>

                            <Typography>
                                {analysis.summary}
                            </Typography>
                        </Box>

                        {/* Reason */}

                        <Box sx={{ mb: 3 }}>
                            <Typography
                                variant="h6"
                                sx={{ mb: 1 }}
                            >
                                Why
                            </Typography>

                            <Typography>
                                {analysis.reason}
                            </Typography>
                        </Box>

                        {/* Next steps */}

                        <Box sx={{ mb: 3 }}>
                            <Typography
                                variant="h6"
                                sx={{ mb: 1 }}
                            >
                                Next Steps
                            </Typography>

                            <List dense>
                                {(
                                    analysis.next_steps ||
                                    []
                                ).map((step, index) => (
                                    <ListItem
                                        key={index}
                                        disableGutters
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 32,
                                            }}
                                        >
                                            <CheckCircleIcon
                                                color="primary"
                                                fontSize="small"
                                            />
                                        </ListItemIcon>

                                        <ListItemText
                                            primary={step}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>

                        {/* Interview preparation */}

                        {analysis.interview_preparation
                            ?.length > 0 && (
                            <Box sx={{ mb: 3 }}>
                                <Typography
                                    variant="h6"
                                    sx={{ mb: 1 }}
                                >
                                    Interview Preparation
                                </Typography>

                                <List dense>
                                    {analysis.interview_preparation.map(
                                        (item, index) => (
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
                                                        color="primary"
                                                        fontSize="small"
                                                    />
                                                </ListItemIcon>

                                                <ListItemText
                                                    primary={item}
                                                />
                                            </ListItem>
                                        )
                                    )}
                                </List>
                            </Box>
                        )}

                        {/* Follow up */}

                        <Box>
                            <Typography
                                variant="h6"
                                sx={{ mb: 1 }}
                            >
                                Follow-up
                            </Typography>

                            <Typography>
                                {analysis.follow_up}
                            </Typography>
                        </Box>
                    </>
                )}
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}