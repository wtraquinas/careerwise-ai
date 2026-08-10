import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import { TaskAPI } from "../../shared/services/api";


// -------------------------
// Get Tasks
// -------------------------

export function useTasks() {
    return useQuery({
        queryKey: ["tasks"],

        queryFn: async () => {
            const response = await TaskAPI.getAll();
            return response.data;
        },
    });
}


// -------------------------
// Create Task
// -------------------------

export function useCreateTask() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: TaskAPI.create,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["tasks"],
            });

            queryClient.invalidateQueries({
                queryKey: ["dashboard"],
            });

            toast.success("Task created successfully");
        },

        onError: () => {
            toast.error("Unable to create task");
        },
    });
}


// -------------------------
// Update Task
// -------------------------

export function useUpdateTask() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }) =>
            TaskAPI.update(id, data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["tasks"],
            });

            toast.success("Task updated");
        },

        onError: () => {
            toast.error("Unable to update task");
        },
    });
}


// -------------------------
// Delete Task
// -------------------------

export function useDeleteTask() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => TaskAPI.delete(id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["tasks"],
            });

            queryClient.invalidateQueries({
                queryKey: ["dashboard"],
            });

            toast.success("Task deleted");
        },

        onError: () => {
            toast.error("Unable to delete task");
        },
    });
}