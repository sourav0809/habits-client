import { z } from "zod";

/** User shape returned by API */
export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
});

export type User = z.infer<typeof userSchema>;

/** API success wrapper: { data, message } */
export const apiSuccessSchema = <T extends z.ZodType>(dataSchema: T) =>
  z.object({
    data: dataSchema,
    message: z.string(),
  });

/** Register response: 201 */
export const registerResponseSchema = apiSuccessSchema(
  z.object({
    user: userSchema,
  })
);
export type RegisterResponse = z.infer<typeof registerResponseSchema>;

/** Login response: 200 */
export const loginResponseSchema = apiSuccessSchema(
  z.object({
    token: z.string(),
    user: userSchema,
  })
);
export type LoginResponse = z.infer<typeof loginResponseSchema>;

/** Me response: 200 */
export const meResponseSchema = apiSuccessSchema(
  z.object({
    user: userSchema,
  })
);
export type MeResponse = z.infer<typeof meResponseSchema>;

/** Register request body */
export const registerInputSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(1, "Name is required"),
  password: z.string().min(1, "Password is required"),
});
export type RegisterInput = z.infer<typeof registerInputSchema>;

/** Login request body */
export const loginInputSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});
export type LoginInput = z.infer<typeof loginInputSchema>;
