import { z } from "zod";

/** Add food form schema – name, default quantity (g), calories per 100g (kcal) */
export const addFoodInputSchema = z.object({
  name: z.string().min(1, "Name is required").trim(),
  defaultQuantity: z
    .number({ invalid_type_error: "Default quantity is required" })
    .min(0, "Default quantity must be 0 or more"),
  kcalPer100g: z
    .number({ invalid_type_error: "Calories per 100g is required" })
    .min(0, "Calories per 100g must be 0 or more"),
});
