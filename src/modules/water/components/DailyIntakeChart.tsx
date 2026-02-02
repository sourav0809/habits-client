import { Activity } from "lucide-react";
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  ComposedChart,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { WaterChartDataPoint } from "../utils";
import { formatMl } from "../utils";

export interface DailyIntakeChartProps {
  data: WaterChartDataPoint[];
}

export function DailyIntakeChart({ data }: DailyIntakeChartProps) {
  if (data.length === 0) return null;

  const chartData = data.map((d) => ({
    label: d.label,
    fullDate: d.date,
    amount: d.amount,
    goal: d.goal,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base font-medium">
          <Activity className="size-4 text-blue-600" />
          Daily Water Intake
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0 pt-0">
        <div className="h-[280px] w-full px-2 sm:px-4">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={chartData}
              margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="waterGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0.7} />
                </linearGradient>
              </defs>
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
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                className="text-muted-foreground"
                tickFormatter={(v: number) => `${v / 1000}L`}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "var(--radius)",
                  border: "1px solid hsl(var(--border))",
                  background: "hsl(var(--card))",
                }}
                formatter={(value: number | undefined, name?: string) => [
                  formatMl(value ?? 0),
                  name === "amount" ? "Intake" : "Goal",
                ]}
                labelFormatter={(_: unknown, payload: readonly { payload?: { fullDate?: string } }[]) =>
                  payload?.[0]?.payload?.fullDate ?? ""
                }
              />
              <Bar
                dataKey="amount"
                fill="url(#waterGradient)"
                radius={[6, 6, 0, 0]}
                maxBarSize={48}
              />
              <Line
                type="monotone"
                dataKey="goal"
                stroke="#f59e0b"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="size-3 rounded bg-gradient-to-b from-blue-500 to-blue-600" />
            <span className="text-muted-foreground">Water Intake</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-0.5 w-4 border-t-2 border-dashed border-amber-500" />
            <span className="text-muted-foreground">Daily Goal</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
