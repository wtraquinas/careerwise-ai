import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import { UserAPI } from "../../shared/services/api";


// -------------------------
// Get Users
// -------------------------

export function useUsers() {
    return useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const response = await UserAPI.getAll();
            return response.data;
        },
    });
}


// -------------------------
// Create User
// -------------------------

export function useCreateUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: UserAPI.create,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["users"],
            });

            queryClient.invalidateQueries({
                queryKey: ["dashboard"],
            });

            toast.success("User created successfully");
        },

        onError: (error) => {
            const message =
                error?.response?.data?.detail ||
                "Unable to create user";

            toast.error(message);
        },
    });
}


// -------------------------
// Update User
// -------------------------

export function useUpdateUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }) =>
            UserAPI.update(id, data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["users"],
            });

            toast.success("User updated");
        },

        onError: (error) => {
            const message =
                error?.response?.data?.detail ||
                "Unable to update user";

            toast.error(message);
        },
    });
}


// -------------------------
// Delete User
// -------------------------

export function useDeleteUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) =>
            UserAPI.delete(id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["users"],
            });

            queryClient.invalidateQueries({
                queryKey: ["dashboard"],
            });

            toast.success("User deleted");
        },

        onError: (error) => {
            const message =
                error?.response?.data?.detail ||
                "Unable to delete user";

            toast.error(message);
        },
    });
}