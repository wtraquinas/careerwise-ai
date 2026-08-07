import { useState } from "react";

import {
  Typography,
  TextField,
  Box,
  CircularProgress,
  Button,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import CompanyTable from "./CompanyTable";
import CompanyDialog from "./CompanyDialog";
import { useCompanies } from "./hooks";

export default function Companies() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const {
    data: companies = [],
    isLoading,
    error,
  } = useCompanies();

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(search.toLowerCase())
  );

  const [selectedCompany, setSelectedCompany] =
    useState(null);
  
  const [deleteCompany, setDeleteCompany] =
    useState(null);


  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 300,
        }}
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

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          mb: 3,
        }}
      >
        <TextField
          fullWidth
          label="Search companies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          Add Company
        </Button>
      </Box>

      <CompanyTable companies={filteredCompanies} />

      <CompanyDialog
        open={open}
        onClose={() => setOpen(false)}
        company={selectedCompany}
      />
    </>
  );
}