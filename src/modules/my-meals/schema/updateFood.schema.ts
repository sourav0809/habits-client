import { z } from "zod";

/** Update food form schema – at least one of name, default quantity, kcal/100g */
export const updateFoodInputSchema = z
  .object({
    name: z.string().trim().optional(),
    defaultQuantity: z
      .number({ invalid_type_error: "Must be a number" })
      .min(0, "Default quantity must be 0 or more")
      .optional(),
    kcalPer100g: z
      .number({ invalid_type_error: "Must be a number" })
      .min(0, "Calories per 100g must be 0 or more")
      .optional(),
  })
  .refine(
    (data) =>
      data.name !== undefined ||
      data.defaultQuantity !== undefined ||
      data.kcalPer100g !== undefined,
    { message: "At least one field is required" }
  );
