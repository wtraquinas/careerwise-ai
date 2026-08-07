import { useMutation } from "@tanstack/react-query";

import { AIAPI } from "../../shared/services/api";

export function useAIChat() {

    return useMutation({

        mutationFn: AIAPI.chat,

    });

}