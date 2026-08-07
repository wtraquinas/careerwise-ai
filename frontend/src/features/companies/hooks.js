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