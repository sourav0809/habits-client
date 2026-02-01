import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Flame } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Food } from "../../types";
import { getDefaultKcal, truncateName } from "../../utils";

export interface ChartDefaultKcalBarProps {
  foods: Food[];
}

export function ChartDefaultKcalBar({ foods }: ChartDefaultKcalBarProps) {
  const data = [...foods]
    .sort((a, b) => getDefaultKcal(b) - getDefaultKcal(a))
    .slice(0, 8)
    .map((f) => ({
      name: truncateName(f.name, 10),
      fullName: f.name,
      kcal: getDefaultKcal(f),
    }));

  if (data.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base font-medium">
          <Flame className="size-4" />
          Default serving calories
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0 pt-0">
        <div className="h-[260px] w-full px-2 sm:px-4">
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
                dataKey="name"
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                dataKey="kcal"
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
                  `${value != null ? value : 0} kcal`,
                  "",
                ]}
                labelFormatter={(_, payload) =>
                  payload[0]?.payload?.fullName ?? ""
                }
              />
              <Bar
                dataKey="kcal"
                fill="#10b981"
                radius={[4, 4, 0, 0]}
                maxBarSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
