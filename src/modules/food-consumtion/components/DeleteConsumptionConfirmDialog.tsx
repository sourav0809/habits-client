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
import type { FoodConsumption } from "../types";
import { getConsumptionFoodName } from "../utils";

export interface DeleteConsumptionConfirmDialogProps {
  consumption: FoodConsumption | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isDeleting: boolean;
}

export function DeleteConsumptionConfirmDialog({
  consumption,
  open,
  onOpenChange,
  onConfirm,
  isDeleting,
}: DeleteConsumptionConfirmDialogProps) {
  if (!consumption) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete food log</DialogTitle>
          <DialogDescription>
            Remove &quot;{getConsumptionFoodName(consumption)}&quot; from this
            day&apos;s log? This will reduce the day&apos;s total calories. This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Deleting…
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
