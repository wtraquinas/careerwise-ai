import { useState } from "react";

import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useTasks, useDeleteTask } from "./hooks";
import TaskDialog from "./TaskDialog";

import { useRecruiters } from "../recruiters/hooks";
import { useApplications } from "../applications/hooks";

export default function Tasks() {
    const { data: tasks = [], isLoading } = useTasks();
    const deleteTask = useDeleteTask();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const { data: recruiters = [] } = useRecruiters();
    const { data: applications = [] } = useApplications();

    const handleAdd = () => {
        setSelectedTask(null);
        setDialogOpen(true);
    };

    const handleEdit = (task) => {
        setSelectedTask(task);
        setDialogOpen(true);
    };

    const handleDelete = async (task) => {
        const confirmed = window.confirm(
            `Delete "${task.title}"?`
        );

        if (!confirmed) {
            return;
        }

        await deleteTask.mutateAsync(task.id);
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case "high":
                return "error";

            case "medium":
                return "warning";

            case "low":
                return "success";

            default:
                return "default";
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "completed":
                return "success";

            case "in_progress":
                return "info";

            case "pending":
                return "default";

            default:
                return "default";
        }
    };

    return (
        <Box sx={{ p: 3 }}>

            {/* Header */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                }}
            >
                <Typography variant="h4">
                    Tasks
                </Typography>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAdd}
                >
                    Add Task
                </Button>
            </Box>

            <Typography
                color="text.secondary"
                sx={{ mb: 3 }}
            >
                Manage your career-related tasks and follow-ups.
            </Typography>

            {/* Loading */}
            {isLoading && (
                <Typography>
                    Loading tasks...
                </Typography>
            )}

            {/* Empty state */}
            {!isLoading && tasks.length === 0 && (
                <Card>
                    <CardContent>
                        <Typography
                            variant="h6"
                            gutterBottom
                        >
                            No tasks yet
                        </Typography>

                        <Typography
                            color="text.secondary"
                            sx={{ mb: 2 }}
                        >
                            Create a task to keep track of
                            recruiter follow-ups, interviews,
                            applications and other career actions.
                        </Typography>

                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={handleAdd}
                        >
                            Add your first task
                        </Button>
                    </CardContent>
                </Card>
            )}

            {/* Tasks */}
            <Stack spacing={2}>

                {tasks.map((task) => (
                    <Card
                        key={task.id}
                        sx={{
                            position: "relative",
                        }}
                    >
                        <CardContent>

                            {/* Title + actions */}
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "flex-start",
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 500,
                                        pr: 2,
                                    }}
                                >
                                    {task.title}
                                </Typography>

                                <Box>
                                    <IconButton
                                        color="primary"
                                        onClick={() =>
                                            handleEdit(task)
                                        }
                                    >
                                        <EditIcon />
                                    </IconButton>

                                    <IconButton
                                        color="error"
                                        onClick={() =>
                                            handleDelete(task)
                                        }
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </Box>

                            {/* Description */}
                            {task.description && (
                                <Typography
                                    color="text.secondary"
                                    sx={{
                                        mt: 0.5,
                                        mb: 2,
                                    }}
                                >
                                    {task.description}
                                </Typography>
                            )}

                            {/* Status / Priority */}
                            <Stack
                                direction="row"
                                spacing={1}
                                sx={{ mb: 2 }}
                            >
                                <Chip
                                    label={task.status}
                                    size="small"
                                    color={getStatusColor(
                                        task.status
                                    )}
                                />

                                <Chip
                                    label={task.priority}
                                    size="small"
                                    color={getPriorityColor(
                                        task.priority
                                    )}
                                />
                            </Stack>

                            {/* Metadata */}
                            <Stack spacing={0.5}>
                                {task.due_date && (
                                    <Typography variant="body2">
                                        <strong>Due:</strong>{" "}
                                        {task.due_date}
                                    </Typography>
                                )}

                                {task.recruiter_id && (
                                    <Typography variant="body2">
                                        <strong>Recruiter:</strong>{" "}
                                        {
                                            recruiters.find(
                                                (recruiter) =>
                                                    recruiter.id === task.recruiter_id
                                            )?.name || "Unknown recruiter"
                                        }
                                    </Typography>
                                )}

                                {task.application_id && (
                                    <Typography variant="body2">
                                        <strong>Application:</strong>{" "}
                                        {
                                            (() => {
                                                const application = applications.find(
                                                    (item) =>
                                                        item.id === task.application_id
                                                );

                                                if (!application) {
                                                    return "Unknown application";
                                                }

                                                return application.position
                                                    ? `${application.position} (#${application.id})`
                                                    : `#${application.id}`;
                                            })()
                                        }
                                    </Typography>
                                )}
                            </Stack>

                        </CardContent>
                    </Card>
                ))}

            </Stack>

            {/* Dialog */}
            <TaskDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                task={selectedTask}
            />

        </Box>
    );
}