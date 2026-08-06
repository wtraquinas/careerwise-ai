import {
  Grid,
  Typography,
} from "@mui/material";

import StatCard from "../../shared/components/StatCard";

const stats = [
  { title: "Applications", value: 12 },
  { title: "Interviews", value: 4 },
  { title: "Offers", value: 1 },
  { title: "Companies", value: 18 },
];

export default function Dashboard() {
  return (
    <>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {stats.map((card) => (
            <Grid item xs={12} sm={6} md={3} key={card.title}>
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