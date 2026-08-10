import {
    useCallback,
    useEffect,
    useState,
} from "react";

import {
    Box,
    Button,
    Grid,
    Typography,
} from "@mui/material";

import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

import StatCard from "../../shared/components/StatCard";

import { useDashboardStats } from "../companies/hooks";
import { useAIAnalysis } from "../ai/hooks";

import AIInsightCard from "../ai/AIInsightCard";

export default function Dashboard() {

    const {
        data,
        isLoading,
    } = useDashboardStats();

    const analysisMutation = useAIAnalysis();

    const [analysis, setAnalysis] = useState(null);

    const runAnalysis = useCallback(async () => {
        try {

            const response =
                await analysisMutation.mutateAsync();

            setAnalysis(response.data);

        } catch (error) {

            console.error(
                "AI analysis failed:",
                error
            );

        }
    }, [analysisMutation]);

    useEffect(() => {
        runAnalysis();
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
            title: "Applications",
            value: data?.applications ?? 0,
        },
        {
            title: "Recruiters",
            value: data?.recruiters ?? 0,
        },
        {
            title: "Tasks",
            value: data?.tasks ?? 0,
        },
    ];

    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: 1200,
                mx: "auto",
            }}
        >
            <Typography
                variant="h4"
                sx={{ mb: 3 }}
            >
                Dashboard
            </Typography>

            {/* Statistics */}
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

            {/* AI Career Insight */}
            <AIInsightCard
                insight={analysis}
                isLoading={analysisMutation.isPending}
                error={
                    analysisMutation.isError
                        ? analysisMutation.error
                        : null
                }
                onRefresh={runAnalysis}
            />

            {/* Refresh AI Analysis */}
            {analysis && (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        mt: 3,
                    }}
                >
                    <Button
                        variant="outlined"
                        startIcon={<AutoAwesomeIcon />}
                        onClick={runAnalysis}
                        disabled={analysisMutation.isPending}
                    >
                        Refresh AI Insights
                    </Button>
                </Box>
            )}
        </Box>
    );
}