import type { z } from "zod";
import { loginInputSchema, registerInputSchema } from "../schema";

/** User shape returned by API */
export interface User {
  id: string;
  email: string;
  name: string;
}

export type LoginInput = z.infer<typeof loginInputSchema>;
export type RegisterInput = z.infer<typeof registerInputSchema>;

/** Google OAuth input */
export interface GoogleLoginInput {
  idToken: string;
}

/** Extracted response from api client (inner data) */
export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterResponse {
  user: User;
  token: string;
}

export interface MeResponse {
  user: User;
}
