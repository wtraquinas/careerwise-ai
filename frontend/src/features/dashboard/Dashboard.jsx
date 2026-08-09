import { useEffect, useState } from "react";

import {
    Box,
    Button,
    Chip,
    CircularProgress,
    Grid,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

import StatCard from "../../shared/components/StatCard";

import { useDashboardStats } from "../companies/hooks";
import { useAIAnalysis } from "../ai/hooks";


export default function Dashboard() {

    const { data, isLoading } = useDashboardStats();

    const analysisMutation = useAIAnalysis();

    const [analysis, setAnalysis] = useState(null);


    useEffect(() => {

        analysisMutation.mutateAsync()
            .then((response) => {

                setAnalysis(response.data);

            })
            .catch((error) => {

                console.error(
                    "AI analysis failed:",
                    error
                );

            });

    }, []);


    if (isLoading) {

        return (
            <Typography>
                Loading...
            </Typography>
        );

    }


    const stats = [
        {
            title: "Companies",
            value: data?.companies ?? 0,
        },
        {
            title: "Users",
            value: data?.users ?? 0,
        },
    ];


    return (
        <>

            <Typography
                variant="h4"
                sx={{ mb: 3 }}
            >
                Dashboard
            </Typography>


            {/* -------------------------------- */}
            {/* Statistics */}
            {/* -------------------------------- */}

            <Grid
                container
                spacing={3}
            >

                {stats.map((card) => (

                    <Grid
                        key={card.title}
                        size={{
                            xs: 12,
                            sm: 6,
                            md: 3,
                        }}
                    >

                        <StatCard
                            title={card.title}
                            value={card.value}
                        />

                    </Grid>

                ))}

            </Grid>


            {/* -------------------------------- */}
            {/* AI Career Insights */}
            {/* -------------------------------- */}

            <Paper
                elevation={3}
                sx={{
                    mt: 4,
                    p: 3,
                }}
            >

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 2,
                    }}
                >

                    <AutoAwesomeIcon color="primary" />

                    <Typography
                        variant="h5"
                    >
                        AI Career Insights
                    </Typography>

                </Box>


                {analysisMutation.isPending && (

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                        }}
                    >

                        <CircularProgress
                            size={22}
                        />

                        <Typography
                            color="text.secondary"
                        >
                            Analyzing your career pipeline...
                        </Typography>

                    </Box>

                )}


                {!analysisMutation.isPending &&
                    !analysis &&
                    !analysisMutation.isError && (

                        <Typography
                            color="text.secondary"
                        >
                            No career insights available yet.
                        </Typography>

                    )}


                {analysisMutation.isError && (

                    <Typography color="error">

                        Unable to load AI career insights.

                    </Typography>

                )}


                {analysis && (

                    <>

                        {/* Summary */}

                        <Typography
                            sx={{
                                mb: 3,
                            }}
                        >
                            {analysis.summary}
                        </Typography>


                        {/* Priorities */}

                        <Typography
                            variant="h6"
                            sx={{
                                mb: 2,
                            }}
                        >
                            Application Priorities
                        </Typography>


                        <Stack
                            spacing={2}
                        >

                            {analysis.priorities?.map(
                                (item) => (

                                    <Paper
                                        key={
                                            item.application_id
                                        }
                                        variant="outlined"
                                        sx={{
                                            p: 2,
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
                                            }}
                                        >

                                            <Typography
                                                variant="subtitle1"
                                                fontWeight="bold"
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
                                                color={
                                                    item.priority ===
                                                    "high"
                                                        ? "error"
                                                        : item.priority ===
                                                            "medium"
                                                        ? "warning"
                                                        : "default"
                                                }
                                                size="small"
                                            />

                                        </Box>


                                        <Typography
                                            variant="body2"
                                            sx={{
                                                mt: 1,
                                            }}
                                        >
                                            <strong>
                                                Why:
                                            </strong>{" "}
                                            {item.reason}
                                        </Typography>


                                        <Typography
                                            variant="body2"
                                            sx={{
                                                mt: 1,
                                            }}
                                        >
                                            <strong>
                                                Next action:
                                            </strong>{" "}
                                            {item.action}
                                        </Typography>

                                    </Paper>

                                )
                            )}

                        </Stack>


                        {/* Recommendations */}

                        <Typography
                            variant="h6"
                            sx={{
                                mt: 3,
                                mb: 2,
                            }}
                        >
                            Recommendations
                        </Typography>


                        <Box
                            component="ul"
                            sx={{
                                mt: 0,
                                pl: 3,
                            }}
                        >

                            {analysis.recommendations?.map(
                                (recommendation, index) => (

                                    <li key={index}>

                                        <Typography
                                            variant="body2"
                                            sx={{
                                                mb: 1,
                                            }}
                                        >
                                            {recommendation}
                                        </Typography>

                                    </li>

                                )
                            )}

                        </Box>

                    </>

                )}

            </Paper>


            {/* -------------------------------- */}
            {/* Refresh analysis */}
            {/* -------------------------------- */}

            {analysis && (

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        mt: 2,
                    }}
                >

                    <Button
                        variant="outlined"
                        startIcon={
                            <AutoAwesomeIcon />
                        }
                        onClick={() => {

                            analysisMutation
                                .mutateAsync()
                                .then((response) => {

                                    setAnalysis(
                                        response.data
                                    );

                                })
                                .catch((error) => {

                                    console.error(
                                        "AI analysis failed:",
                                        error
                                    );

                                });

                        }}
                        disabled={
                            analysisMutation.isPending
                        }
                    >
                        Refresh Insights
                    </Button>

                </Box>

            )}

        </>
    );
}