import { useQuery } from "@tanstack/react-query";

import { CompanyAPI } from "../../shared/services/api";

import { DashboardAPI } from "../../shared/services/api";

export function useCompanies() {
    return useQuery({
        queryKey: ["companies"],

        queryFn: async () => {
            const response = await CompanyAPI.getAll();
            return response.data;
        },
    });
}

import toast from "react-hot-toast";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateCompany() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: CompanyAPI.create,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["companies"],
            });

            queryClient.invalidateQueries({
                queryKey: ["dashboard"],
            });

            toast.success("Company created successfully");
        },

        onError: () => {
            toast.error("Unable to create company");
        },
    });
}


export function useUpdateCompany() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }) =>
            CompanyAPI.update(id, data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["companies"],
            });

            toast.success("Company updated");
        },

        onError: () => {
            toast.error("Unable to update company");
        },
    });
}


export function useDeleteCompany() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: CompanyAPI.delete,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["companies"],
            });

            queryClient.invalidateQueries({
                queryKey: ["dashboard"],
            });

            toast.success("Company deleted");
        },

        onError: () => {
            toast.error("Unable to delete company");
        },
    });
}


export function useDashboardStats() {
    return useQuery({
        queryKey: ["dashboard"],
        queryFn: async () => {
            const response = await DashboardAPI.getStats();
            return response.data;
        },
    });
}