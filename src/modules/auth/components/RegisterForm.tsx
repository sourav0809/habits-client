import { useState } from "react";
import { Lock, Mail, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { validateSchema } from "@/lib/schema";
import { InputWithIcon } from "./InputWithIcon";
import { useRegister } from "../hooks";
import { registerInputSchema } from "../schema";
import type { RegisterInput } from "../types";
import { getApiErrorMessage } from "@/utils";
import { NAVIGATION_PATHS } from "@/constants";
import { toast } from "sonner";

type FieldErrors = Partial<Record<keyof RegisterInput, string>>;

export function RegisterForm() {
  const navigate = useNavigate();
  const register = useRegister();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});

  const serverError =
    register.error && getApiErrorMessage(register.error)
      ? getApiErrorMessage(register.error)
      : null;

  const onSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const result = validateSchema(registerInputSchema, {
        name,
        email,
        password,
      });
      if (!result.success) {
        setErrors(result.fieldErrors as FieldErrors);
        return;
      }
      setErrors({});
      await register.mutateAsync(result.data);
      navigate(NAVIGATION_PATHS.DASHBOARD, { replace: true });
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="space-y-2.5">
        <Label htmlFor="register-name">Name</Label>
        <InputWithIcon
          id="register-name"
          type="text"
          placeholder="Enter your name"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={!!errors.name}
          icon={<User />}
        />
        {errors.name && (
          <p className="text-sm text-destructive" role="alert">
            {errors.name}
          </p>
        )}
      </div>
      <div className="space-y-2.5">
        <Label htmlFor="register-email">Email</Label>
        <InputWithIcon
          id="register-email"
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
      <div className="space-y-2.5">
        <Label htmlFor="register-password">Password</Label>
        <InputWithIcon
          id="register-password"
          type="password"
          placeholder="Enter your password"
          autoComplete="new-password"
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
        disabled={register.isPending}
      >
        {register.isPending ? "Creating account…" : "Create account"}
      </Button>
    </form>
  );
}
