import { z } from "zod";

/** Login request body */
export const loginInputSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});
