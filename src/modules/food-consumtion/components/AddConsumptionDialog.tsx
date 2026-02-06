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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { validateSchema } from "@/lib/schema";
import { getApiErrorMessage } from "@/utils";
import { useMyFoods } from "@/modules/my-meals/hooks";
import { useAddFoodConsumption } from "../hooks";
import { addConsumptionInputSchema } from "../schema";
import type { AddConsumptionInput } from "../types";
import type { Food } from "@/modules/my-meals/types";
import {
  formatTableDate,
  getTodayISO,
  toDate,
  toISO,
  buildDateAndTimeISO,
  getCurrentTimeString,
} from "../utils";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type FieldErrors = Partial<Record<keyof AddConsumptionInput, string>>;

export interface AddConsumptionDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
}

const AddConsumptionDialog = ({
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  trigger,
}: AddConsumptionDialogProps) => {
  const todayISO = getTodayISO();
  const todayDate = toDate(todayISO);

  const [internalOpen, setInternalOpen] = useState(false);
  const [userFoodId, setUserFoodId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [date, setDate] = useState<Date>(todayDate);
  const [time, setTime] = useState(() => getCurrentTimeString());
  const [dateCalendarOpen, setDateCalendarOpen] = useState(false);
  const [foodSelectOpen, setFoodSelectOpen] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  const isControlled = controlledOnOpenChange != null;
  const open = isControlled ? controlledOpen ?? false : internalOpen;
  const setOpen = isControlled ? controlledOnOpenChange! : setInternalOpen;

  const { data: foodsData } = useMyFoods();
  const foods = foodsData?.foods ?? [];

  const selectedFood = foods.find((f: Food) => f.id === userFoodId) ?? null;

  const addConsumption = useAddFoodConsumption({
    onSuccess: () => {
      setOpen(false);
      setUserFoodId("");
      setQuantity("");
      setDate(todayDate);
      setTime(getCurrentTimeString());
      setErrors({});
    },
  });

  const serverError =
    addConsumption.error && getApiErrorMessage(addConsumption.error)
      ? getApiErrorMessage(addConsumption.error)
      : null;

  const quantityNum = Number(quantity);
  const addFormKcal =
    selectedFood && !Number.isNaN(quantityNum) && quantityNum >= 0
      ? Math.round(selectedFood.caloriesPerGram * quantityNum)
      : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = Number(quantity);
    const dateAndTime = date ? buildDateAndTimeISO(date, time) : undefined;
    const result = validateSchema(addConsumptionInputSchema, {
      userFoodId: userFoodId.trim(),
      quantity: Number.isNaN(q) ? 0 : q,
      dateAndTime: dateAndTime ?? null,
    });

    if (!result.success) {
      setErrors(result.fieldErrors as FieldErrors);
      return;
    }

    setErrors({});
    addConsumption.mutate(result.data);
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      setErrors({});
      setDateCalendarOpen(false);
      setFoodSelectOpen(false);
      if (!addConsumption.isPending) setOpen(false);
    } else {
      setOpen(true);
      setDate(todayDate);
      setTime(getCurrentTimeString());
    }
  };

  const triggerButton = trigger ?? (
    <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 sm:w-auto">
      <Plus className="size-4" />
      Add food
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add food</DialogTitle>
          <DialogDescription>
            Choose a food, enter quantity in grams, and pick the date and time.
            We&apos;ll calculate calories.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-2">
          {serverError && (
            <p className="text-sm text-destructive" role="alert">
              {serverError}
            </p>
          )}
          <div className="space-y-2">
            <Label>Food</Label>
            <Popover open={foodSelectOpen} onOpenChange={setFoodSelectOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between font-normal"
                >
                  {selectedFood ? selectedFood.name : "Select food"}
                  <ChevronDown className="size-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                className="w-(--radix-popover-trigger-width) p-0"
              >
                {foods.length === 0 ? (
                  <p className="px-3 py-4 text-sm text-muted-foreground">
                    No meals yet. Add meals in Your Meals first.
                  </p>
                ) : (
                  <ul className="max-h-[240px] overflow-auto py-1">
                    {foods.map((food: Food) => (
                      <li key={food.id}>
                        <button
                          type="button"
                          className={cn(
                            "w-full px-3 py-2 text-left text-sm hover:bg-accent",
                            userFoodId === food.id && "bg-accent"
                          )}
                          onClick={() => {
                            setUserFoodId(food.id);
                            setQuantity(String(food.defaultQuantity));
                            setFoodSelectOpen(false);
                          }}
                        >
                          {food.name}
                          <span className="ml-2 text-xs text-muted-foreground">
                            {Math.round(food.caloriesPerGram * 100)} kcal/100g •
                            default {food.defaultQuantity}g
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </PopoverContent>
            </Popover>
            {errors.userFoodId && (
              <p className="text-sm text-destructive" role="alert">
                {errors.userFoodId}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Date & time</Label>
            <div className="flex gap-2">
              <Popover
                open={dateCalendarOpen}
                onOpenChange={setDateCalendarOpen}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "flex-1 justify-start font-normal",
                      "text-left"
                    )}
                  >
                    <CalendarIcon className="mr-2 size-4 shrink-0" />
                    {formatTableDate(toISO(date))}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(d) => {
                      if (d) {
                        setDate(d);
                        setDateCalendarOpen(false);
                      }
                    }}
                    defaultMonth={date}
                  />
                </PopoverContent>
              </Popover>
              <Input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-[120px] shrink-0"
                disabled={addConsumption.isPending}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity (g)</Label>
            <Input
              id="quantity"
              type="number"
              min={0}
              placeholder="e.g. 150"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              aria-invalid={!!errors.quantity}
              disabled={addConsumption.isPending}
            />
            {errors.quantity && (
              <p className="text-sm text-destructive" role="alert">
                {errors.quantity}
              </p>
            )}
          </div>
          {selectedFood &&
            (quantity === "" || !Number.isNaN(quantityNum)) &&
            quantityNum >= 0 && (
              <div className="rounded-lg border bg-muted/30 p-3 text-sm">
                <p className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">
                  Calculated
                </p>
                <p className="font-medium">{addFormKcal} kcal</p>
              </div>
            )}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={addConsumption.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 text-white hover:bg-blue-700"
              disabled={
                !selectedFood ||
                !quantity ||
                quantityNum < 0 ||
                addConsumption.isPending
              }
            >
              {addConsumption.isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Adding…
                </>
              ) : (
                "Add entry"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddConsumptionDialog;
