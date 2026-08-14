import { useQuery } from "@tanstack/react-query";
import { AuthAPI } from "../../shared/services/api";

export function useCurrentUser() {
    const token = localStorage.getItem("token");

    return useQuery({
        queryKey: ["currentUser"],
        queryFn: async () => {
            const response = await AuthAPI.getCurrentUser();
            return response.data;
        },
        enabled: !!token,
        retry: false,
    });
}