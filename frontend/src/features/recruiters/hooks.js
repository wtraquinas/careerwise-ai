import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import { RecruiterAPI } from "../../shared/services/api";


export function useRecruiters() {
    return useQuery({
        queryKey: ["recruiters"],

        queryFn: async () => {
            const response = await RecruiterAPI.getAll();
            return response.data;
        },
    });
}


export function useCreateRecruiter() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: RecruiterAPI.create,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["recruiters"],
            });

            queryClient.invalidateQueries({
                queryKey: ["companies"],
            });

            toast.success("Recruiter created successfully");
        },

        onError: () => {
            toast.error("Unable to create recruiter");
        },
    });
}


export function useUpdateRecruiter() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }) =>
            RecruiterAPI.update(id, data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["recruiters"],
            });

            queryClient.invalidateQueries({
                queryKey: ["companies"],
            });

            toast.success("Recruiter updated");
        },

        onError: () => {
            toast.error("Unable to update recruiter");
        },
    });
}


export function useDeleteRecruiter() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) =>
            RecruiterAPI.delete(id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["recruiters"],
            });

            queryClient.invalidateQueries({
                queryKey: ["companies"],
            });

            toast.success("Recruiter deleted");
        },

        onError: () => {
            toast.error("Unable to delete recruiter");
        },
    });
}
