import { Paper, Typography } from "@mui/material";

export default function StatCard({ title, value }) {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="subtitle2">
        {title}
      </Typography>

      <Typography variant="h3">
        {value}
      </Typography>
    </Paper>
  );
}