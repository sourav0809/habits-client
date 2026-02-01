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
import type { Food } from "../types";

export interface DeleteFoodConfirmDialogProps {
  food: Food | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isDeleting: boolean;
}

export function DeleteFoodConfirmDialog({
  food,
  open,
  onOpenChange,
  onConfirm,
  isDeleting,
}: DeleteFoodConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete food</DialogTitle>
          <DialogDescription asChild>
            <div className="space-y-2">
              <p>
                Are you sure you want to delete{" "}
                <span className="font-medium text-foreground">
                  {food?.name ?? "this food"}
                </span>
                ?
              </p>
              <p className="text-muted-foreground text-sm">
                If you have added this food in any meals, it won&apos;t be
                deleted.
              </p>
            </div>
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
