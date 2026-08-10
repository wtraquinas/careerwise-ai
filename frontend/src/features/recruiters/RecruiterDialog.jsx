import { useEffect, useState } from "react";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";

import {
    useCreateRecruiter,
    useUpdateRecruiter,
} from "./hooks";

export default function RecruiterDialog({
    open,
    onClose,
    recruiter = null,
}) {
    const isEdit = Boolean(recruiter);

    const createRecruiter = useCreateRecruiter();
    const updateRecruiter = useUpdateRecruiter();

    const [form, setForm] = useState({
        name: "",
        email: "",
        linkedin_url: "",
        phone: "",
        notes: "",
        company_id: "",
    });

    useEffect(() => {
        if (recruiter) {
            setForm({
                name: recruiter.name || "",
                email: recruiter.email || "",
                linkedin_url: recruiter.linkedin_url || "",
                phone: recruiter.phone || "",
                notes: recruiter.notes || "",
                company_id: recruiter.company_id || "",
            });
        } else {
            setForm({
                name: "",
                email: "",
                linkedin_url: "",
                phone: "",
                notes: "",
                company_id: "",
            });
        }
    }, [recruiter, open]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        const data = {
            name: form.name,
            email: form.email || null,
            linkedin_url: form.linkedin_url || null,
            phone: form.phone || null,
            notes: form.notes || null,
            company_id: form.company_id
                ? Number(form.company_id)
                : null,
        };

        if (isEdit) {
            updateRecruiter.mutate(
                {
                    id: recruiter.id,
                    data,
                },
                {
                    onSuccess: onClose,
                }
            );
        } else {
            createRecruiter.mutate(data, {
                onSuccess: onClose,
            });
        }
    };

    const isSaving =
        createRecruiter.isPending ||
        updateRecruiter.isPending;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>
                {isEdit
                    ? "Edit Recruiter"
                    : "Add Recruiter"}
            </DialogTitle>

            <DialogContent>
                <TextField
                    fullWidth
                    required
                    label="Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    margin="normal"
                />

                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    margin="normal"
                />

                <TextField
                    fullWidth
                    label="LinkedIn URL"
                    name="linkedin_url"
                    value={form.linkedin_url}
                    onChange={handleChange}
                    margin="normal"
                />

                <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    margin="normal"
                />

                <TextField
                    fullWidth
                    label="Company ID"
                    name="company_id"
                    type="number"
                    value={form.company_id}
                    onChange={handleChange}
                    margin="normal"
                />

                <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    label="Notes"
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    margin="normal"
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={!form.name.trim() || isSaving}
                >
                    {isSaving
                        ? "Saving..."
                        : isEdit
                        ? "Save Changes"
                        : "Add Recruiter"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}