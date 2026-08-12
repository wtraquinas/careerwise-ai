import { useMutation } from "@tanstack/react-query";

import { AIAPI } from "../../shared/services/api";

export function useAIChat() {
    return useMutation({
        mutationFn: AIAPI.ask,
    });
}

export function useAIAnalysis() {
    return useMutation({
        mutationFn: () =>
            AIAPI.ask(
                "What should I focus on in my job search?"
            ),
    });
}

export function useAIApplicationAnalysis() {
    return useMutation({
        mutationFn: (applicationId) =>
            AIAPI.analyzeApplication(applicationId),
    });
}