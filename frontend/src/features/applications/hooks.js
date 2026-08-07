import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
    ApplicationAPI,
} from "../../shared/services/api";

export function useApplications() {
    return useQuery({
        queryKey: ["applications"],

        queryFn: async () => {
            const response = await ApplicationAPI.getAll();
            return response.data;
        },
    });
}

export function useCreateApplication() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: ApplicationAPI.create,

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ["applications"],
            });

            queryClient.invalidateQueries({
                queryKey: ["dashboard"],
            });

        },

    });

}