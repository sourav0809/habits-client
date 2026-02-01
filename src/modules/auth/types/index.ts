import type { z } from "zod";
import { loginInputSchema, registerInputSchema } from "../schema";

/** User shape returned by API */
export interface User {
  id: string;
  email: string;
  name: string;
}

/** API success wrapper: { data, message } */
export interface ApiSuccess<T> {
  data: T;
  message: string;
}

export type LoginInput = z.infer<typeof loginInputSchema>;
export type RegisterInput = z.infer<typeof registerInputSchema>;

export type LoginResponse = ApiSuccess<{ token: string; user: User }>;
export type RegisterResponse = ApiSuccess<{ user: User }>;
export type MeResponse = ApiSuccess<{ user: User }>;
