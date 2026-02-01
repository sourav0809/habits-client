import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { validateSchema } from "@/lib/schema";
import { getApiErrorMessage } from "@/utils";
import { useUpdateFood } from "../hooks";
import { updateFoodInputSchema } from "../schema";
import { getKcalPer100g } from "../utils";
import type { Food } from "../types";
import type { UpdateFoodInput } from "../types";

type FieldErrors = Partial<Record<keyof UpdateFoodInput, string>>;

export interface EditFoodDialogProps {
  food: Food | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditFoodDialog({
  food,
  open,
  onOpenChange,
}: EditFoodDialogProps) {
  const [name, setName] = useState("");
  const [defaultQuantityGrams, setDefaultQuantityGrams] = useState("");
  const [kcalPer100g, setKcalPer100g] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});

  const updateFood = useUpdateFood({
    onSuccess: () => {
      onOpenChange(false);
      setErrors({});
    },
  });

  useEffect(() => {
    if (food && open) {
      setName(food.name);
      setDefaultQuantityGrams(String(food.defaultQuantity));
      setKcalPer100g(String(getKcalPer100g(food)));
    }
  }, [food, open]);

  const serverError =
    updateFood.error && getApiErrorMessage(updateFood.error)
      ? getApiErrorMessage(updateFood.error)
      : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!food) return;
    const defaultQuantity = Number(defaultQuantityGrams);
    const kcal = Number(kcalPer100g);
    const result = validateSchema(updateFoodInputSchema, {
      name: name.trim(),
      defaultQuantity: Number.isNaN(defaultQuantity) ? undefined : defaultQuantity,
      kcalPer100g: Number.isNaN(kcal) ? undefined : kcal,
    });

    if (!result.success) {
      setErrors(result.fieldErrors as FieldErrors);
      return;
    }

    setErrors({});
    updateFood.mutate({
      id: food.id,
      input: result.data,
    });
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      setErrors({});
      if (!updateFood.isPending) onOpenChange(false);
    } else {
      onOpenChange(next);
    }
  };

  if (!food) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit food</DialogTitle>
          <DialogDescription>
            Update name, default quantity, or calories per 100g. Leave fields
            unchanged if you don&apos;t want to update them.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-2">
          {serverError && (
            <p className="text-sm text-destructive" role="alert">
              {serverError}
            </p>
          )}
          <div className="space-y-2">
            <Label htmlFor="edit-meal-name">Name</Label>
            <Input
              id="edit-meal-name"
              placeholder="e.g. Oatmeal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={!!errors.name}
              disabled={updateFood.isPending}
            />
            {errors.name && (
              <p className="text-sm text-destructive" role="alert">
                {errors.name}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-default-qty">Default quantity (g)</Label>
            <Input
              id="edit-default-qty"
              type="number"
              min={0}
              step={1}
              placeholder="e.g. 150"
              value={defaultQuantityGrams}
              onChange={(e) => setDefaultQuantityGrams(e.target.value)}
              aria-invalid={!!errors.defaultQuantity}
              disabled={updateFood.isPending}
            />
            {errors.defaultQuantity && (
              <p className="text-sm text-destructive" role="alert">
                {errors.defaultQuantity}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-kcal-100g">Calories per 100g (kcal)</Label>
            <Input
              id="edit-kcal-100g"
              type="number"
              min={0}
              step={0.1}
              placeholder="e.g. 389"
              value={kcalPer100g}
              onChange={(e) => setKcalPer100g(e.target.value)}
              aria-invalid={!!errors.kcalPer100g}
              disabled={updateFood.isPending}
            />
            {errors.kcalPer100g && (
              <p className="text-sm text-destructive" role="alert">
                {errors.kcalPer100g}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={updateFood.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 text-white hover:bg-blue-700"
              disabled={updateFood.isPending}
            >
              {updateFood.isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Saving…
                </>
              ) : (
                "Save"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
