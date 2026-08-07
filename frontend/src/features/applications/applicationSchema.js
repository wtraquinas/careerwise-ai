import { z } from "zod";

export const applicationSchema = z.object({
    company_id: z.coerce.number().min(1, "Select a company"),

    position: z.string().min(2, "Position is required"),

    status: z.string().min(1),

    salary: z.string().optional(),

    job_url: z
        .string()
        .url("Must be a valid URL")
        .or(z.literal("")),

    applied_date: z.string(),

    notes: z.string().optional(),
});