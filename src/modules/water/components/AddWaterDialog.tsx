import { useState } from "react";
import { CalendarIcon, Loader2, Plus, Droplets } from "lucide-react";
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
import { Calendar } from "@/components/ui/calendar";
import { validateSchema } from "@/lib/schema";
import { getApiErrorMessage } from "@/utils";
import {
  getCurrentDateAsDate,
  getCurrentTimeString,
  formatTableDate,
} from "@/utils/time.utils";
import { useAddWater } from "../hooks";
import { addWaterInputSchema } from "../schema";
import type { AddWaterInput } from "../types";
import { formatMl, toISO, dateTimeLocalToISO } from "../utils";
import { QUICK_AMOUNTS } from "../constants";
import { cn } from "@/lib/utils";

type FieldErrors = Partial<Record<keyof AddWaterInput, string>>;

export interface AddWaterDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
}

export function AddWaterDialog({
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  trigger,
}: AddWaterDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [amount, setAmount] = useState<string>("250");
  const [date, setDate] = useState<Date>(() => getCurrentDateAsDate());
  const [time, setTime] = useState<string>(() => getCurrentTimeString());
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  const isControlled = controlledOnOpenChange != null;
  const open = isControlled ? controlledOpen ?? false : internalOpen;
  const setOpen = isControlled ? controlledOnOpenChange! : setInternalOpen;

  const addWater = useAddWater({
    onSuccess: () => {
      setOpen(false);
      setAmount("250");
      setDate(getCurrentDateAsDate());
      setTime(getCurrentTimeString());
      setErrors({});
    },
  });

  const serverError =
    addWater.error && getApiErrorMessage(addWater.error)
      ? getApiErrorMessage(addWater.error)
      : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = Number(amount);
    const dateAndTime = dateTimeLocalToISO(`${toISO(date)}T${time}`);
    const result = validateSchema(addWaterInputSchema, {
      amount: numAmount,
      dateAndTime,
    });
    if (!result.success) {
      setErrors(result.fieldErrors as FieldErrors);
      return;
    }
    setErrors({});
    addWater.mutate(result.data);
  };

  const amountNum = parseInt(amount, 10) || 0;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Droplets className="size-5 text-blue-600" />
            Log Water Intake
          </DialogTitle>
          <DialogDescription>
            Add your water consumption to track your daily hydration.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-3">
            <Label className="text-sm font-medium">Quick Add</Label>
            <div className="grid grid-cols-3 gap-2">
              {QUICK_AMOUNTS.map((item) => (
                <button
                  key={item.amount}
                  type="button"
                  onClick={() => setAmount(item.amount.toString())}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-lg border p-3 transition-all hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20",
                    amountNum === item.amount
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20"
                      : "border-border"
                  )}
                >
                  <Droplets className="size-5 text-blue-600" />
                  <span className="text-xs font-medium text-muted-foreground">
                    {item.label}
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {formatMl(item.amount)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="custom-amount" className="text-sm font-medium">
              Custom Amount (ml)
            </Label>
            <div className="flex items-center gap-2">
              <Input
                id="custom-amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="flex-1"
                min={1}
                max={5000}
                placeholder="Enter amount in ml"
              />
              <span className="text-sm text-muted-foreground">ml</span>
            </div>
            {errors.amount ? (
              <p className="text-sm text-destructive">{errors.amount}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Date & time</Label>
            <div className="flex gap-2">
              <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className={cn("flex-1 justify-start font-normal text-left")}
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
                        setDatePickerOpen(false);
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
              />
            </div>
            {errors.dateAndTime ? (
              <p className="text-sm text-destructive">{errors.dateAndTime}</p>
            ) : null}
          </div>

          {serverError ? (
            <p className="text-sm text-destructive">{serverError}</p>
          ) : null}

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 text-white hover:bg-blue-700"
              disabled={addWater.isPending}
            >
              {addWater.isPending ? (
                <Loader2 className="mr-1 size-4 animate-spin" />
              ) : (
                <Plus className="mr-1 size-4" />
              )}
              Add {formatMl(amountNum)}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
