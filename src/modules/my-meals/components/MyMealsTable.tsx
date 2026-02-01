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
import type { Food } from "../types";
import { getDefaultKcal, getKcalPer100g } from "../utils";
import { useDeleteFood } from "../hooks";
import { DeleteFoodConfirmDialog } from "./DeleteFoodConfirmDialog";
import { EditFoodDialog } from "./EditFoodDialog";

export interface MyMealsTableProps {
  foods: Food[];
}

export function MyMealsTable({ foods }: MyMealsTableProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [actionsOpen, setActionsOpen] = useState<string | null>(null);

  const deleteFood = useDeleteFood({
    onSuccess: () => {
      setDeleteDialogOpen(false);
      setSelectedFood(null);
      setActionsOpen(null);
    },
  });

  const handleEdit = (food: Food) => {
    setSelectedFood(food);
    setActionsOpen(null);
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (food: Food) => {
    setSelectedFood(food);
    setActionsOpen(null);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedFood) deleteFood.mutate(selectedFood.id);
  };

  if (foods.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <UtensilsCrossed className="mb-2 size-10 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            No meals yet. Add your first meal above.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="overflow-hidden rounded-xl border border-gray-200 bg-white pt-0 shadow-sm dark:border-border dark:bg-card">
        <CardContent className="p-0">
          <div className="relative w-full overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-200 hover:bg-transparent dark:border-border">
                  <TableHead className="h-12 px-4 py-0 text-left align-middle text-sm font-medium text-gray-500 sm:px-5 dark:text-muted-foreground">
                    Name
                  </TableHead>
                  <TableHead className="h-12 px-4 py-0 text-left align-middle text-sm font-medium text-gray-500 sm:px-5 dark:text-muted-foreground">
                    Default (g)
                  </TableHead>
                  <TableHead className="h-12 px-4 py-0 text-left align-middle text-sm font-medium text-gray-500 sm:px-5 dark:text-muted-foreground">
                    kcal/100g
                  </TableHead>
                  <TableHead className="h-12 px-4 py-0 text-left align-middle text-sm font-medium text-gray-500 sm:px-5 dark:text-muted-foreground">
                    Default kcal
                  </TableHead>
                  <TableHead className="h-12 w-12 px-4 py-0 text-center align-middle sm:px-5">
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {foods.map((food) => (
                  <TableRow
                    key={food.id}
                    className="border-b border-gray-200 bg-white last:border-0 hover:bg-transparent dark:border-border dark:bg-card dark:hover:bg-transparent"
                  >
                    <TableCell className="px-4 py-4 align-middle sm:px-5">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-blue-200 bg-[#DBEAFE] text-[#60A5FA] dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-400">
                          <UtensilsCrossed className="size-4" />
                        </div>
                        <span className="truncate font-semibold text-gray-900 dark:text-foreground">
                          {food.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-4 align-middle text-sm font-normal text-gray-700 sm:px-5 dark:text-muted-foreground">
                      {food.defaultQuantity}
                    </TableCell>
                    <TableCell className="px-4 py-4 align-middle text-sm font-normal text-gray-700 sm:px-5 dark:text-muted-foreground">
                      {getKcalPer100g(food)}
                    </TableCell>
                    <TableCell className="px-4 py-4 align-middle text-sm font-normal tabular-nums text-gray-700 sm:px-5 dark:text-muted-foreground">
                      {getDefaultKcal(food)}
                    </TableCell>
                    <TableCell className="px-4 py-4 text-center align-middle sm:px-5">
                      <Popover
                        open={actionsOpen === food.id}
                        onOpenChange={(open) =>
                          setActionsOpen(open ? food.id : null)
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
                              onClick={() => handleEdit(food)}
                            >
                              <Pencil className="size-4" />
                              Edit
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="justify-start gap-2 font-normal text-destructive hover:bg-destructive/10 hover:text-destructive"
                              onClick={() => handleDeleteClick(food)}
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
          </div>
        </CardContent>
      </Card>

      <EditFoodDialog
        food={selectedFood}
        open={editDialogOpen}
        onOpenChange={(open) => {
          setEditDialogOpen(open);
          if (!open) setSelectedFood(null);
        }}
      />

      <DeleteFoodConfirmDialog
        food={selectedFood}
        open={deleteDialogOpen}
        onOpenChange={(open) => {
          setDeleteDialogOpen(open);
          if (!open) setSelectedFood(null);
        }}
        onConfirm={handleDeleteConfirm}
        isDeleting={deleteFood.isPending}
      />
    </>
  );
}
