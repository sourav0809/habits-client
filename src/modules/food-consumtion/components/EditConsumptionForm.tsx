import { useState } from "react";
import { Loader2, ChevronDown, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { validateSchema } from "@/lib/schema";
import { useMyFoods } from "@/modules/my-meals/hooks";
import { updateConsumptionInputSchema } from "../schema";
import type { FoodConsumption, UpdateConsumptionInput } from "../types";
import type { Food } from "@/modules/my-meals/types";
import {
  formatTableDate,
  toISO,
  buildDateAndTimeISO,
  getResolvedFoodId,
  getInitialDateAndTime,
} from "../utils";
import { cn } from "@/lib/utils";

type FieldErrors = Partial<Record<keyof UpdateConsumptionInput, string>>;

export interface EditConsumptionFormProps {
  consumption: FoodConsumption;
  onCancel: () => void;
  isPending: boolean;
  serverError: string | null;
  mutate: (variables: { id: string; body: UpdateConsumptionInput }) => void;
}

export const EditConsumptionForm = ({
  consumption,
  onCancel,
  isPending,
  serverError,
  mutate,
}: EditConsumptionFormProps) => {
  const resolvedFoodId = getResolvedFoodId(consumption);
  const { date: initialDate, time: initialTime } =
    getInitialDateAndTime(consumption);

  const [userFoodId, setUserFoodId] = useState(resolvedFoodId);
  const [quantity, setQuantity] = useState(String(consumption.quantity));
  const [date, setDate] = useState(initialDate);
  const [time, setTime] = useState(initialTime);
  const [dateCalendarOpen, setDateCalendarOpen] = useState(false);
  const [foodSelectOpen, setFoodSelectOpen] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  const { data: foodsData } = useMyFoods();
  const foods = foodsData?.foods ?? [];
  const selectedFood = foods.find((f) => f.id === userFoodId) ?? null;

  const quantityNum = Number(quantity);
  const isValidQuantity = !Number.isNaN(quantityNum) && quantityNum >= 0;
  const dateAndTime = buildDateAndTimeISO(date, time);

  const editFormKcal =
    selectedFood && isValidQuantity
      ? Math.round(selectedFood.caloriesPerGram * quantityNum)
      : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateSchema(updateConsumptionInputSchema, {
      quantity: quantityNum,
      dateAndTime,
      userFoodId: userFoodId || undefined,
    });
    if (!result.success) {
      setErrors(result.fieldErrors as FieldErrors);
      return;
    }
    setErrors({});
    const body: UpdateConsumptionInput = {
      quantity: Math.round(quantityNum),
      dateAndTime,
      userFoodId: userFoodId || undefined,
    };
    mutate({ id: consumption.id, body });
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 py-2">
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
      </div>
      <div className="space-y-2">
        <Label>Date & time</Label>
        <div className="flex gap-2">
          <Popover open={dateCalendarOpen} onOpenChange={setDateCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("flex-1 justify-start font-normal", "text-left")}
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
            disabled={isPending}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="edit-quantity">Quantity (g)</Label>
        <Input
          id="edit-quantity"
          type="number"
          min={0}
          placeholder="e.g. 200"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          disabled={isPending}
          aria-invalid={!!errors.quantity}
        />
        {errors.quantity && (
          <p className="text-sm text-destructive" role="alert">
            {errors.quantity}
          </p>
        )}
      </div>
      {selectedFood && isValidQuantity && (
        <div className="rounded-lg border bg-muted/30 p-3 text-sm">
          <p className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">
            Calculated
          </p>
          <p className="font-medium">{editFormKcal} kcal</p>
        </div>
      )}
      {serverError && (
        <p className="text-sm text-destructive" role="alert">
          {serverError}
        </p>
      )}
      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-blue-600 text-white hover:bg-blue-700"
          disabled={!isValidQuantity || isPending}
        >
          {isPending ? (
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
  );
};
