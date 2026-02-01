import type { z } from "zod";

export type ValidationSuccess<T> = { success: true; data: T };
export type ValidationFailure = {
  success: false;
  fieldErrors: Record<string, string>;
};

export type ValidationResult<T> = ValidationSuccess<T> | ValidationFailure;

/**
 * Validate data against a Zod schema. Use anywhere you need schema validation
 * with a consistent shape for success (data) or failure (fieldErrors).
 */
export function validateSchema<T>(
  schema: z.ZodType<T>,
  data: unknown
): ValidationResult<T> {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  const flattened = result.error.flatten().fieldErrors;
  const fieldErrors: Record<string, string> = {};
  if (flattened && typeof flattened === "object") {
    for (const [key, messages] of Object.entries(flattened)) {
      const message = Array.isArray(messages) ? messages[0] : messages;
      if (message) fieldErrors[key] = message;
    }
  }
  return { success: false, fieldErrors };
}
