import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ChartDataPoint } from "../utils";

export interface CaloriesChartProps {
  data: ChartDataPoint[];
}

export function CaloriesChart({ data }: CaloriesChartProps) {
  if (data.length === 0) return null;

  return (
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
              data={data}
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
                formatter={(value: unknown) => [
                  `${value != null ? value : 0} kcal`,
                  "Calories",
                ]}
                labelFormatter={(_: unknown, payload: unknown) =>
                  (Array.isArray(payload) && payload[0]?.payload?.label) ?? ""
                }
              />
              <Bar
                dataKey="kcal"
                radius={[4, 4, 0, 0]}
                maxBarSize={48}
                fill="#3b82f6"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
