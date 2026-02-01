"use client";

import { useMemo, useState } from "react";
import type { DateRange } from "react-day-picker";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Flame,
  UtensilsCrossed,
  TrendingUp,
  Plus,
  ChevronDown,
  CalendarIcon,
  MoreVertical,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

// ─── Constants (predefined foods, mock log) ─────────────────────────────────

const PREDEFINED_FOODS = [
  { id: "1", name: "Oatmeal", kcalPer100g: 389 },
  { id: "2", name: "Banana", kcalPer100g: 89 },
  { id: "3", name: "Chicken Breast", kcalPer100g: 165 },
  { id: "4", name: "Brown Rice", kcalPer100g: 370 },
  { id: "5", name: "Eggs (whole)", kcalPer100g: 155 },
  { id: "6", name: "Greek Yogurt", kcalPer100g: 97 },
  { id: "7", name: "Broccoli", kcalPer100g: 34 },
  { id: "8", name: "Salmon", kcalPer100g: 208 },
] as const;

type PredefinedFood = (typeof PREDEFINED_FOODS)[number];

interface FoodLogEntry {
  id: string;
  foodId: string;
  foodName: string;
  quantityGrams: number;
  kcal: number;
  loggedAt: string;
}

function getTodayISO(): string {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

const MOCK_LOG_ENTRIES: FoodLogEntry[] = [
  {
    id: "e1",
    foodId: "1",
    foodName: "Oatmeal",
    quantityGrams: 150,
    kcal: Math.round((150 / 100) * 389),
    loggedAt: getTodayISO(),
  },
];

// ─── Helpers ───────────────────────────────────────────────────────────────

function formatDateLabel(iso: string): string {
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function formatTableDate(iso: string): string {
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function toDate(iso: string): Date {
  return new Date(iso + "T12:00:00");
}

function toISO(date: Date): string {
  return date.toISOString().slice(0, 10);
}

// ─── Stat card ─────────────────────────────────────────────────────────────

interface StatCardProps {
  title: string;
  value: number | string;
  unit: string;
  icon: React.ReactNode;
  iconBgClass: string;
}

function StatCard({ title, value, unit, icon, iconBgClass }: StatCardProps) {
  return (
    <Card className="relative overflow-hidden border-border/80 bg-card shadow-sm">
      <CardHeader className="flex flex-row items-start justify-between gap-2 pb-1">
        <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {title}
        </CardTitle>
        <div
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-lg",
            iconBgClass
          )}
        >
          {icon}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {value}
          <span className="ml-1.5 text-base font-normal text-muted-foreground sm:text-lg">
            {unit}
          </span>
        </p>
      </CardContent>
    </Card>
  );
}

// ─── Main component ────────────────────────────────────────────────────────

export default function FoodLogModule() {
  const today = getTodayISO();
  const todayDate = toDate(today);

  const [dateRange, setDateRange] = useState<DateRange | undefined>(() => ({
    from: todayDate,
    to: todayDate,
  }));
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [entries, setEntries] = useState<FoodLogEntry[]>(MOCK_LOG_ENTRIES);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [addEntryDate, setAddEntryDate] = useState<Date>(() => toDate(getTodayISO()));
  const [addDateCalendarOpen, setAddDateCalendarOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState<PredefinedFood | null>(null);
  const [quantityGrams, setQuantityGrams] = useState("");
  const [foodSelectOpen, setFoodSelectOpen] = useState(false);

  const dateFrom = dateRange?.from ? toISO(dateRange.from) : today;
  const dateTo = dateRange?.to ? toISO(dateRange.to) : dateFrom;

  const filteredEntries = useMemo(() => {
    return entries.filter((e) => {
      const d = e.loggedAt;
      return d >= dateFrom && d <= dateTo;
    });
  }, [entries, dateFrom, dateTo]);

  const stats = useMemo(() => {
    const totalKcal = filteredEntries.reduce((s, e) => s + e.kcal, 0);
    const mealCount = filteredEntries.length;
    const avgPerMeal = mealCount > 0 ? Math.round(totalKcal / mealCount) : 0;
    return { totalKcal, mealCount, avgPerMeal };
  }, [filteredEntries]);

  const chartData = useMemo(() => {
    const byDay: Record<string, number> = {};
    const start = new Date(dateFrom + "T12:00:00");
    const end = new Date(dateTo + "T12:00:00");
    const startTime = start.getTime();
    const endTime = end.getTime();
    const oneDay = 24 * 60 * 60 * 1000;
    for (let t = startTime; t <= endTime; t += oneDay) {
      const d = new Date(t);
      byDay[toISO(d)] = 0;
    }
    filteredEntries.forEach((e) => {
      byDay[e.loggedAt] = (byDay[e.loggedAt] ?? 0) + e.kcal;
    });
    return Object.entries(byDay)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, kcal]) => ({
        date,
        label: formatDateLabel(date),
        kcal,
      }));
  }, [filteredEntries, dateFrom, dateTo]);

  const addFormKcal = useMemo(() => {
    if (!selectedFood) return 0;
    const q = Math.max(0, Number(quantityGrams || 0));
    return Math.round(selectedFood.kcalPer100g * (q / 100));
  }, [selectedFood, quantityGrams]);

  const handleAddEntry = () => {
    if (!selectedFood) return;
    const q = Math.max(0, Number(quantityGrams || 0));
    if (q <= 0) return;
    const newEntry: FoodLogEntry = {
      id: `e${Date.now()}`,
      foodId: selectedFood.id,
      foodName: selectedFood.name,
      quantityGrams: q,
      kcal: Math.round(selectedFood.kcalPer100g * (q / 100)),
      loggedAt: toISO(addEntryDate),
    };
    setEntries((prev) => [newEntry, ...prev]);
    setSelectedFood(null);
    setQuantityGrams("");
    setAddEntryDate(todayDate);
    setAddDialogOpen(false);
    setFoodSelectOpen(false);
    setAddDateCalendarOpen(false);
  };

  const rangeLabel =
    dateRange?.from && dateRange?.to
      ? dateRange.from.getTime() === dateRange.to.getTime()
        ? formatDateLabel(toISO(dateRange.from))
        : `${formatDateLabel(toISO(dateRange.from))} – ${formatDateLabel(toISO(dateRange.to))}`
      : "Pick dates";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Food Log
        </h1>
        <p className="text-muted-foreground">
          Track what you eat, see calories, and filter by date. Add meals from
          the list and keep your intake in one place.
        </p>
      </div>

      {/* Analytics cards (3: Calories, Meals, Avg/meal) */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Calories"
          value={stats.totalKcal}
          unit="kcal"
          icon={<Flame className="size-5 text-blue-600" />}
          iconBgClass="bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400"
        />
        <StatCard
          title="Meals logged"
          value={stats.mealCount}
          unit={stats.mealCount === 1 ? "meal" : "meals"}
          icon={<UtensilsCrossed className="size-5 text-blue-600" />}
          iconBgClass="bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400"
        />
        <StatCard
          title="Avg / meal"
          value={stats.avgPerMeal}
          unit="kcal"
          icon={<TrendingUp className="size-5 text-emerald-600" />}
          iconBgClass="bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400"
        />
      </section>

      {/* Date range (shadcn Calendar) + Add food (blue button) */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal sm:w-[280px]",
                !dateRange?.from && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 size-4 shrink-0" />
              {rangeLabel}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-auto p-0">
            <Calendar
              mode="range"
              defaultMonth={dateRange?.from ?? todayDate}
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
              classNames={{ months: "flex flex-col sm:flex-row gap-4" }}
            />
          </PopoverContent>
        </Popover>
        <Dialog
          open={addDialogOpen}
          onOpenChange={(open) => {
            setAddDialogOpen(open);
            if (!open) setAddDateCalendarOpen(false);
            if (open) setAddEntryDate(todayDate);
          }}
        >
          <DialogTrigger asChild>
            <Button
              className="w-full bg-blue-600 text-white hover:bg-blue-700 sm:w-auto"
            >
              <Plus className="size-4" />
              Add food
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add food</DialogTitle>
              <DialogDescription>
                Choose a food, enter quantity in grams, and pick the date.
                We&apos;ll calculate calories.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-2">
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
                    <ul className="max-h-[240px] overflow-auto py-1">
                      {PREDEFINED_FOODS.map((food) => (
                        <li key={food.id}>
                          <button
                            type="button"
                            className={cn(
                              "w-full px-3 py-2 text-left text-sm hover:bg-accent",
                              selectedFood?.id === food.id && "bg-accent"
                            )}
                            onClick={() => {
                              setSelectedFood(food);
                              setFoodSelectOpen(false);
                            }}
                          >
                            {food.name}
                            <span className="ml-2 text-xs text-muted-foreground">
                              {food.kcalPer100g} kcal/100g
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>Date</Label>
                <Popover
                  open={addDateCalendarOpen}
                  onOpenChange={setAddDateCalendarOpen}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start font-normal",
                        "text-left"
                      )}
                    >
                      <CalendarIcon className="mr-2 size-4 shrink-0" />
                      {formatTableDate(toISO(addEntryDate))}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={addEntryDate}
                      onSelect={(d) => {
                        if (d) {
                          setAddEntryDate(d);
                          setAddDateCalendarOpen(false);
                        }
                      }}
                      defaultMonth={addEntryDate}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity (g)</Label>
                <Input
                  id="quantity"
                  type="number"
                  min={1}
                  placeholder="e.g. 150"
                  value={quantityGrams}
                  onChange={(e) => setQuantityGrams(e.target.value)}
                />
              </div>
              {selectedFood &&
                (quantityGrams === "" || Number(quantityGrams) > 0) && (
                  <div className="rounded-lg border bg-muted/30 p-3 text-sm">
                    <p className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">
                      Calculated
                    </p>
                    <p className="font-medium">{addFormKcal} kcal</p>
                  </div>
                )}
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-blue-600 text-white hover:bg-blue-700"
                onClick={handleAddEntry}
                disabled={
                  !selectedFood ||
                  !quantityGrams ||
                  Number(quantityGrams) <= 0
                }
              >
                Add entry
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Food intake table */}
      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Food intake
        </h2>
        {filteredEntries.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <UtensilsCrossed className="mb-2 size-10 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                No meals in this date range. Add food above to get started.
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card className="overflow-hidden rounded-xl border border-gray-200 bg-white pt-0 shadow-sm dark:border-border dark:bg-card">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-gray-200 hover:bg-transparent dark:border-border">
                    <TableHead className="h-12 px-5 py-0 text-left align-middle text-sm font-medium text-gray-500 dark:text-muted-foreground">
                      Food
                    </TableHead>
                    <TableHead className="h-12 px-5 py-0 text-left align-middle text-sm font-medium text-gray-500 dark:text-muted-foreground">
                      Date
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
                  {filteredEntries.map((entry) => (
                    <TableRow
                      key={entry.id}
                      className="border-b border-gray-200 bg-white last:border-0 hover:bg-transparent dark:border-border dark:bg-card dark:hover:bg-transparent"
                    >
                      <TableCell className="px-5 py-4 align-middle">
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-blue-200 bg-[#DBEAFE] text-[#60A5FA] dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-400">
                            <UtensilsCrossed className="size-4" />
                          </div>
                          <span className="truncate font-semibold text-gray-900 dark:text-foreground">
                            {entry.foodName}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-5 py-4 align-middle text-sm font-normal text-gray-700 dark:text-muted-foreground">
                        {formatTableDate(entry.loggedAt)}
                      </TableCell>
                      <TableCell className="px-5 py-4 align-middle text-sm font-normal text-gray-700 dark:text-muted-foreground">
                        {entry.quantityGrams}g
                      </TableCell>
                      <TableCell className="px-5 py-4 align-middle text-sm font-normal tabular-nums text-gray-700 dark:text-muted-foreground">
                        {entry.kcal}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-center align-middle">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 shrink-0 text-gray-700 hover:text-gray-900 dark:text-muted-foreground dark:hover:text-foreground"
                          aria-label="Row actions"
                        >
                          <MoreVertical className="size-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </section>

      {/* Calories chart (recharts) */}
      {chartData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">
              Calories over time
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0 pt-0">
            <div className="h-[240px] w-full px-2 sm:px-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="label"
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                    className="text-muted-foreground"
                  />
                  <YAxis
                    dataKey="kcal"
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                    className="text-muted-foreground"
                    tickFormatter={(v) => `${v}`}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "var(--radius)",
                      border: "1px solid hsl(var(--border))",
                      background: "hsl(var(--card))",
                    }}
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                    formatter={(value) => [
                      `${value != null ? value : 0} kcal`,
                      "Calories",
                    ]}
                    labelFormatter={(_, payload) =>
                      payload[0]?.payload?.label ?? ""
                    }
                  />
                  <Bar dataKey="kcal" radius={[4, 4, 0, 0]} maxBarSize={48} fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
