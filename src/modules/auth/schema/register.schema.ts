import { z } from "zod";

/** Register request body */
export const registerInputSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(1, "Name is required"),
  password: z.string().min(1, "Password is required"),
});
