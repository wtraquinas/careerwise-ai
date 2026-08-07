import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Stack,
} from "@mui/material";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { companySchema } from "./companySchema";
import { useCreateCompany } from "./hooks";

export default function CompanyDialog({
    open,
    onClose,
    company,
}) {

    const createCompany = useCreateCompany();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(companySchema),

        defaultValues: {
            name: "",
            website: "",
            industry: "",
            location: "",
            notes: "",
        },
    });

    const onSubmit = (data) => {

        createCompany.mutate(data, {

            onSuccess: () => {

                reset();

                onClose();

            },

        });

    };

    return (

        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >

            <form onSubmit={handleSubmit(onSubmit)}>

                <DialogTitle>

                    Add Company

                </DialogTitle>

                <DialogContent>

                    <Stack spacing={2} sx={{ mt: 1 }}>

                        <TextField
                            label="Company Name"
                            fullWidth
                            {...register("name")}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />

                        <TextField
                            label="Website"
                            fullWidth
                            {...register("website")}
                            error={!!errors.website}
                            helperText={errors.website?.message}
                        />

                        <TextField
                            label="Industry"
                            fullWidth
                            {...register("industry")}
                            error={!!errors.industry}
                            helperText={errors.industry?.message}
                        />

                        <TextField
                            label="Location"
                            fullWidth
                            {...register("location")}
                            error={!!errors.location}
                            helperText={errors.location?.message}
                        />

                        <TextField
                            label="Notes"
                            fullWidth
                            multiline
                            rows={4}
                            {...register("notes")}
                            error={!!errors.notes}
                            helperText={errors.notes?.message}
                        />

                    </Stack>

                </DialogContent>

                <DialogActions>

                    <Button
                        onClick={() => {

                            reset();

                            onClose();

                        }}
                    >
                        Cancel
                    </Button>

                    <Button
                        type="submit"
                        variant="contained"
                        disabled={createCompany.isPending}
                    >
                        {createCompany.isPending
                            ? "Saving..."
                            : "Save"}
                    </Button>

                </DialogActions>

            </form>

        </Dialog>

    );

}