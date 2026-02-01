import { useState } from "react";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { validateSchema } from "@/lib/schema";
import { getApiErrorMessage } from "@/utils";
import { useAddFood } from "../hooks";
import { addFoodInputSchema } from "../schema";
import type { AddFoodInput } from "../types";

type FieldErrors = Partial<Record<keyof AddFoodInput, string>>;

export interface AddFoodDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
}

export function AddFoodDialog({
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  trigger,
}: AddFoodDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [name, setName] = useState("");
  const [defaultQuantityGrams, setDefaultQuantityGrams] = useState("");
  const [kcalPer100g, setKcalPer100g] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});

  const isControlled = controlledOnOpenChange != null;
  const open = isControlled ? controlledOpen ?? false : internalOpen;
  const setOpen = isControlled ? controlledOnOpenChange! : setInternalOpen;

  const addFood = useAddFood({
    onSuccess: () => {
      setOpen(false);
      setName("");
      setDefaultQuantityGrams("");
      setKcalPer100g("");
      setErrors({});
    },
  });

  const serverError =
    addFood.error && getApiErrorMessage(addFood.error)
      ? getApiErrorMessage(addFood.error)
      : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const defaultQuantity = Number(defaultQuantityGrams);
    const kcal = Number(kcalPer100g);
    const result = validateSchema(addFoodInputSchema, {
      name: name.trim(),
      defaultQuantity: Number.isNaN(defaultQuantity) ? 0 : defaultQuantity,
      kcalPer100g: Number.isNaN(kcal) ? 0 : kcal,
    });

    if (!result.success) {
      setErrors(result.fieldErrors as FieldErrors);
      return;
    }

    setErrors({});
    addFood.mutate(result.data);
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      setErrors({});
      if (!addFood.isPending) setOpen(false);
    } else {
      setOpen(true);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {trigger != null ? (
        <DialogTrigger asChild>{trigger}</DialogTrigger>
      ) : (
        <DialogTrigger asChild>
          <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 sm:w-auto">
            <Plus className="size-4" />
            Add meal
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add meal</DialogTitle>
          <DialogDescription>
            Add a custom meal with name, default quantity in grams, and calories
            per 100g. You can use this in Food Log later.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-2">
          {serverError && (
            <p className="text-sm text-destructive" role="alert">
              {serverError}
            </p>
          )}
          <div className="space-y-2">
            <Label htmlFor="meal-name">Name</Label>
            <Input
              id="meal-name"
              placeholder="e.g. Oatmeal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={!!errors.name}
              disabled={addFood.isPending}
            />
            {errors.name && (
              <p className="text-sm text-destructive" role="alert">
                {errors.name}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="default-qty">Default quantity (g)</Label>
            <Input
              id="default-qty"
              type="number"
              min={0}
              step={1}
              placeholder="e.g. 150"
              value={defaultQuantityGrams}
              onChange={(e) => setDefaultQuantityGrams(e.target.value)}
              aria-invalid={!!errors.defaultQuantity}
              disabled={addFood.isPending}
            />
            {errors.defaultQuantity && (
              <p className="text-sm text-destructive" role="alert">
                {errors.defaultQuantity}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="kcal-100g">Calories per 100g (kcal)</Label>
            <Input
              id="kcal-100g"
              type="number"
              min={0}
              step={0.1}
              placeholder="e.g. 389"
              value={kcalPer100g}
              onChange={(e) => setKcalPer100g(e.target.value)}
              aria-invalid={!!errors.kcalPer100g}
              disabled={addFood.isPending}
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
              disabled={addFood.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 text-white hover:bg-blue-700"
              disabled={addFood.isPending}
            >
              {addFood.isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Adding…
                </>
              ) : (
                "Add meal"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
