import { useState } from "react";
import { Target, Flame, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateGoal, useUpdateGoal } from "../hooks";
import { formatMl } from "../utils";
import {
  PRESET_CALORIES,
  PRESET_WATER_ML,
  DEFAULT_CALORIE_GOAL,
  DEFAULT_WATER_GOAL_ML,
} from "../constants";
import type { Goal } from "../types";
import { cn } from "@/lib/utils";

export interface EditGoalsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  goal: Goal | null;
  onSuccess?: () => void;
}

/** Form state is keyed by goal so it remounts with correct initial values when dialog opens (no useEffect sync). */
function EditGoalsDialogForm({
  goal,
  onOpenChange,
  onSuccess,
}: {
  goal: Goal | null;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}) {
  const isCreate = goal === null;
  const [kcalGoal, setKcalGoal] = useState(
    String(goal?.targetCalories ?? DEFAULT_CALORIE_GOAL)
  );
  const [waterGoal, setWaterGoal] = useState(
    String(goal?.targetWaterMl ?? DEFAULT_WATER_GOAL_ML)
  );

  const createGoalMutation = useCreateGoal({
    onSuccess: () => {
      onOpenChange(false);
      onSuccess?.();
    },
  });
  const updateGoalMutation = useUpdateGoal({
    onSuccess: () => {
      onOpenChange(false);
      onSuccess?.();
    },
  });

  const mutation = isCreate ? createGoalMutation : updateGoalMutation;
  const isPending = mutation.isPending;

  const handleSubmit = () => {
    const targetCalories =
      parseInt(String(kcalGoal), 10) || DEFAULT_CALORIE_GOAL;
    const targetWaterMl =
      parseInt(String(waterGoal), 10) || DEFAULT_WATER_GOAL_ML;
    if (targetCalories < 0 || targetWaterMl < 0) return;

    if (isCreate) {
      createGoalMutation.mutate({ targetCalories, targetWaterMl });
    } else {
      updateGoalMutation.mutate({ targetCalories, targetWaterMl });
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Target className="size-5 text-blue-600" />
          {isCreate ? "Set Daily Goals" : "Edit Daily Goals"}
        </DialogTitle>
        <DialogDescription>
          Set your daily calorie and water intake targets. These goals will help
          you track your progress.
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-6 py-4">
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-sm font-medium">
            <Flame className="size-4 text-blue-600" />
            Daily Calorie Goal (kcal)
          </Label>
          <div className="flex flex-wrap gap-2">
            {PRESET_CALORIES.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setKcalGoal(String(preset))}
                className={cn(
                  "rounded-lg border px-3 py-1.5 text-sm font-medium transition-all",
                  parseInt(kcalGoal, 10) === preset
                    ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-950/20"
                    : "border-border hover:border-blue-300"
                )}
              >
                {preset}
              </button>
            ))}
          </div>
          <Input
            type="number"
            value={kcalGoal}
            onChange={(e) => setKcalGoal(e.target.value)}
            placeholder="Enter custom goal"
            min={500}
            max={10000}
          />
        </div>
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-sm font-medium">
            <Droplets className="size-4 text-cyan-600" />
            Daily Water Goal (ml)
          </Label>
          <div className="flex flex-wrap gap-2">
            {PRESET_WATER_ML.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setWaterGoal(String(preset))}
                className={cn(
                  "rounded-lg border px-3 py-1.5 text-sm font-medium transition-all",
                  parseInt(waterGoal, 10) === preset
                    ? "border-cyan-500 bg-cyan-50 text-cyan-700 dark:bg-cyan-950/20"
                    : "border-border hover:border-cyan-300"
                )}
              >
                {formatMl(preset)}
              </button>
            ))}
          </div>
          <Input
            type="number"
            value={waterGoal}
            onChange={(e) => setWaterGoal(e.target.value)}
            placeholder="Enter custom goal in ml"
            min={500}
            max={10000}
          />
        </div>
      </div>
      <DialogFooter className="gap-2 sm:gap-0">
        <DialogClose asChild>
          <Button variant="outline" disabled={isPending}>
            Cancel
          </Button>
        </DialogClose>
        <Button
          onClick={handleSubmit}
          disabled={isPending}
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          {isPending ? "Saving…" : isCreate ? "Create Goals" : "Save Goals"}
        </Button>
      </DialogFooter>
    </>
  );
}

const EditGoalsDialog = ({
  open,
  onOpenChange,
  goal,
  onSuccess,
}: EditGoalsDialogProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-lg">
      {open ? (
        <EditGoalsDialogForm
          key={goal?.id ?? "create"}
          goal={goal}
          onOpenChange={onOpenChange}
          onSuccess={onSuccess}
        />
      ) : null}
    </DialogContent>
  </Dialog>
);

export default EditGoalsDialog;
