import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAVIGATION_PATHS } from "@/constants";
import { Label } from "@/components/ui/label";
import { validateSchema } from "@/lib/schema";
import { InputWithIcon } from "./InputWithIcon";
import { PasswordInput } from "./PasswordInput";
import { useLogin } from "../hooks";
import { loginInputSchema } from "../schema";
import type { LoginInput } from "../types";
import { getApiErrorMessage } from "@/utils";
import { toast } from "sonner";

type FieldErrors = Partial<Record<keyof LoginInput, string>>;

export function LoginForm() {
  const navigate = useNavigate();
  const login = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});

  const serverError =
    login.error && getApiErrorMessage(login.error)
      ? getApiErrorMessage(login.error)
      : null;

  const onSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const result = validateSchema(loginInputSchema, { email, password });
      if (!result.success) {
        setErrors(result.fieldErrors as FieldErrors);
        return;
      }
      setErrors({});
      await login.mutateAsync(result.data);
      navigate(NAVIGATION_PATHS.DASHBOARD, { replace: true });
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
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
        <PasswordInput
          id="login-password"
          placeholder="Enter your password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-invalid={!!errors.password}
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
        className="w-full bg-blue-600 hover:bg-blue-700 h-11 text-base font-medium"
        disabled={login.isPending}
      >
        {login.isPending ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="size-4 animate-spin" />
            Signing in...
          </span>
        ) : (
          "Sign in"
        )}
      </Button>
    </form>
  );
}
