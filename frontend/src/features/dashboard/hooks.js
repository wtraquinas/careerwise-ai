import { useQuery } from "@tanstack/react-query";

import { DashboardAPI } from "../../shared/services/api";

export function useDashboardStats() {
    return useQuery({
        queryKey: ["dashboard"],
        queryFn: async () => {
            const response = await DashboardAPI.getStats();
            return response.data;
        },
    });
}