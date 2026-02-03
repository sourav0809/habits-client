import { useState, useEffect } from "react";
import { CalendarIcon, Loader2 } from "lucide-react";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { validateSchema } from "@/lib/schema";
import { getApiErrorMessage } from "@/utils";
import {
  formatTableDate,
  parseDateTimeToDate,
  getTimeStringFromISO,
} from "@/utils/time.utils";
import { useUpdateWater } from "../hooks";
import { updateWaterInputSchema } from "../schema";
import type { UpdateWaterInput, WaterLog } from "../types";
import { formatMl, toISO, dateTimeLocalToISO } from "../utils";
import { cn } from "@/lib/utils";

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
  const [date, setDate] = useState<Date>(() => new Date());
  const [time, setTime] = useState<string>("00:00");
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  useEffect(() => {
    if (log) {
      setAmount(log.amountMl.toString());
      setDate(parseDateTimeToDate(log.dateAndTime));
      setTime(getTimeStringFromISO(log.dateAndTime));
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
    const dateAndTime = dateTimeLocalToISO(`${toISO(date)}T${time}`);
    const result = validateSchema(updateWaterInputSchema, {
      amount: numAmount,
      dateAndTime,
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
            Change the amount or date and time for this water entry.
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
          <div className="space-y-2">
            <Label>Date & time</Label>
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
