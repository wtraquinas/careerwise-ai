import { useMemo, useState } from "react";

import {
    Typography,
    TextField,
    Box,
    Button,
    CircularProgress,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import {
    useApplications,
    useCreateApplication,
    useUpdateApplication,
    useDeleteApplication,
} from "./hooks";

import { useCompanies } from "../companies/hooks";

import ApplicationTable from "./ApplicationTable";
import ApplicationDialog from "./ApplicationDialog";

import DeleteDialog from "../../shared/components/DeleteDialog";
import AppSnackbar from "../../shared/components/AppSnackbar";

import {
    useAIApplicationAnalysis,
} from "../ai/hooks";

export default function Applications() {

    const [search, setSearch] = useState("");

    const [open, setOpen] = useState(false);

    const [selectedApplication, setSelectedApplication] = useState(null);

    const [deleteApplication, setDeleteApplication] = useState(null);

    const {
        data: applications = [],
        isLoading,
        error,
    } = useApplications();

    const {
        data: companies = [],
    } = useCompanies();


    const [snackbar, setSnackbar] = useState({
      open: false,
      message: "",
      severity: "success",
    });
    
    const createMutation = useCreateApplication();
    const updateMutation = useUpdateApplication();
    const deleteMutation = useDeleteApplication();

    const handleDeleteClick = (application) => {
        setDeleteApplication(application);
    };

    const handleConfirmDelete = async () => {
      try {
        await deleteMutation.mutateAsync(deleteApplication.id);

        setSnackbar({
          open: true,
          message: "Application deleted successfully",
          severity: "success",
        });

        setDeleteApplication(null);

      } catch {

        setSnackbar({
          open: true,
          message: "Failed to delete application",
          severity: "error",
        });

      }
    };


    const applicationAnalysisMutation =
    useAIApplicationAnalysis();

    // -----------------------------
    // Create company lookup
    // -----------------------------

    const companyMap = useMemo(() => {

        const map = {};

        companies.forEach((company) => {

            map[company.id] = company.name;

        });

        return map;

    }, [companies]);

    // -----------------------------
    // Handle Save
    // -----------------------------

    const handleSave = async (data) => {
        try {
            if (selectedApplication) {
                await updateMutation.mutateAsync({
                    id: selectedApplication.id,
                    data,
                });

                setSnackbar({
                    open: true,
                    message: "Application updated successfully",
                    severity: "success",
                });

            } else {
                await createMutation.mutateAsync(data);

                setSnackbar({
                    open: true,
                    message: "Application created successfully",
                    severity: "success",
                });
            }

            setOpen(false);
            setSelectedApplication(null);

        } catch (error) {
            console.error(error);

            setSnackbar({
                open: true,
                message: "Failed to save application",
                severity: "error",
            });
        }
    };


    // -----------------------------
    // Search
    // -----------------------------
    const filteredApplications = applications.filter((application) => {

        const companyName =
            companyMap[application.company_id] ?? "";

        return (

            application.position
                .toLowerCase()
                .includes(search.toLowerCase())

            ||

            application.status
                .toLowerCase()
                .includes(search.toLowerCase())

            ||

            companyName
                .toLowerCase()
                .includes(search.toLowerCase())

        );

    });

    // -----------------------------
    // Loading
    // -----------------------------

    if (isLoading) {

        return (

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 5,
                }}
            >
                <CircularProgress />
            </Box>

        );

    }

    // -----------------------------
    // Error
    // -----------------------------

    if (error) {

        return (

            <Typography color="error">

                Error loading applications.

            </Typography>

        );

    }

    // -----------------------------
    // UI
    // -----------------------------

    return (

        <>

            <Typography
                variant="h4"
                sx={{ mb: 3 }}
            >
                Applications
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                    gap: 2,
                }}
            >

                <TextField
                    fullWidth
                    label="Search applications..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => {

                        setSelectedApplication(null);

                        setOpen(true);

                    }}
                >
                    Add Application
                </Button>

                

            </Box>

            <ApplicationTable
                applications={filteredApplications}
                companyMap={companyMap}
                onEdit={(application) => {
                    setSelectedApplication(application);
                    setOpen(true);
                }}
                onDelete={handleDeleteClick}
                onAnalyze={(application) => {
                    applicationAnalysisMutation.mutate(
                        application.id
                    );
                }}
            />

            <ApplicationDialog
                open={open}
                onClose={() => setOpen(false)}
                application={selectedApplication}
                onSave={handleSave}
            />

            <DeleteDialog
              open={Boolean(deleteApplication)}
              title="Delete Application"
              itemName={
                deleteApplication?.position || ""
              }
              description="This action cannot be undone."
              onClose={() => setDeleteApplication(null)}
              onConfirm={handleConfirmDelete}
              loading={deleteMutation.isPending}
            />

            <AppSnackbar
              open={snackbar.open}
              message={snackbar.message}
              severity={snackbar.severity}
              onClose={() =>
                setSnackbar({
                  ...snackbar,
                  open: false,
                })
              }
            />

            {/*
                DeleteDialog
                (We'll connect this next)
            */}

        </>

    );

}