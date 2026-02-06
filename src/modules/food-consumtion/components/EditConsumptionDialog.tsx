import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getApiErrorMessage } from "@/utils";
import { useUpdateFoodConsumption } from "../hooks";
import { EditConsumptionForm } from "./EditConsumptionForm";
import type { FoodConsumption } from "../types";

export interface EditConsumptionDialogProps {
  consumption: FoodConsumption | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EditConsumptionDialog = ({
  consumption,
  open,
  onOpenChange,
}: EditConsumptionDialogProps) => {
  const updateConsumption = useUpdateFoodConsumption({
    onSuccess: () => onOpenChange(false),
  });

  const serverError =
    updateConsumption.error && getApiErrorMessage(updateConsumption.error)
      ? getApiErrorMessage(updateConsumption.error)
      : null;

  const handleOpenChange = (next: boolean) => {
    if (!next && !updateConsumption.isPending) onOpenChange(false);
    else if (next) onOpenChange(true);
  };

  if (!consumption) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md" key={consumption.id}>
        <DialogHeader>
          <DialogTitle>Edit food log</DialogTitle>
          <DialogDescription>
            Change food, date & time, or quantity. Calories will be recalculated
            when needed.
          </DialogDescription>
        </DialogHeader>
        {open && consumption && (
          <EditConsumptionForm
            key={consumption.id}
            consumption={consumption}
            onCancel={() => handleOpenChange(false)}
            isPending={updateConsumption.isPending}
            serverError={serverError}
            mutate={updateConsumption.mutate}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditConsumptionDialog;
