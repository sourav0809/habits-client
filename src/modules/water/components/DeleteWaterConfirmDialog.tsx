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
import type { WaterLog } from "../types";
import { formatMl } from "../utils";

export interface DeleteWaterConfirmDialogProps {
  log: WaterLog | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Called with the log id to delete */
  onConfirm: (id: string) => void;
  isDeleting: boolean;
}

const DeleteWaterConfirmDialog = ({
  log,
  open,
  onOpenChange,
  onConfirm,
  isDeleting,
}: DeleteWaterConfirmDialogProps) => {
  if (!log) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete water log</DialogTitle>
          <DialogDescription>
            Remove {formatMl(log.amountMl)} from this day&apos;s log? This will
            reduce the day&apos;s total. This action cannot be undone.
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
            onClick={() => log?.id && onConfirm(log.id)}
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
};

export default DeleteWaterConfirmDialog;
