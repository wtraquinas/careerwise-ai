import { z } from "zod";

export const companySchema = z.object({
    name: z.string().min(2, "Company name is required"),
    website: z.string().url("Invalid URL"),
    industry: z.string().min(2),
    location: z.string().min(2),
    notes: z.string().optional(),
});