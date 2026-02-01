import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Food } from "../../types";
import { getKcalPer100g, truncateName } from "../../utils";

export interface ChartKcalPer100gBarProps {
  foods: Food[];
}

export function ChartKcalPer100gBar({ foods }: ChartKcalPer100gBarProps) {
  const data = [...foods]
    .sort((a, b) => getKcalPer100g(b) - getKcalPer100g(a))
    .slice(0, 10)
    .map((f) => ({
      name: truncateName(f.name, 12),
      fullName: f.name,
      kcalPer100g: getKcalPer100g(f),
    }));

  if (data.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base font-medium">
          <BarChart3 className="size-4" />
          Calories per 100g by meal
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0 pt-0">
        <div className="h-[260px] w-full px-2 sm:px-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 8, right: 8, left: 8, bottom: 8 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-muted"
                horizontal={false}
              />
              <XAxis
                type="number"
                dataKey="kcalPer100g"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `${v}`}
              />
              <YAxis
                type="category"
                dataKey="name"
                width={80}
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "var(--radius)",
                  border: "1px solid hsl(var(--border))",
                  background: "hsl(var(--card))",
                }}
                formatter={(value: number | undefined) => [
                  `${value != null ? value : 0} kcal/100g`,
                  "",
                ]}
                labelFormatter={(_, payload) =>
                  payload[0]?.payload?.fullName ?? ""
                }
              />
              <Bar
                dataKey="kcalPer100g"
                fill="#3b82f6"
                radius={[0, 4, 4, 0]}
                maxBarSize={24}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
