import { z } from "zod";

/** Update food consumption form – quantity, dateAndTime, userFoodId (all optional for PATCH) */
export const updateConsumptionInputSchema = z.object({
  quantity: z
    .number({ invalid_type_error: "Quantity is required" })
    .min(0, "Quantity must be 0 or more")
    .optional(),
  dateAndTime: z.string().optional().nullable(),
  userFoodId: z.string().optional(),
});
