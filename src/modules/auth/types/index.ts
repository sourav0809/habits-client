import type { z } from "zod";
import { loginInputSchema, registerInputSchema } from "../schema";
import type { AxiosResponse } from "axios";

/** User shape returned by API */
export interface User {
  id: string;
  email: string;
  name: string;
}

export type LoginInput = z.infer<typeof loginInputSchema>;
export type RegisterInput = z.infer<typeof registerInputSchema>;

export type LoginResponse = AxiosResponse<{ data: User, token: string }>;
export type RegisterResponse = AxiosResponse<{ data: User, token: string }>;
export type MeResponse = AxiosResponse<{ data: User }>;
