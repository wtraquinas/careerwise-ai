import { useMemo, useState } from "react";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    TextField,
    IconButton,
    CircularProgress,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import {
    useApplications,
    useCreateApplication,
    useUpdateApplication,
    useDeleteApplication,
    useGenerateCoverLetter,
} from "./hooks";

import { useCompanies } from "../companies/hooks";

import ApplicationTable from "./ApplicationTable";
import ApplicationDialog from "./ApplicationDialog";

import DeleteDialog from "../../shared/components/DeleteDialog";
import AppSnackbar from "../../shared/components/AppSnackbar";

import {
    useAIApplicationAnalysis,
} from "../ai/hooks";

import AIAnalysisDialog from "../ai/AIAnalysisDialog";

import ContentCopyIcon from
    "@mui/icons-material/ContentCopy";


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

    const showSnackbar = (
        message,
        severity = "success"
    ) => {

        setSnackbar({
            open: true,
            message,
            severity,
        });

    };
    
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

    const [analysisApplication, setAnalysisApplication] =
        useState(null);

    const [analysis, setAnalysis] = useState(null);

    const handleAnalyze = async (application) => {
        setAnalysisApplication(application);
        setAnalysis(null);

        try {
            const response =
                await applicationAnalysisMutation.mutateAsync(
                    application.id
                );

            setAnalysis(response.data);

        } catch (error) {
            console.error(
                "Application analysis failed:",
                error
            );
        }
    };

    const [coverLetterDialogOpen, setCoverLetterDialogOpen] =
        useState(false);

    const [generatedCoverLetter, setGeneratedCoverLetter] =
        useState("");

    const generateCoverLetterMutation =
        useGenerateCoverLetter();

    

    

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


    const handleGenerateCoverLetter =
    async (application) => {

        // Store the application being processed
        setSelectedApplication(application);

        // Clear any previous cover letter
        setGeneratedCoverLetter("");

        // Open the dialog immediately
        setCoverLetterDialogOpen(true);

        generateCoverLetterMutation.mutate(
            application.id,
            {

                onSuccess: (data) => {

                    setGeneratedCoverLetter(
                        data.cover_letter
                    );

                },

                onError: (error) => {

                    console.error(
                        "Cover letter generation failed:",
                        error
                    );

                    setGeneratedCoverLetter(
                        "I wasn't able to generate a cover letter right now. Please try again."
                    );

                },

            }
        );

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

                onAnalyze={handleAnalyze}

                onGenerateCoverLetter={
                    handleGenerateCoverLetter
                }
            />

            <AIAnalysisDialog
                open={Boolean(analysisApplication)}
                onClose={() => {
                    setAnalysisApplication(null);
                    setAnalysis(null);
                }}
                analysis={analysis}
                application={analysisApplication}
                loading={applicationAnalysisMutation.isPending}
            />

                
            
            <ApplicationDialog
                open={open}
                onClose={() => setOpen(false)}
                application={selectedApplication}
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

            <Dialog
                open={coverLetterDialogOpen}
                onClose={() => {

                    if (
                        !generateCoverLetterMutation.isPending
                    ) {
                        setCoverLetterDialogOpen(false);
                    }

                }}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>
                    Generate Cover Letter
                </DialogTitle>

                <DialogContent>

                    {generateCoverLetterMutation.isPending ? (

                        <Box
                            sx={{
                                minHeight: 300,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 2,
                            }}
                        >

                            <CircularProgress />

                            <Typography
                                variant="h6"
                            >
                                CareerWise AI is working...
                            </Typography>

                            <Typography
                                color="text.secondary"
                                textAlign="center"
                            >
                                Generating a personalized cover letter
                                based on your application and career profile.
                            </Typography>

                        </Box>

                    ) : (

                        <TextField
                            fullWidth
                            multiline
                            minRows={18}
                            value={
                                generatedCoverLetter || ""
                            }
                            onChange={(event) =>
                                setGeneratedCoverLetter(
                                    event.target.value
                                )
                            }
                        />

                    )}

                </DialogContent>

                <DialogActions>

                    <Button
                        startIcon={<ContentCopyIcon />}
                        onClick={async () => {

                            try {

                                await navigator.clipboard.writeText(
                                    generatedCoverLetter
                                );

                                showSnackbar(
                                    "Cover letter copied to clipboard"
                                );

                            } catch (error) {

                                console.error(
                                    "Failed to copy cover letter:",
                                    error
                                );

                                showSnackbar(
                                    "Could not copy cover letter"
                                );

                            }

                        }}
                        disabled={
                            generateCoverLetterMutation.isPending ||
                            !generatedCoverLetter
                        }
                    >
                        Copy
                    </Button>

                    <Button
                        onClick={() =>
                            setCoverLetterDialogOpen(false)
                        }
                        disabled={
                            generateCoverLetterMutation.isPending
                        }
                    >
                        Close
                    </Button>

                </DialogActions>

            </Dialog>

            {/*
                DeleteDialog
                (We'll connect this next)
            */}
            <AppSnackbar
                open={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
                onClose={() =>
                    setSnackbar((current) => ({
                        ...current,
                        open: false,
                    }))
                }
            />

        </>

    );

}