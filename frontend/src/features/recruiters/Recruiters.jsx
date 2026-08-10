import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";

import {
    useDeleteRecruiter,
    useRecruiters,
} from "./hooks";

import RecruiterDialog from "./RecruiterDialog";
import { useState } from "react";
import { useCompanies } from "../companies/hooks";

export default function Recruiters() {

    const {
        data: recruiters = [],
        isLoading,
        isError,
    } = useRecruiters();

    const deleteRecruiter = useDeleteRecruiter();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedRecruiter, setSelectedRecruiter] = useState(null);
    const { data: companies = [] } = useCompanies();

    const getCompanyName = (companyId) => {
        const company = companies.find(
            (company) => company.id === companyId
        );

        return company?.name || `Company #${companyId}`;
    };


    const handleDelete = (id) => {

        if (
            window.confirm(
                "Are you sure you want to delete this recruiter?"
            )
        ) {
            deleteRecruiter.mutate(id);
        }
    };


    if (isLoading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    py: 6,
                }}
            >
                <CircularProgress />
            </Box>
        );
    }


    if (isError) {
        return (
            <Typography color="error">
                Unable to load recruiters.
            </Typography>
        );
    }


    return (
        <Box>

            {/* Header */}

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                }}
            >

                <Box>

                    <Typography
                        variant="h4"
                        fontWeight={600}
                    >
                        Recruiters
                    </Typography>

                    <Typography
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                    >
                        Manage your recruiter contacts and relationships.
                    </Typography>

                </Box>


                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => {
                        setSelectedRecruiter(null);
                        setDialogOpen(true);
                    }}
                >
                    Add Recruiter
                </Button>

            </Box>


            {/* Empty state */}

            {recruiters.length === 0 && (

                <Card>

                    <CardContent>

                        <Typography
                            variant="h6"
                            gutterBottom
                        >
                            No recruiters yet
                        </Typography>

                        <Typography
                            color="text.secondary"
                        >
                            Add recruiters to keep track of your
                            hiring contacts and follow-ups.
                        </Typography>

                    </CardContent>

                </Card>

            )}


            {/* Recruiter cards */}

            <Stack spacing={2}>

                {recruiters.map((recruiter) => (

                    <Card key={recruiter.id}>

                        <CardContent>

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    gap: 2,
                                }}
                            >

                                <Box>

                                    <Typography
                                        variant="h6"
                                        fontWeight={600}
                                    >
                                        {recruiter.name}
                                    </Typography>


                                    {recruiter.company_id && (
                                        <Chip
                                            label={getCompanyName(recruiter.company_id)}
                                            size="small"
                                            sx={{ mt: 1 }}
                                        />
                                    )}

                                </Box>


                                <Box>

                                    <IconButton
                                        color="primary"
                                        aria-label="edit recruiter"
                                        onClick={() => {
                                            setSelectedRecruiter(recruiter);
                                            setDialogOpen(true);
                                        }}
                                    >
                                        <EditIcon />
                                    </IconButton>

                                    <IconButton
                                        color="error"
                                        aria-label="delete recruiter"
                                        onClick={() =>
                                            handleDelete(
                                                recruiter.id
                                            )
                                        }
                                    >
                                        <DeleteIcon />
                                    </IconButton>

                                    <RecruiterDialog
                                        open={dialogOpen}
                                        onClose={() => {
                                            setDialogOpen(false);
                                            setSelectedRecruiter(null);
                                        }}
                                        recruiter={selectedRecruiter}
                                    />

                                </Box>

                            </Box>


                            <Stack
                                direction="row"
                                spacing={2}
                                sx={{ mt: 2 }}
                            >

                                {recruiter.email && (

                                    <Button
                                        size="small"
                                        startIcon={<EmailIcon />}
                                        href={`mailto:${recruiter.email}`}
                                    >
                                        Email
                                    </Button>

                                )}


                                {recruiter.linkedin_url && (

                                    <Button
                                        size="small"
                                        startIcon={<LinkedInIcon />}
                                        href={
                                            recruiter.linkedin_url
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        LinkedIn
                                    </Button>

                                )}

                            </Stack>


                            {recruiter.notes && (
                                <Box
                                    sx={{
                                        mt: 2,
                                        width: "100%",
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {recruiter.notes}
                                    </Typography>
                                </Box>
                            )}

                        </CardContent>

                    </Card>

                ))}

            </Stack>

        </Box>
    );
}