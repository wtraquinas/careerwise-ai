import Typography from "@mui/material/Typography";
import CompanyTable from "./CompanyTable";

export default function Companies() {
  return (
    <>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Companies
      </Typography>

      <CompanyTable />
    </>
  );
}