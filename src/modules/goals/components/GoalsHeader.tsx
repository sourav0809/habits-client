import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface GoalsHeaderProps {
  onEditGoals: () => void;
}

export function GoalsHeader({ onEditGoals }: GoalsHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Daily Goals
        </h1>
        <p className="text-muted-foreground">
          Set and track your daily calorie and hydration targets. Stay
          consistent to achieve your health objectives.
        </p>
      </div>
      <Button
        onClick={onEditGoals}
        className="w-full bg-blue-600 text-white hover:bg-blue-700 sm:w-auto"
      >
        <Pencil className="size-4" />
        Edit Goals
      </Button>
    </div>
  );
}
