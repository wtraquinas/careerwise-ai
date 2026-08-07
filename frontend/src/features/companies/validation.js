import { z } from "zod";

export const companySchema = z.object({
    name: z.string().min(2, "Name is required"),
    website: z.string().url("Invalid website"),
    industry: z.string().min(2),
    location: z.string().min(2),
    notes: z.string().optional(),
});