import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type InputWithIconProps = React.ComponentProps<typeof Input> & {
  icon: React.ReactNode;
};

export function InputWithIcon({
  icon,
  className,
  ...props
}: InputWithIconProps) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground [&>svg]:size-4 [&>svg]:shrink-0">
        {icon}
      </span>
      <Input className={cn("h-10 pl-10 text-base", className)} {...props} />
    </div>
  );
}
