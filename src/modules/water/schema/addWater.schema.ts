import { z } from "zod";

export const addWaterInputSchema = z.object({
  amount: z
    .number({ invalid_type_error: "Amount is required" })
    .min(0, "Amount must be 0 or more"),
  dateAndTime: z.string().min(1, "Date and time is required"),
});
