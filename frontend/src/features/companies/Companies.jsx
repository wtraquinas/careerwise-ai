import { useState } from "react";

import {
  Typography,
  TextField,
  Box,
  CircularProgress,
  Fab,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import CompanyTable from "./CompanyTable";
import { useCompanies } from "./hooks";

export default function Companies() {
  const [search, setSearch] = useState("");

  const {
    data: companies = [],
    isLoading,
    error,
  } = useCompanies();

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        mt={5}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error">
        Error loading companies.
      </Typography>
    );
  }

  return (
    <>
      <Typography
        variant="h4"
        sx={{ mb: 3 }}
      >
        Companies
      </Typography>

      <TextField
        fullWidth
        label="Search companies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3 }}
      />

      <CompanyTable companies={filteredCompanies} />

      <Fab
        color="primary"
        sx={{
          position: "fixed",
          bottom: 30,
          right: 30,
        }}
      >
        <AddIcon />
      </Fab>
    </>
  );
}