import { z } from "zod";

/** Add food consumption form – userFoodId, quantity (g), optional dateAndTime (ISO 8601 string) */
export const addConsumptionInputSchema = z.object({
  userFoodId: z.string().min(1, "Please select a food"),
  quantity: z
    .number({ invalid_type_error: "Quantity is required" })
    .min(0, "Quantity must be 0 or more"),
  dateAndTime: z.string().optional().nullable(),
});
