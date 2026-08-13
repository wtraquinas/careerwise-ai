import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {
    ProfileAPI,
} from "../../shared/services/api";



// -----------------------------------------
// Get Profile
// -----------------------------------------

export const useProfile = () => {

    return useQuery({
        queryKey: ["profile"],
        queryFn: async () => {

            const response =
                await ProfileAPI.getProfile();

            return response.data;

        },
    });

};

// -----------------------------------------
// Update Profile
// -----------------------------------------

export const useUpdateProfile = () => {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn: async (data) => {

            const response =
                await ProfileAPI.updateProfile(data);

            return response.data;

        },

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ["profile"],
            });

        },

    });

};


// -----------------------------------------
// Upload CV
// -----------------------------------------

export const useUploadCV = () => {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn: async (file) => {

            const response =
                await ProfileAPI.uploadCV(file);

            return response.data;

        },

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ["profile"],
            });

        },

    });

};