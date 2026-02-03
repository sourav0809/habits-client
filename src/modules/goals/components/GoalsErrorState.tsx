import { GoalsHeader } from "./GoalsHeader";

export interface GoalsErrorStateProps {
  onEditGoals: () => void;
  error: Error | null;
}

export default function GoalsErrorState({
  onEditGoals,
  error,
}: GoalsErrorStateProps) {
  return (
    <div className="space-y-6">
      <GoalsHeader onEditGoals={onEditGoals} />
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
        {error?.message ?? "Failed to load goals. Please try again."}
      </div>
    </div>
  );
}
