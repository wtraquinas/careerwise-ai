import { useEffect, useState } from "react";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";

import {
    useCreateTask,
    useUpdateTask,
} from "./hooks";

import { useRecruiters } from "../recruiters/hooks";
import { useApplications } from "../applications/hooks";

export default function TaskDialog({
    open,
    onClose,
    task = null,
}) {
    const createTask = useCreateTask();
    const updateTask = useUpdateTask();

    const { data: recruiters = [] } = useRecruiters();
    const { data: applications = [] } = useApplications();

    const [form, setForm] = useState({
        title: "",
        description: "",
        status: "pending",
        priority: "medium",
        due_date: "",
        application_id: "",
        recruiter_id: "",
    });

    useEffect(() => {
        if (task) {
            setForm({
                title: task.title || "",
                description: task.description || "",
                status: task.status || "pending",
                priority: task.priority || "medium",
                due_date: task.due_date || "",
                application_id: task.application_id || "",
                recruiter_id: task.recruiter_id || "",
            });
        } else {
            setForm({
                title: "",
                description: "",
                status: "pending",
                priority: "medium",
                due_date: "",
                application_id: "",
                recruiter_id: "",
            });
        }
    }, [task, open]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            title: form.title,
            description: form.description || null,
            status: form.status,
            priority: form.priority,
            due_date: form.due_date || null,
            application_id:
                form.application_id === ""
                    ? null
                    : Number(form.application_id),
            recruiter_id:
                form.recruiter_id === ""
                    ? null
                    : Number(form.recruiter_id),
        };

        try {
            if (task) {
                await updateTask.mutateAsync({
                    id: task.id,
                    data,
                });
            } else {
                await createTask.mutateAsync(data);
            }

            onClose();
        } catch (error) {
            // Mutation hooks handle the error toast.
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>
                {task ? "Edit Task" : "Add Task"}
            </DialogTitle>

            <form onSubmit={handleSubmit}>
                <DialogContent>

                    <TextField
                        fullWidth
                        required
                        margin="normal"
                        label="Title"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        margin="normal"
                        label="Description"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                    />

                    <FormControl fullWidth margin="normal">
                        <InputLabel>Status</InputLabel>

                        <Select
                            name="status"
                            value={form.status}
                            label="Status"
                            onChange={handleChange}
                        >
                            <MenuItem value="pending">
                                Pending
                            </MenuItem>

                            <MenuItem value="in_progress">
                                In Progress
                            </MenuItem>

                            <MenuItem value="completed">
                                Completed
                            </MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <InputLabel>Priority</InputLabel>

                        <Select
                            name="priority"
                            value={form.priority}
                            label="Priority"
                            onChange={handleChange}
                        >
                            <MenuItem value="low">
                                Low
                            </MenuItem>

                            <MenuItem value="medium">
                                Medium
                            </MenuItem>

                            <MenuItem value="high">
                                High
                            </MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        fullWidth
                        margin="normal"
                        type="date"
                        label="Due Date"
                        name="due_date"
                        value={form.due_date}
                        onChange={handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <FormControl fullWidth margin="normal">
                        <InputLabel>Recruiter</InputLabel>

                        <Select
                            name="recruiter_id"
                            value={form.recruiter_id}
                            label="Recruiter"
                            onChange={handleChange}
                        >
                            <MenuItem value="">
                                None
                            </MenuItem>

                            {recruiters.map((recruiter) => (
                                <MenuItem
                                    key={recruiter.id}
                                    value={recruiter.id}
                                >
                                    {recruiter.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <InputLabel>Application</InputLabel>

                        <Select
                            name="application_id"
                            value={form.application_id}
                            label="Application"
                            onChange={handleChange}
                        >
                            <MenuItem value="">
                                None
                            </MenuItem>

                            {applications.map((application) => (
                                <MenuItem
                                    key={application.id}
                                    value={application.id}
                                >
                                    #{application.id} —{" "}
                                    {application.position}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                </DialogContent>

                <DialogActions>
                    <Button onClick={onClose}>
                        Cancel
                    </Button>

                    <Button
                        type="submit"
                        variant="contained"
                        disabled={
                            createTask.isPending ||
                            updateTask.isPending
                        }
                    >
                        {task ? "Save Changes" : "Add Task"}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}