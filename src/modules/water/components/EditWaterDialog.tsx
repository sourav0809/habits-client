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
import { validateSchema } from "@/lib/schema";
import { getApiErrorMessage } from "@/utils";
import { useUpdateWater } from "../hooks";
import { updateWaterInputSchema } from "../schema";
import type { UpdateWaterInput, WaterLog } from "../types";
import { formatMl } from "../utils";

type FieldErrors = Partial<Record<keyof UpdateWaterInput, string>>;

export interface EditWaterDialogProps {
  log: WaterLog | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditWaterDialog({
  log,
  open,
  onOpenChange,
}: EditWaterDialogProps) {
  const [amount, setAmount] = useState<string>("");
  const [errors, setErrors] = useState<FieldErrors>({});

  useEffect(() => {
    if (log) {
      setAmount(log.amountMl.toString());
      setErrors({});
    }
  }, [log]);

  const updateWater = useUpdateWater({
    onSuccess: () => onOpenChange(false),
  });

  const serverError =
    updateWater.error && getApiErrorMessage(updateWater.error)
      ? getApiErrorMessage(updateWater.error)
      : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!log) return;
    const numAmount = Number(amount);
    const result = validateSchema(updateWaterInputSchema, {
      amount: numAmount,
    });
    if (!result.success) {
      setErrors(result.fieldErrors as FieldErrors);
      return;
    }
    setErrors({});
    updateWater.mutate({ id: log.id, body: result.data });
  };

  const handleOpenChange = (next: boolean) => {
    if (!next && !updateWater.isPending) onOpenChange(false);
    else if (next) onOpenChange(true);
  };

  if (!log) return null;

  const amountNum = parseInt(amount, 10) || 0;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md" key={log.id}>
        <DialogHeader>
          <DialogTitle>Edit water log</DialogTitle>
          <DialogDescription>
            Change the amount for this water entry.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="edit-amount">Amount (ml)</Label>
            <Input
              id="edit-amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min={1}
              max={5000}
              placeholder="Amount in ml"
            />
            {errors.amount ? (
              <p className="text-sm text-destructive">{errors.amount}</p>
            ) : null}
          </div>
          {serverError ? (
            <p className="text-sm text-destructive">{serverError}</p>
          ) : null}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={updateWater.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 text-white hover:bg-blue-700"
              disabled={updateWater.isPending}
            >
              {updateWater.isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : null}
              Save {formatMl(amountNum)}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
