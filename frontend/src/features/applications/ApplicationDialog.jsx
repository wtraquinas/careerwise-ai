import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
} from "@mui/material";

import { applicationSchema } from "./applicationSchema";
import { useCompanies } from "../companies/hooks";

import { useEffect } from "react";

import {
    useCreateApplication,
    useUpdateApplication,
} from "./hooks";

export default function ApplicationDialog({
    open,
    onClose,
    application,
}) {
    const { data: companies = [] } = useCompanies();

    const createApplication = useCreateApplication();

    const updateApplication = useUpdateApplication();

    const {
        control,
        handleSubmit,
        reset,
    } = useForm({
        resolver: zodResolver(applicationSchema),

        defaultValues: {
            company_id: "",
            position: "",
            status: "Applied",
            salary: "",
            job_url: "",
            applied_date: "",
            notes: "",
        },
    });

    useEffect(() => {

        if (application) {

            reset({
                company_id: application.company_id,
                position: application.position,
                status: application.status,
                salary: application.salary,
                job_url: application.job_url,
                applied_date: application.applied_date,
                notes: application.notes,
            });

        } else {

            reset({
                company_id: "",
                position: "",
                status: "Applied",
                salary: "",
                job_url: "",
                applied_date: "",
                notes: "",
            });

        }

    }, [application, reset]);

    const onSubmit = async (data) => {
        if (application) {

            await updateApplication.mutateAsync({

                id: application.id,

                data,

            });

        } else {

            await createApplication.mutateAsync(data);

        }

        reset();

        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
        >
            <DialogTitle>
                {application
                    ? "Edit Application"
                    : "Add Application"}
            </DialogTitle>

            <DialogContent>

                <Controller
                    name="company_id"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            select
                            fullWidth
                            margin="normal"
                            label="Company"
                        >
                            {companies.map((company) => (
                                <MenuItem
                                    key={company.id}
                                    value={company.id}
                                >
                                    {company.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    )}
                />

                <Controller
                    name="position"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            margin="normal"
                            label="Position"
                        />
                    )}
                />

                <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            select
                            fullWidth
                            margin="normal"
                            label="Status"
                        >
                            <MenuItem value="Applied">Applied</MenuItem>
                            <MenuItem value="Interview">Interview</MenuItem>
                            <MenuItem value="Assessment">Assessment</MenuItem>
                            <MenuItem value="Offer">Offer</MenuItem>
                            <MenuItem value="Accepted">Accepted</MenuItem>
                            <MenuItem value="Rejected">Rejected</MenuItem>
                        </TextField>
                    )}
                />

                <Controller
                    name="salary"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            margin="normal"
                            label="Salary"
                        />
                    )}
                />

                <Controller
                    name="job_url"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            margin="normal"
                            label="Job URL"
                        />
                    )}
                />

                <Controller
                    name="applied_date"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            margin="normal"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            label="Applied Date"
                        />
                    )}
                />

                <Controller
                    name="notes"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            multiline
                            rows={4}
                            margin="normal"
                            label="Notes"
                        />
                    )}
                />

            </DialogContent>

            <DialogActions>

                <Button onClick={onClose}>
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    onClick={handleSubmit(onSubmit)}
                >
                    {application
                        ? "Update"
                        : "Save"}
                </Button>

            </DialogActions>

        </Dialog>
    );
}