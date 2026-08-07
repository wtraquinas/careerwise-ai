import { Grid, Typography } from "@mui/material";
import StatCard from "../../shared/components/StatCard";
import { useDashboardStats } from "../companies/hooks";

export default function Dashboard() {

    const { data, isLoading } = useDashboardStats();

    if (isLoading) {
        return <Typography>Loading...</Typography>;
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
            <Typography variant="h4" sx={{ mb: 3 }}>
                Dashboard
            </Typography>

            <Grid container spacing={3}>
                {stats.map((card) => (
                    <Grid
                        key={card.title}
                        size={{ xs: 12, sm: 6, md: 3 }}
                    >
                        <StatCard
                            title={card.title}
                            value={card.value}
                        />
                    </Grid>
                ))}
            </Grid>
        </>
    );
}