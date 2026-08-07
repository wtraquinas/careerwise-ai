import { useMemo, useState } from "react";

import {
    Typography,
    TextField,
    Box,
    Button,
    CircularProgress,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import { useApplications } from "./hooks";
import { useCompanies } from "../companies/hooks";

import ApplicationTable from "./ApplicationTable";
import ApplicationDialog from "./ApplicationDialog";

export default function Applications() {

    const [search, setSearch] = useState("");

    const [open, setOpen] = useState(false);

    const [selectedApplication, setSelectedApplication] = useState(null);

    // We'll add this when implementing DeleteDialog
    // const [deleteApplication, setDeleteApplication] = useState(null);

    const {
        data: applications = [],
        isLoading,
        error,
    } = useApplications();

    const {
        data: companies = [],
    } = useCompanies();

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
                onDelete={(application) => {
                    console.log("Delete", application);
                }}
            />

            <ApplicationDialog
                open={open}
                onClose={() => setOpen(false)}
                application={selectedApplication}
            />

            {/*
                DeleteDialog
                (We'll connect this next)
            */}

        </>

    );

}