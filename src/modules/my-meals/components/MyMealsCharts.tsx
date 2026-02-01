import {
  ChartDefaultKcalBar,
  ChartDensityPie,
  ChartKcalLine,
  ChartKcalPer100gBar,
} from "./charts";
import type { Food } from "../types";

export interface MyMealsChartsProps {
  foods: Food[];
}

export function MyMealsCharts({ foods }: MyMealsChartsProps) {
  return (
    <section className="space-y-6">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Insights
      </h2>
      <div className="grid gap-6 lg:grid-cols-2">
        <ChartKcalPer100gBar foods={foods} />
        <ChartDensityPie foods={foods} />
        <ChartDefaultKcalBar foods={foods} />
        <ChartKcalLine foods={foods} />
      </div>
    </section>
  );
}
