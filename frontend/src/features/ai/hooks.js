import {
    useMutation,
    useQuery,
} from "@tanstack/react-query";

import { AIAPI } from "../../shared/services/api";

export function useAIChat() {

    return useMutation({

        mutationFn: AIAPI.chat,

    });

}

export function useAIAnalysis() {
    return useMutation({
        mutationFn: AIAPI.analyze,
    });
}

export function useAIApplicationAnalysis() {
    return useMutation({
        mutationFn: (applicationId) =>
            AIAPI.analyzeApplication(applicationId),
    });
}

export function useAIInsights() {
    return useQuery({
        queryKey: ["ai-insights"],

        queryFn: async () => {
            const response =
                await AIAPI.post("/ai/insights");

            return response.data;
        },
    });
}