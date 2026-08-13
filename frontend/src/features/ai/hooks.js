import { useMutation } from "@tanstack/react-query";

import { AIAPI } from "../../shared/services/api";


export function useAIChat() {
    return useMutation({
        mutationFn: (question) =>
            AIAPI.ask(question),
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


// Temporary compatibility hook for Applications.jsx
export function useAIApplicationAnalysis() {

    return useMutation({

        mutationFn: (applicationId) =>
            AIAPI.analyzeApplication(
                applicationId
            ),

    });

}