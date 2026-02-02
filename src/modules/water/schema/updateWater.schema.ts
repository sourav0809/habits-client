import { z } from "zod";

export const updateWaterInputSchema = z.object({
  amount: z
    .number({ invalid_type_error: "Amount is required" })
    .min(0, "Amount must be 0 or more")
    .optional(),
  dateAndTime: z.string().optional(),
});
