import { useState } from "react";

import {
  Typography,
  TextField,
  Box,
  CircularProgress,
  Button,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import { useSnackbar } from "notistack";
import DeleteDialog from "../../shared/components/DeleteDialog";

import CompanyTable from "./CompanyTable";
import CompanyDialog from "./CompanyDialog";
import {
    useCompanies,
    useDeleteCompany,
} from "./hooks";

export default function Companies() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const deleteMutation = useDeleteCompany();
  const { enqueueSnackbar } = useSnackbar();

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
  
  const handleDeleteClick = (company) => {
      setDeleteCompany(company);
  };

  const handleConfirmDelete = async () => {
      try {
          await deleteMutation.mutateAsync(deleteCompany.id);

          setDeleteCompany(null);

          enqueueSnackbar("Company deleted successfully", {
              variant: "success",
          });

      } catch (error) {
          console.error(error);

          enqueueSnackbar("Failed to delete company", {
              variant: "error",
          });
      }
  };
  
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
          onClick={() => {
              setSelectedCompany(null);
              setOpen(true);
          }}
        >
          Add Company
        </Button>
      </Box>

      <CompanyTable
          companies={filteredCompanies}
          onEdit={(company) => {
              setSelectedCompany(company);
              setOpen(true);
          }}
          onDelete={handleDeleteClick}
      />

      <CompanyDialog
        open={open}
        onClose={() => setOpen(false)}
        company={selectedCompany}
      />

      <DeleteDialog
          open={Boolean(deleteCompany)}
          title="Delete Company"
          description={`Delete "${deleteCompany?.name}"?`}
          onClose={() => setDeleteCompany(null)}
          onConfirm={handleConfirmDelete}
      />
    </>
  );
}