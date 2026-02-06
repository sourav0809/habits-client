import { useState } from "react";
import { UtensilsCrossed, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { FoodConsumption } from "../types";
import { formatDateTime, getConsumptionFoodName } from "../utils";
import { useDeleteFoodConsumption } from "../hooks";
import EditConsumptionDialog from "./EditConsumptionDialog";
import { DeleteConsumptionConfirmDialog } from "./DeleteConsumptionConfirmDialog";
import { ConsumptionEmptyState } from "./ConsumptionEmptyState";

export interface ConsumptionTableProps {
  consumptions: FoodConsumption[];
}

const ConsumptionTable = ({ consumptions }: ConsumptionTableProps) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedConsumption, setSelectedConsumption] =
    useState<FoodConsumption | null>(null);
  const [actionsOpen, setActionsOpen] = useState<string | null>(null);

  const deleteConsumption = useDeleteFoodConsumption({
    onSuccess: () => {
      setDeleteDialogOpen(false);
      setSelectedConsumption(null);
      setActionsOpen(null);
    },
  });

  const handleEdit = (c: FoodConsumption) => {
    setSelectedConsumption(c);
    setActionsOpen(null);
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (c: FoodConsumption) => {
    setSelectedConsumption(c);
    setActionsOpen(null);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedConsumption) deleteConsumption.mutate(selectedConsumption.id);
  };

  if (consumptions.length === 0) {
    return <ConsumptionEmptyState />;
  }

  return (
    <>
      <Card className="overflow-hidden rounded-xl border border-gray-200 bg-white pt-0 shadow-sm dark:border-border dark:bg-card">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-200 hover:bg-transparent dark:border-border">
                <TableHead className="h-12 px-5 py-0 text-left align-middle text-sm font-medium text-gray-500 dark:text-muted-foreground">
                  Food
                </TableHead>
                <TableHead className="h-12 px-5 py-0 text-left align-middle text-sm font-medium text-gray-500 dark:text-muted-foreground">
                  Date & time
                </TableHead>
                <TableHead className="h-12 px-5 py-0 text-left align-middle text-sm font-medium text-gray-500 dark:text-muted-foreground">
                  Quantity
                </TableHead>
                <TableHead className="h-12 px-5 py-0 text-left align-middle text-sm font-medium text-gray-500 dark:text-muted-foreground">
                  kcal
                </TableHead>
                <TableHead className="h-12 w-12 px-5 py-0 text-center align-middle">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {consumptions.map((c) => (
                <TableRow
                  key={c.id}
                  className="border-b border-gray-200 bg-white last:border-0 hover:bg-transparent dark:border-border dark:bg-card dark:hover:bg-transparent"
                >
                  <TableCell className="px-5 py-4 align-middle">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-blue-200 bg-[#DBEAFE] text-[#60A5FA] dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-400">
                        <UtensilsCrossed className="size-4" />
                      </div>
                      <span className="truncate font-semibold text-gray-900 dark:text-foreground">
                        {getConsumptionFoodName(c)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-5 py-4 align-middle text-sm font-normal text-gray-700 dark:text-muted-foreground">
                    {formatDateTime(
                      c.dateAndTime ?? (c as { date?: string }).date ?? ""
                    )}
                  </TableCell>
                  <TableCell className="px-5 py-4 align-middle text-sm font-normal text-gray-700 dark:text-muted-foreground">
                    {c.quantity}g
                  </TableCell>
                  <TableCell className="px-5 py-4 align-middle text-sm font-normal tabular-nums text-gray-700 dark:text-muted-foreground">
                    {c.totalCalories}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-center align-middle">
                    <Popover
                      open={actionsOpen === c.id}
                      onOpenChange={(open) =>
                        setActionsOpen(open ? c.id : null)
                      }
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 shrink-0 text-gray-700 hover:text-gray-900 dark:text-muted-foreground dark:hover:text-foreground"
                          aria-label="Row actions"
                        >
                          <MoreVertical className="size-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent align="end" className="w-40 p-1">
                        <div className="flex flex-col gap-0.5">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="justify-start gap-2 font-normal"
                            onClick={() => handleEdit(c)}
                          >
                            <Pencil className="size-4" />
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="justify-start gap-2 font-normal text-destructive hover:bg-destructive/10 hover:text-destructive"
                            onClick={() => handleDeleteClick(c)}
                          >
                            <Trash2 className="size-4" />
                            Delete
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <EditConsumptionDialog
        consumption={selectedConsumption}
        open={editDialogOpen}
        onOpenChange={(open) => {
          setEditDialogOpen(open);
          if (!open) setSelectedConsumption(null);
        }}
      />

      <DeleteConsumptionConfirmDialog
        consumption={selectedConsumption}
        open={deleteDialogOpen}
        onOpenChange={(open) => {
          setDeleteDialogOpen(open);
          if (!open) setSelectedConsumption(null);
        }}
        onConfirm={handleDeleteConfirm}
        isDeleting={deleteConsumption.isPending}
      />
    </>
  );
};

export default ConsumptionTable;
