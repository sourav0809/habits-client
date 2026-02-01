import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Food } from "../../types";
import { getKcalPer100g, truncateName } from "../../utils";

export interface ChartKcalLineProps {
  foods: Food[];
}

export function ChartKcalLine({ foods }: ChartKcalLineProps) {
  const data = foods.map((f) => ({
    index: 0,
    name: truncateName(f.name, 8),
    kcalPer100g: getKcalPer100g(f),
  }));

  if (data.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base font-medium">
          <TrendingUp className="size-4" />
          kcal/100g across your meals
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0 pt-0">
        <div className="h-[260px] w-full px-2 sm:px-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-muted"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                dataKey="kcalPer100g"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `${v}`}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "var(--radius)",
                  border: "1px solid hsl(var(--border))",
                  background: "hsl(var(--card))",
                }}
                formatter={(value: number | undefined) => [
                  `${value != null ? value : 0} kcal/100g`,
                  "Density",
                ]}
              />
              <Line
                type="monotone"
                dataKey="kcalPer100g"
                stroke="#8b5cf6"
                strokeWidth={2}
                dot={{ fill: "#8b5cf6", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
