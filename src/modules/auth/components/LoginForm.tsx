import { useState } from "react";
import { Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { InputWithIcon } from "./InputWithIcon";
import { useLogin } from "../hooks";
import { loginInputSchema, type LoginInput } from "../types";
import { getApiErrorMessage } from "../helpers";

type FieldErrors = Partial<Record<keyof LoginInput, string>>;

export function LoginForm() {
  const login = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});

  const serverError =
    login.error && getApiErrorMessage(login.error)
      ? getApiErrorMessage(login.error)
      : null;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = loginInputSchema.safeParse({ email, password });
    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      const flattened = result.error.flatten().fieldErrors;
      if (flattened) {
        (
          Object.entries(flattened) as [
            keyof LoginInput,
            string[] | undefined
          ][]
        ).forEach(([k, v]) => {
          fieldErrors[k] = v?.[0];
        });
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    login.mutate(result.data);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="space-y-3">
        <Label htmlFor="login-email">Email</Label>
        <InputWithIcon
          id="login-email"
          type="email"
          placeholder="Enter your email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={!!errors.email}
          icon={<Mail />}
        />
        {errors.email && (
          <p className="text-sm text-destructive" role="alert">
            {errors.email}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="login-password">Password</Label>
        <InputWithIcon
          id="login-password"
          type="password"
          placeholder="Enter your password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-invalid={!!errors.password}
          icon={<Lock />}
        />
        {errors.password && (
          <p className="text-sm text-destructive" role="alert">
            {errors.password}
          </p>
        )}
      </div>
      {serverError && (
        <p className="text-sm text-destructive" role="alert">
          {serverError}
        </p>
      )}
      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700"
        disabled={login.isPending}
      >
        {login.isPending ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
