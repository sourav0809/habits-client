import { useState, useEffect } from "react";
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
import { getApiErrorMessage } from "@/utils";
import { useUpdateFoodConsumption } from "../hooks";
import type { FoodConsumption } from "../types";
import { getConsumptionFoodName } from "../utils";

export interface EditConsumptionDialogProps {
  consumption: FoodConsumption | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditConsumptionDialog({
  consumption,
  open,
  onOpenChange,
}: EditConsumptionDialogProps) {
  const [quantity, setQuantity] = useState("");

  const updateConsumption = useUpdateFoodConsumption({
    onSuccess: () => {
      onOpenChange(false);
      setQuantity("");
    },
  });

  useEffect(() => {
    if (consumption && open) {
      setQuantity(String(consumption.quantity));
    }
  }, [consumption?.id, consumption?.quantity, open]);

  const serverError =
    updateConsumption.error && getApiErrorMessage(updateConsumption.error)
      ? getApiErrorMessage(updateConsumption.error)
      : null;

  const quantityNum = Number(quantity);
  const isValid = !Number.isNaN(quantityNum) && quantityNum >= 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consumption || !isValid) return;
    updateConsumption.mutate({
      id: consumption.id,
      body: { quantity: Math.round(quantityNum) },
    });
  };

  const handleOpenChange = (next: boolean) => {
    if (!next && !updateConsumption.isPending) {
      onOpenChange(false);
      setQuantity("");
    } else if (next) {
      onOpenChange(true);
    }
  };

  if (!consumption) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit food log</DialogTitle>
          <DialogDescription>
            Update quantity for {getConsumptionFoodName(consumption)}. Calories
            will be recalculated.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-2">
          {serverError && (
            <p className="text-sm text-destructive" role="alert">
              {serverError}
            </p>
          )}
          <div className="space-y-2">
            <Label htmlFor="edit-quantity">Quantity (g)</Label>
            <Input
              id="edit-quantity"
              type="number"
              min={0}
              placeholder="e.g. 200"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              disabled={updateConsumption.isPending}
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={updateConsumption.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 text-white hover:bg-blue-700"
              disabled={!isValid || updateConsumption.isPending}
            >
              {updateConsumption.isPending ? (
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
