import { Card, CardContent, Typography } from "@mui/material";

export default function StatCard({ title, value }) {
  return (
    <Card
        sx={{
            height: "100%",
            borderRadius: 2,
            boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
            border: "1px solid #eeeeee",
        }}
    >
        <CardContent
            sx={{
                textAlign: "center",
                py: 2,
                px: 1,
            }}
        >

            <Typography
                variant="body2"
                sx={{
                    mb: 1,
                    fontSize: "0.8rem",
                }}
            >
                {title}
            </Typography>

            <Typography
                sx={{
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    lineHeight: 1,
                }}
            >
                {value}
            </Typography>

        </CardContent>
    </Card> 
  );
}